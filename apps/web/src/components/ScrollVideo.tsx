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
  const containerRef = useRef<HTMLDivElement>(null);

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
    const vertShader = compile(gl.VERTEX_SHADER, VERT);
    const fragShader = compile(gl.FRAGMENT_SHADER, FRAG);
    const prog = gl.createProgram()!;
    gl.attachShader(prog, vertShader);
    gl.attachShader(prog, fragShader);
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
    let lastScrollY = window.scrollY;
    let isBodyLocked = false;
    let prevBodyOverflow = "";
    let prevBodyPaddingRight = "";
    const TOTAL = 3000;

    const lock = () => {
      if (isBodyLocked) return;
      const scrollbarWidth =
        window.innerWidth - document.documentElement.clientWidth;
      prevBodyOverflow = document.body.style.overflow;
      prevBodyPaddingRight = document.body.style.paddingRight;
      document.body.style.overflow = "hidden";
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`;
      }
      isBodyLocked = true;
    };
    const unlock = () => {
      if (isBodyLocked) {
        document.body.style.overflow = prevBodyOverflow;
        document.body.style.paddingRight = prevBodyPaddingRight;
        isBodyLocked = false;
      }
      unlocked = true;
      window.dispatchEvent(new CustomEvent("videoProgress", { detail: 1 }));
    };

    const syncInitialLockState = () => {
      const container = containerRef.current;
      if (!container) return;

      const currentScrollY = window.scrollY;
      const rect = container.getBoundingClientRect();
      const heroHeight = rect.height || window.innerHeight;
      const heroTop = rect.top + currentScrollY;
      const heroBottom = heroTop + heroHeight;

      if (currentScrollY > heroBottom) {
        unlock();
        virtualScroll = 1;
        smoothScroll = 1;
        if (video.duration) {
          seekTo(video.duration);
        }
      }
    };

    lock();

    let hasDrawnFirstFrame = false;
    const resizeCanvas = () => {
      if (!video.videoWidth || !video.videoHeight) return;

      canvas.style.width = "100%";
      canvas.style.height = "100%";
      canvas.style.left = "0px";
      canvas.style.top = "0px";

      const rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return;

      const videoAspect = video.videoWidth / video.videoHeight;
      const containerAspect = rect.width / rect.height;
      let displayWidth = rect.width;
      let displayHeight = rect.height;

      if (containerAspect > videoAspect) {
        displayWidth = rect.width;
        displayHeight = rect.width / videoAspect;
      } else {
        displayHeight = rect.height;
        displayWidth = rect.height * videoAspect;
      }

      canvas.style.width = `${displayWidth}px`;
      canvas.style.height = `${displayHeight}px`;
      canvas.style.left = `${(rect.width - displayWidth) / 2}px`;
      canvas.style.top = `${(rect.height - displayHeight) / 2}px`;

      const dpr = window.devicePixelRatio || 1;
      const bufferWidth = Math.max(1, Math.round(displayWidth * dpr));
      const bufferHeight = Math.max(1, Math.round(displayHeight * dpr));

      if (canvas.width !== bufferWidth || canvas.height !== bufferHeight) {
        canvas.width = bufferWidth;
        canvas.height = bufferHeight;
        gl.viewport(0, 0, canvas.width, canvas.height);
      }
    };

    const drawFrame = () => {
      if (video.readyState < 2) return;
      resizeCanvas();
      gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        gl.RGBA,
        gl.RGBA,
        gl.UNSIGNED_BYTE,
        video,
      );
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      hasDrawnFirstFrame = true;
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

    const onScroll = () => {
      if (!unlocked) {
        lastScrollY = window.scrollY;
        return;
      }
      const container = containerRef.current;
      if (!container) {
        lastScrollY = window.scrollY;
        return;
      }

      const currentScrollY = window.scrollY;
      const rect = container.getBoundingClientRect();
      const heroHeight = rect.height || window.innerHeight;
      const heroTop = rect.top + currentScrollY;
      const heroBottom = heroTop + heroHeight;
      const progress = Math.min(
        Math.max((currentScrollY - heroTop) / heroHeight, 0),
        1,
      );
      const isWithinHero =
        currentScrollY >= heroTop && currentScrollY <= heroBottom;

      if (currentScrollY < lastScrollY && isWithinHero && progress < 0.99) {
        unlocked = false;
        lock();
        virtualScroll = progress;
        smoothScroll = progress;
      }

      if (currentScrollY > lastScrollY) {
        virtualScroll = Math.max(virtualScroll, progress);
      } else if (currentScrollY < lastScrollY) {
        virtualScroll = Math.min(virtualScroll, progress);
      }

      lastScrollY = currentScrollY;
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

      if (!hasDrawnFirstFrame && video.readyState >= 2) {
        drawFrame();
      }

      rafId = requestAnimationFrame(tick);
    };

    const onLoadedData = () => {
      resizeCanvas();
      drawFrame();
      syncInitialLockState();
    };

    const onResize = () => {
      resizeCanvas();
      if (video.readyState >= 2) {
        drawFrame();
      }
    };

    video.addEventListener("seeked", onSeeked);
    video.addEventListener("loadeddata", onLoadedData);
    window.addEventListener("resize", onResize);
    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("scroll", onScroll, { passive: true });
    rafId = requestAnimationFrame(tick);

    if (video.readyState >= 2) {
      onLoadedData();
    }

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(seekTimeout);
      if (isBodyLocked) {
        document.body.style.overflow = prevBodyOverflow;
        document.body.style.paddingRight = prevBodyPaddingRight;
        isBodyLocked = false;
      }
      virtualScroll = 0;
      smoothScroll = 0;
      unlocked = false;
      isSeeking = false;
      pendingTime = -1;
      video.removeEventListener("seeked", onSeeked);
      video.removeEventListener("loadeddata", onLoadedData);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("scroll", onScroll);
      if (tex) gl.deleteTexture(tex);
      if (buf) gl.deleteBuffer(buf);
      if (prog) gl.deleteProgram(prog);
      if (vertShader) gl.deleteShader(vertShader);
      if (fragShader) gl.deleteShader(fragShader);
    };
  }, [src]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full overflow-hidden"
    >
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
        suppressHydrationWarning
      />
    </div>
  );
}
