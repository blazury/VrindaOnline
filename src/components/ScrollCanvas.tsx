"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SEQUENCE_CONFIG = [
  { folder: "coconut_oil", total: 240 },
  { folder: "ghee", total: 209 },
  { folder: "honey", total: 240 },
  { folder: "moringa", total: 240 },
  { folder: "masala", total: 240 }
];

export default function ScrollCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [imagesCache, setImagesCache] = useState<HTMLImageElement[][]>([]);
  const [combinedImg, setCombinedImg] = useState<HTMLImageElement | null>(null);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const animationFrameRef = useRef<number | null>(null);

  // Progressive and decimated sequence loading
  useEffect(() => {
    let isMounted = true;
    const step = 2; // Decimate frame count by 50% to cut load weight in half

    // Helper to load a sequence
    const loadSequence = (seqIdx: number): Promise<HTMLImageElement[]> => {
      return new Promise((resolve) => {
        const config = SEQUENCE_CONFIG[seqIdx];
        const frames: HTMLImageElement[] = [];
        let loaded = 0;
        const totalToLoad = Math.ceil(config.total / step);

        for (let i = 1; i <= config.total; i += step) {
          const img = new Image();
          const frameNum = String(i).padStart(3, "0");
          img.src = `/images/sequence/${config.folder}/frame_${frameNum}.webp`;
          
          const onFrameLoad = () => {
            loaded++;
            if (loaded === totalToLoad) {
              resolve(frames);
            }
          };

          img.onload = onFrameLoad;
          img.onerror = onFrameLoad;
          frames.push(img);
        }
      });
    };

    const loadAssets = async () => {
      // Step 1: Preload only the combined background + first sequence (coconut oil)
      const combinedPromise = new Promise<HTMLImageElement | null>((resolve) => {
        const img = new Image();
        img.src = "/images/bg_combined.jpg";
        img.onload = () => resolve(img);
        img.onerror = () => resolve(null);
      });

      // Track loading of initial batch (combined image + 120 frames of coconut oil)
      let initialLoadedCount = 0;
      const initialTotal = 1 + Math.ceil(SEQUENCE_CONFIG[0].total / step);

      const trackInitialLoad = (img: HTMLImageElement | null) => {
        if (!isMounted) return img;
        initialLoadedCount++;
        setLoadingProgress(Math.min(100, Math.round((initialLoadedCount / initialTotal) * 100)));
        return img;
      };

      const cImgPromiseMapped = combinedPromise.then(trackInitialLoad);

      // Load coconut oil frames with tracking
      const coconutFramesPromise = new Promise<HTMLImageElement[]>((resolve) => {
        const config = SEQUENCE_CONFIG[0];
        const frames: HTMLImageElement[] = [];
        let loaded = 0;
        const totalToLoad = Math.ceil(config.total / step);

        for (let i = 1; i <= config.total; i += step) {
          const img = new Image();
          const frameNum = String(i).padStart(3, "0");
          img.src = `/images/sequence/${config.folder}/frame_${frameNum}.webp`;

          const onFrameLoad = () => {
            trackInitialLoad(img);
            loaded++;
            if (loaded === totalToLoad) {
              resolve(frames);
            }
          };

          img.onload = onFrameLoad;
          img.onerror = onFrameLoad;
          frames.push(img);
        }
      });

      const [cImg, coconutFrames] = await Promise.all([
        cImgPromiseMapped,
        coconutFramesPromise
      ]);

      if (!isMounted) return;

      setCombinedImg(cImg);
      setImagesCache([coconutFrames, [], [], [], []]);
      setIsLoaded(true); // Unlock UI interaction immediately!

      // Step 2: Load the remaining sequences in the background (preventing network blocking)
      const gheeFrames = await loadSequence(1);
      if (!isMounted) return;
      setImagesCache(prev => [prev[0], gheeFrames, prev[2], prev[3], prev[4]]);

      const honeyFrames = await loadSequence(2);
      if (!isMounted) return;
      setImagesCache(prev => [prev[0], prev[1], honeyFrames, prev[3], prev[4]]);

      const moringaFrames = await loadSequence(3);
      if (!isMounted) return;
      setImagesCache(prev => [prev[0], prev[1], prev[2], moringaFrames, prev[4]]);

      const masalaFrames = await loadSequence(4);
      if (!isMounted) return;
      setImagesCache(prev => [prev[0], prev[1], prev[2], prev[3], masalaFrames]);
    };

    loadAssets();

    return () => {
      isMounted = false;
    };
  }, []);

  // Handle drawing and GSAP scroll linking
  useEffect(() => {
    if (!isLoaded || imagesCache.length === 0 || !canvasRef.current || !containerRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Target, current and progress variables for LERP interpolation
    let targetZoneIndex = -1;
    let targetFrameIndex = 0;
    let currentZoneIndex = -1;
    let currentFrameIndex = 0;
    const progressRef = { current: 0 };

    // Helper to draw an image centered and covering the canvas (object-fit: cover)
    const drawImageProp = (
      context: CanvasRenderingContext2D,
      img: HTMLImageElement,
      x = 0,
      y = 0,
      w = canvas.width,
      h = canvas.height
    ) => {
      const iw = img.naturalWidth || img.width;
      const ih = img.naturalHeight || img.height;
      if (iw === 0 || ih === 0) return;

      const r = Math.min(w / iw, h / ih);
      let nw = iw * r;
      let nh = ih * r;
      let cx = 1;
      let cy = 1;
      let cw = 1;
      let ch = 1;

      if (nw < w) {
        const r2 = w / nw;
        nw *= r2;
        nh *= r2;
      }
      if (nh < h) {
        const r2 = h / nh;
        nw *= r2;
        nh *= r2;
      }

      cx = iw / nw;
      cy = ih / nh;
      cw = w * cx;
      ch = h * cy;

      if (cw > iw) cw = iw;
      if (ch > ih) ch = ih;

      const sx = (iw - cw) / 2;
      const sy = (ih - ch) / 2;

      context.clearRect(0, 0, w, h);
      context.drawImage(img, sx, sy, cw, ch, x, y, w, h);
    };

    // Set canvas resolution
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      const progress = progressRef.current;
      if (progress < 0.166) {
        if (combinedImg) {
          drawImageProp(ctx, combinedImg);
        }
      } else if (currentZoneIndex >= 0) {
        const activeSeq = imagesCache[currentZoneIndex];
        if (activeSeq && activeSeq.length > 0) {
          const activeImg = activeSeq[Math.round(currentFrameIndex)] || activeSeq[0];
          if (activeImg) {
            drawImageProp(ctx, activeImg);
          }
        } else if (combinedImg) {
          drawImageProp(ctx, combinedImg);
        }
      }
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    // Render loop with linear interpolation (LERP) and cross-fade from combined image
    const renderLoop = () => {
      const progress = progressRef.current;

      if (progress < 0.166) {
        // Draw the combined background image during intro
        if (combinedImg) {
          drawImageProp(ctx, combinedImg);
        }
      } else {
        if (targetZoneIndex >= 0) {
          const activeSeq = imagesCache[targetZoneIndex];
          
          if (activeSeq && activeSeq.length > 0) {
            if (currentZoneIndex !== targetZoneIndex) {
              currentZoneIndex = targetZoneIndex;
              currentFrameIndex = targetFrameIndex;
            } else {
              // LERP frame index for smooth scrubbing
              currentFrameIndex += (targetFrameIndex - currentFrameIndex) * 0.25;
            }

            const frameIdx = Math.min(
              activeSeq.length - 1,
              Math.max(0, Math.round(currentFrameIndex))
            );
            const activeImg = activeSeq[frameIdx];
            
            if (activeImg && activeImg.complete) {
              // Smooth cross-fade between combined image and first sequence frame
              if (progress >= 0.166 && progress < 0.22 && combinedImg) {
                drawImageProp(ctx, combinedImg);
                const alpha = (progress - 0.166) / (0.22 - 0.166);
                ctx.globalAlpha = alpha;
                drawImageProp(ctx, activeImg);
                ctx.globalAlpha = 1;
              } else {
                drawImageProp(ctx, activeImg);
              }
            }
          } else {
            // Background load fallback: draw combined image if sequence is not loaded yet
            if (combinedImg) {
              drawImageProp(ctx, combinedImg);
            }
          }
        }
      }
      animationFrameRef.current = requestAnimationFrame(renderLoop);
    };

    // Start LERP render loop
    animationFrameRef.current = requestAnimationFrame(renderLoop);

    // Master GSAP Timeline matching the 6-segment scroll trigger layout
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.1,
      }
    });

    // Keep canvas visible (opacity 1) since it renders the combined image during the intro
    gsap.set(canvas, { opacity: 1 });

    const scrollObj = { progress: 0 };
    tl.to(scrollObj, {
      progress: 1,
      ease: "none",
      duration: 1,
      onUpdate: () => {
        const progress = scrollObj.progress;
        progressRef.current = progress;
        
        if (progress < 0.166) {
          targetZoneIndex = -1;
          targetFrameIndex = 0;
        } else {
          // Shift and scale progress to fit the 5 product segments
          const shiftedProgress = (progress - 0.166) / (1.0 - 0.166);
          targetZoneIndex = Math.min(4, Math.floor(shiftedProgress * 5));
          const localProgress = (shiftedProgress * 5) % 1;
          
          const activeSeq = imagesCache[targetZoneIndex];
          if (activeSeq && activeSeq.length > 0) {
            targetFrameIndex = Math.min(
              activeSeq.length - 1,
              Math.floor(localProgress * activeSeq.length)
            );
          }
        }
      }
    }, 0);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      tl.kill();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [isLoaded, imagesCache, combinedImg]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[600vh] pointer-events-none"
      id="scroll-canvas-container"
    >
      {/* Sticky Canvas viewport */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden z-0">
        <canvas
          ref={canvasRef}
          className="absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-500"
          style={{ opacity: isLoaded ? 1 : 0 }}
        />
      </div>

      {/* Loader screen */}
      {!isLoaded && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-stone-50 select-none">
          <div className="relative flex items-center justify-center">
            <div className="w-24 h-24 border-2 border-emerald-950/10 border-t-emerald-800 rounded-full animate-spin"></div>
            <div className="absolute font-serif text-emerald-950 font-semibold text-lg">
              {loadingProgress}%
            </div>
          </div>
          <p className="mt-6 font-serif tracking-[0.2em] text-emerald-900/60 uppercase text-xs">
            Optimizing Layout
          </p>
        </div>
      )}
    </div>
  );
}
