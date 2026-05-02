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
    const container = containerRef.current;
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
    let hasCompleted = false;
    let isSeeking = false;
    let pendingTime = -1;
    let lastScrollY = window.scrollY;
    let lastTouchY = 0;
    let lockRaf = 0;
    let isCanvasVisible = false;

    const showCanvas = () => {
      if (isCanvasVisible) return;
      isCanvasVisible = true;
      canvas.classList.add("opacity-100");
    };

    const hideCanvas = () => {
      if (!isCanvasVisible) return;
      isCanvasVisible = false;
      canvas.classList.remove("opacity-100");
    };

    const lock = () => {
      unlocked = false;
    };
    const unlock = () => {
      if (unlocked) return;
      unlocked = true;
      hasCompleted = true;
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
      if (!container) return;
      if (!video.videoWidth || !video.videoHeight) return;

      canvas.style.width = "100%";
      canvas.style.height = "100%";
      canvas.style.left = "0px";
      canvas.style.top = "0px";

      const rect = container.getBoundingClientRect();
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

    const onSeeked = () => {
      drawFrame();
      if (pendingTime >= 0) {
        const t = pendingTime;
        pendingTime = -1;
        video.currentTime = t;
      } else {
        isSeeking = false;
      }
    };

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

    const getHeroMetrics = () => {
      const container = containerRef.current;
      if (!container) return null;

      const currentScrollY = window.scrollY;
      const rect = container.getBoundingClientRect();
      const heroHeight = rect.height || window.innerHeight;
      const heroTop = rect.top + currentScrollY;
      const heroBottom = heroTop + heroHeight;
      const totalDistance = Math.max(heroHeight, 1);

      return {
        currentScrollY,
        heroHeight,
        heroTop,
        heroBottom,
        totalDistance,
      };
    };

    let isSnapping = false;

    const snapToHeroTop = (heroTop: number) => {
      if (lockRaf) return;
      lockRaf = requestAnimationFrame(() => {
        isSnapping = true;
        window.scrollTo({ top: heroTop });
        lockRaf = 0;
      });
    };

    const applyDelta = (
      delta: number,
      metrics: NonNullable<ReturnType<typeof getHeroMetrics>>,
    ) => {
      virtualScroll = Math.min(
        Math.max(virtualScroll + delta / metrics.totalDistance, 0),
        1,
      );
    };

    const onScroll = () => {
      if (isSnapping) {
        isSnapping = false;
        lastScrollY = window.scrollY;
        return;
      }

      const metrics = getHeroMetrics();
      if (!metrics) {
        lastScrollY = window.scrollY;
        return;
      }

      if (!unlocked) {
        showCanvas();
        const delta = metrics.currentScrollY - lastScrollY;
        applyDelta(delta, metrics);
        if (Math.abs(metrics.currentScrollY - metrics.heroTop) > 1) {
          snapToHeroTop(metrics.heroTop);
        }
        lastScrollY = metrics.currentScrollY;
        return;
      }

      const progress = Math.min(
        Math.max(
          (metrics.currentScrollY - metrics.heroTop) / metrics.heroHeight,
          0,
        ),
        1,
      );

      if (progress > 0) {
        showCanvas();
      }

      const isWithinHero =
        metrics.currentScrollY >= metrics.heroTop &&
        metrics.currentScrollY <= metrics.heroBottom;

      if (
        metrics.currentScrollY < lastScrollY &&
        isWithinHero &&
        progress < 0.99
      ) {
        lock();
        virtualScroll = progress;
        smoothScroll = progress;
        lastScrollY = metrics.currentScrollY;
        snapToHeroTop(metrics.heroTop);
        return;
      }

      if (metrics.currentScrollY > lastScrollY) {
        virtualScroll = Math.max(virtualScroll, progress);
      } else if (metrics.currentScrollY < lastScrollY) {
        virtualScroll = Math.min(virtualScroll, progress);
      }

      lastScrollY = metrics.currentScrollY;
    };

    const onWheel = (event: WheelEvent) => {
      if (unlocked) return;
      const metrics = getHeroMetrics();
      if (!metrics) return;

      event.preventDefault();
      showCanvas();
      applyDelta(event.deltaY, metrics);
      snapToHeroTop(metrics.heroTop);
    };

    const onTouchStart = (event: TouchEvent) => {
      if (unlocked) return;
      if (event.touches.length > 0) {
        lastTouchY = event.touches[0]?.clientY ?? 0;
      }
    };

    const onTouchMove = (event: TouchEvent) => {
      if (unlocked) return;
      const metrics = getHeroMetrics();
      if (!metrics || event.touches.length === 0) return;

      const currentY = event.touches[0]?.clientY ?? 0;
      const delta = lastTouchY - currentY;
      lastTouchY = currentY;

      event.preventDefault();
      showCanvas();
      applyDelta(delta, metrics);
      snapToHeroTop(metrics.heroTop);
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (unlocked) return;

      const keys = ["ArrowDown", "ArrowUp", "PageDown", "PageUp", " "];
      if (!keys.includes(event.key)) return;

      const metrics = getHeroMetrics();
      if (!metrics) return;

      event.preventDefault();
      showCanvas();

      const step =
        event.key === "ArrowDown" || event.key === " "
          ? metrics.totalDistance * 0.08
          : metrics.totalDistance * -0.08;

      applyDelta(step, metrics);
      snapToHeroTop(metrics.heroTop);
    };

    const tick = () => {
      smoothScroll += (virtualScroll - smoothScroll) * 0.1;

      if (video.duration) {
        const targetTime = smoothScroll * video.duration;
        if (Math.abs(video.currentTime - targetTime) > 0.02) {
          seekTo(targetTime);
        }
        if (
          smoothScroll >= 0.999 &&
          video.currentTime >= video.duration - 0.02
        ) {
          unlock();
        }
      }

      if (hasCompleted && smoothScroll <= 0.02) {
        hideCanvas();
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

    const resizeObserver = new ResizeObserver(() => {
      onResize();
    });
    if (container) {
      resizeObserver.observe(container);
    }

    video.addEventListener("seeked", onSeeked);
    video.addEventListener("loadeddata", onLoadedData);
    window.addEventListener("resize", onResize);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("keydown", onKeyDown, { passive: false });
    rafId = requestAnimationFrame(tick);

    if (video.readyState >= 2) {
      onLoadedData();
    }

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(seekTimeout);
      virtualScroll = 0;
      smoothScroll = 0;
      unlocked = false;
      isSeeking = false;
      pendingTime = -1;
      resizeObserver.disconnect();
      video.removeEventListener("seeked", onSeeked);
      video.removeEventListener("loadeddata", onLoadedData);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("keydown", onKeyDown);
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
      className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none"
    >
      <video
        ref={videoRef}
        src={src}
        muted
        playsInline
        // preload="auto"
        preload="metadata"
        className="hidden"
      />
      <canvas
        ref={canvasRef}
        className="absolute z-50 inset-0 w-full h-full opacity-0 transition-opacity duration-700 pointer-events-none"
        suppressHydrationWarning
      />
    </div>
  );
}
