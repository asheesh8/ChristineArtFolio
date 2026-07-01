"use client";

import { useEffect, useRef } from "react";

type ImmersiveBackgroundProps = {
  imageSrc: string;
};

export function ImmersiveBackground({ imageSrc }: ImmersiveBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d", { alpha: true });

    if (!canvas || !context) {
      return;
    }

    const image = new Image();

    let animationFrame = 0;
    let width = 0;
    let height = 0;
    let pixelRatio = 1;
    let coverWidth = 0;
    let coverHeight = 0;
    let coverX = 0;
    let coverY = 0;
    let scrollProgress = 0;
    let started = false;
    const pointer = {
      active: false,
      x: 0.5,
      y: 0.5,
      targetX: 0.5,
      targetY: 0.5,
    };

    const resize = () => {
      pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * pixelRatio);
      canvas.height = Math.floor(height * pixelRatio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

      if (image.naturalWidth && image.naturalHeight) {
        const scale = Math.max(width / image.naturalWidth, height / image.naturalHeight);
        coverWidth = image.naturalWidth * scale;
        coverHeight = image.naturalHeight * scale;
        coverX = (width - coverWidth) / 2;
        coverY = (height - coverHeight) / 2;
      }
    };

    const updateScroll = () => {
      const scrollable = Math.max(
        document.documentElement.scrollHeight - window.innerHeight,
        1,
      );
      scrollProgress = window.scrollY / scrollable;
    };

    const updatePointer = (event: PointerEvent) => {
      pointer.active = true;
      pointer.targetX = event.clientX / Math.max(width, 1);
      pointer.targetY = event.clientY / Math.max(height, 1);
    };

    const leavePointer = () => {
      pointer.active = false;
    };

    const draw = (time: number) => {
      pointer.x += (pointer.targetX - pointer.x) * 0.08;
      pointer.y += (pointer.targetY - pointer.y) * 0.08;

      context.clearRect(0, 0, width, height);
      context.globalAlpha = 0.94;
      context.drawImage(image, coverX, coverY, coverWidth, coverHeight);

      const cell = width < 700 ? 34 : 44;
      const radius = Math.min(width, height) * (pointer.active ? 0.34 : 0.18);
      const strength = pointer.active ? 24 : 7;
      const cursorX = pointer.x * width;
      const cursorY = pointer.y * height;
      const drift = time * 0.00045 + scrollProgress * 8;

      for (let y = -cell; y < height + cell; y += cell) {
        for (let x = -cell; x < width + cell; x += cell) {
          const centerX = x + cell / 2;
          const centerY = y + cell / 2;
          const distance = Math.hypot(centerX - cursorX, centerY - cursorY);
          const pull = Math.max(0, 1 - distance / radius);
          const wave = Math.sin(centerY * 0.012 + drift) * 5 + Math.cos(centerX * 0.01 - drift) * 4;
          const angle = Math.atan2(centerY - cursorY, centerX - cursorX);
          const warp = pull * pull * strength;
          const offsetX = Math.cos(angle) * warp + wave * (0.4 + pull);
          const offsetY = Math.sin(angle) * warp + Math.sin(drift + centerX * 0.015) * 7 * pull;

          context.drawImage(
            image,
            ((x - coverX) / coverWidth) * image.naturalWidth,
            ((y - coverY) / coverHeight) * image.naturalHeight,
            (cell / coverWidth) * image.naturalWidth,
            (cell / coverHeight) * image.naturalHeight,
            x + offsetX,
            y + offsetY + scrollProgress * 18,
            cell + 1,
            cell + 1,
          );
        }
      }

      context.globalAlpha = 1;
      animationFrame = requestAnimationFrame(draw);
    };

    const start = () => {
      if (started) {
        return;
      }
      started = true;
      resize();
      updateScroll();
      animationFrame = requestAnimationFrame(draw);
    };

    image.addEventListener("load", start);
    image.src = imageSrc;
    if (image.complete) {
      start();
    }
    window.addEventListener("resize", resize);
    window.addEventListener("scroll", updateScroll, { passive: true });
    window.addEventListener("pointermove", updatePointer, { passive: true });
    window.addEventListener("pointerleave", leavePointer);

    return () => {
      cancelAnimationFrame(animationFrame);
      image.removeEventListener("load", start);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", updateScroll);
      window.removeEventListener("pointermove", updatePointer);
      window.removeEventListener("pointerleave", leavePointer);
    };
  }, [imageSrc]);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#e9e6d8]">
      <canvas
        ref={canvasRef}
        className="h-full w-full opacity-80 [filter:saturate(1.08)_contrast(1.03)]"
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_12%,rgba(255,250,238,0.48),transparent_34rem),linear-gradient(180deg,rgba(251,248,241,0.32),rgba(251,248,241,0.72)_56%,rgba(251,248,241,0.9))]" />
      <div className="absolute inset-0 backdrop-blur-[1px]" />
    </div>
  );
}
