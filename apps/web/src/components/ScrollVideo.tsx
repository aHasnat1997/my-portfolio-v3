"use client";

import { useEffect, useRef } from "react";

const VERT = `
attribute vec2 a_pos;
varying vec2 v_uv;
void main() {
  v_uv = vec2(a_pos.x * 0.5 + 0.5, 0.5 - a_pos.y * 0.5);
  gl_Position = vec4(a_pos, 0.0, 1.0);
}`;

const FRAG = `
precision mediump float;
uniform sampler2D u_tex;
varying vec2 v_uv;
void main() {
  vec4 c = texture2D(u_tex, v_uv);
  float g = c.g - max(c.r, c.b);
  float alpha = 1.0 - smoothstep(0.15, 0.4, g);
  gl_FragColor = vec4(c.rgb, c.a * alpha);
}`;

export default function ScrollVideo({ src }: { src: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    const gl = canvas.getContext("webgl", { premultipliedAlpha: false });
    if (!gl) return;

    const compile = (type: number, s: string) => {
      const sh = gl.createShader(type)!;
      gl.shaderSource(sh, s);
      gl.compileShader(sh);
      return sh;
    };
    const prog = gl.createProgram()!;
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW,
    );
    const loc = gl.getAttribLocation(prog, "a_pos");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const tex = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.uniform1i(gl.getUniformLocation(prog, "u_tex"), 0);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    video.pause();

    let virtualScroll = 0;
    let smoothScroll = 0;
    let rafId: number;
    let unlocked = false;
    let isSeeking = false;
    let pendingTime = -1;
    let touchStartY = 0;
    const TOTAL = 3000;

    const lock = () => {
      document.body.style.overflow = "hidden";
    };
    const unlock = () => {
      document.body.style.overflow = "";
      unlocked = true;
      window.dispatchEvent(new CustomEvent("videoProgress", { detail: 1 }));
    };

    lock();

    const drawFrame = () => {
      if (video.readyState < 2) return;
      if (canvas.width !== video.videoWidth) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        gl.viewport(0, 0, canvas.width, canvas.height);
      }
      gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        gl.RGBA,
        gl.RGBA,
        gl.UNSIGNED_BYTE,
        video,
      );
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };

    // after seek completes, draw — and if another seek is pending, do it now
    const onSeeked = () => {
      drawFrame();
      if (pendingTime >= 0) {
        const t = pendingTime;
        pendingTime = -1;
        video.currentTime = t; // isSeeking stays true, new seek in progress
      } else {
        isSeeking = false; // fully done, ready for next seek
      }
    };

    // safety: if seeked never fires (stalled), reset after 300ms
    let seekTimeout: ReturnType<typeof setTimeout>;
    const seekTo = (t: number) => {
      if (isSeeking) {
        pendingTime = t;
      } else {
        isSeeking = true;
        clearTimeout(seekTimeout);
        seekTimeout = setTimeout(() => {
          isSeeking = false;
        }, 300);
        video.currentTime = t;
      }
    };

    const onWheel = (e: WheelEvent) => {
      if (unlocked) return;
      e.preventDefault();
      let delta = e.deltaY;
      if (e.deltaMode === 1) delta *= 32;
      if (e.deltaMode === 2) delta *= window.innerHeight;
      delta = Math.max(-100, Math.min(100, delta));
      virtualScroll = Math.min(Math.max(virtualScroll + delta / TOTAL, 0), 1);
    };

    const onTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };
    const onTouchMove = (e: TouchEvent) => {
      if (unlocked) return;
      e.preventDefault();
      const delta = touchStartY - e.touches[0].clientY;
      touchStartY = e.touches[0].clientY;
      virtualScroll = Math.min(Math.max(virtualScroll + delta / TOTAL, 0), 1);
    };

    const tick = () => {
      smoothScroll += (virtualScroll - smoothScroll) * 0.1;

      if (video.duration) {
        const targetTime = smoothScroll * video.duration;
        if (Math.abs(video.currentTime - targetTime) > 0.02) {
          seekTo(targetTime);
        }
        if (smoothScroll >= 0.99 && !unlocked) unlock();
      }

      rafId = requestAnimationFrame(tick);
    };

    video.addEventListener("seeked", onSeeked);
    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(seekTimeout);
      document.body.style.overflow = "";
      video.removeEventListener("seeked", onSeeked);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
    };
  }, []);

  return (
    <>
      <video
        ref={videoRef}
        src={src}
        muted
        playsInline
        preload="auto"
        className="hidden"
      />
      <canvas
        ref={canvasRef}
        className="absolute z-50 inset-0 w-full h-full"
        style={{ objectFit: "cover" }}
        suppressHydrationWarning
      />
    </>
  );
}
