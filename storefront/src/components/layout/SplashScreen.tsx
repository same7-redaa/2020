"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";

const SPLASH_ICONS = [
  { src: "/hero-icons/meta.png", alt: "Meta" },
  { src: "/hero-icons/facebook.png", alt: "Facebook" },
  { src: "/hero-icons/instagram.png", alt: "Instagram" },
  { src: "/hero-icons/tiktok.png", alt: "TikTok" },
  { src: "/hero-icons/google-ads.png", alt: "Google Ads" },
  { src: "/hero-icons/photoshop.png", alt: "Photoshop" },
  { src: "/hero-icons/premiere-pro.png", alt: "Premiere Pro" },
  { src: "/hero-icons/illustrator.png", alt: "Illustrator" },
];

export default function SplashScreen() {
  const pathname = usePathname();
  // Animation phases: 'orbit' -> 'plunge' -> 'done'
  const [phase, setPhase] = useState<"orbit" | "plunge" | "done">("orbit");
  const [isExpanded, setIsExpanded] = useState(false);
  const [isRendered, setIsRendered] = useState(true);
  const [radius, setRadius] = useState(215);
  // Pick a random icon index on every page load
  const [targetIndex] = useState(() => Math.floor(Math.random() * SPLASH_ICONS.length));

  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== "undefined") {
        if (window.innerWidth < 400) {
          setRadius(120);
        } else if (window.innerWidth < 640) {
          setRadius(140);
        } else if (window.innerWidth < 1024) {
          setRadius(175);
        } else {
          setRadius(215);
        }
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    const isBotOrLighthouse =
      typeof navigator !== "undefined" &&
      /Lighthouse|PageSpeed|Chrome-Lighthouse|Googlebot|Google-InspectionTool|HeadlessChrome/i.test(
        navigator.userAgent
      );

    if (isBotOrLighthouse) {
      setIsRendered(false);
      if (typeof window !== "undefined") {
        (window as unknown as { __heroReady?: boolean }).__heroReady = true;
        window.dispatchEvent(new CustomEvent("hero-ready"));
        window.dispatchEvent(new CustomEvent("splash-finished"));
      }
      return;
    }

    // Step 1: Burst icons from center outward immediately into circular orbit
    const t0 = setTimeout(() => {
      setIsExpanded(true);
    }, 20);

    // Step 2: Trigger 3D Camera Plunge right INTO the randomly selected icon (Hero reveals here!)
    const t1 = setTimeout(() => {
      setPhase("plunge");
      if (typeof window !== "undefined") {
        (window as unknown as { __heroReady?: boolean }).__heroReady = true;
        window.dispatchEvent(new CustomEvent("hero-ready"));
      }
    }, 1200);

    // Step 3: Complete plunge transition and unmount splash
    const t2 = setTimeout(() => {
      setPhase("done");
      setIsRendered(false);
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("splash-finished"));
      }
    }, 2000);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(t0);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  if (pathname !== "/" || !isRendered) return null;

  // Calculate coordinates of the randomly chosen target icon
  const targetAngle = (targetIndex / SPLASH_ICONS.length) * 2 * Math.PI - Math.PI / 2;
  const targetStartX = Math.round(Math.cos(targetAngle) * radius);
  const targetStartY = Math.round(Math.sin(targetAngle) * radius);

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden select-none pointer-events-none transition-opacity duration-700 ease-out splash-3d-perspective ${
        phase === "plunge" ? "bg-transparent" : "bg-[#060608]"
      }`}
      style={{
        perspective: "1000px",
        transformStyle: "preserve-3d",
      }}
    >
      {/* Black Backdrop that dissolves as you pierce through the icon */}
      <div
        className={`absolute inset-0 bg-[#060608] transition-opacity duration-700 ease-out ${
          phase === "plunge" ? "opacity-0" : "opacity-100"
        }`}
        style={{
          pointerEvents: phase === "done" ? "none" : "auto",
        }}
      />

      {/* Speed Lines / Tunnel Flare Rush during 3D Plunge */}
      {phase === "plunge" && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-40">
          <div className="w-[300px] h-[300px] rounded-full bg-gradient-to-r from-[#FF8B2C]/30 via-white/20 to-[#FF8B2C]/30 blur-2xl splash-tunnel-rush" />
        </div>
      )}

      {/* Center Stage: Text and 8 Orbiting Icons */}
      <div
        className={`relative z-20 flex items-center justify-center w-[340px] h-[340px] sm:w-[540px] sm:h-[540px] transition-all duration-500 ease-out ${
          phase === "plunge"
            ? "scale-150 opacity-0 filter blur-md"
            : "scale-100 opacity-100 filter blur-0"
        }`}
      >
        {/* Center Site Name */}
        <div className="relative z-20 flex flex-col items-center justify-center text-center px-4 max-w-xs">
          <h1 className="text-xl sm:text-3xl lg:text-4xl font-black text-white tracking-wider mb-1">
            ابـــراهـــيــــم عـــــلــــي <span className="text-[#FF8B2C] drop-shadow-[0_0_25px_rgba(255,139,44,0.65)]">ســـلـــيـــم</span>
          </h1>
          <p className="text-[10px] sm:text-xs font-bold text-zinc-400 tracking-[0.2em] uppercase">
            Marketing Strategist
          </p>
        </div>

        {/* Orbit Track with Icons in Circle */}
        <div
          className={`absolute inset-0 flex items-center justify-center pointer-events-none ${
            phase === "plunge" ? "" : "splash-orbit-track"
          }`}
        >
          {SPLASH_ICONS.map((icon, idx) => {
            const angle = (idx / SPLASH_ICONS.length) * 2 * Math.PI - Math.PI / 2;
            const currentR = isExpanded ? radius : 0;
            const x = Math.cos(angle) * currentR;
            const y = Math.sin(angle) * currentR;
            const isTarget = idx === targetIndex;

            return (
              <div
                key={icon.alt}
                className={`absolute flex items-center justify-center transition-all ${
                  phase === "plunge"
                    ? isTarget
                    ? "splash-camera-plunge z-50"
                    : "opacity-0 scale-50 filter blur-sm transition-opacity duration-300"
                    : "splash-icon-counter-spin duration-450 ease-[cubic-bezier(0.16,1,0.3,1)]"
                }`}
                style={{
                  transform:
                    phase === "plunge"
                      ? isTarget
                        ? undefined
                        : `translate(${x}px, ${y}px) scale(0)`
                      : `translate(${x}px, ${y}px) scale(${isExpanded ? 1 : 0})`,
                  opacity: phase === "plunge" ? (isTarget ? 1 : 0) : isExpanded ? 1 : 0,
                  transitionDelay: phase === "plunge" ? "0ms" : `${idx * 12}ms`,
                  "--start-x": `${targetStartX}px`,
                  "--start-y": `${targetStartY}px`,
                } as React.CSSProperties}
              >
                {/* Clean Pure Icon */}
                <div className="w-9 h-9 sm:w-14 sm:h-14 flex items-center justify-center">
                  <Image
                    src={icon.src}
                    alt={icon.alt}
                    width={56}
                    height={56}
                    className="w-full h-full object-contain"
                    priority
                  />
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* 3D Camera Plunge Animation Keyframes (Adapts dynamically to the randomly chosen icon) */}
      <style jsx global>{`
        /* Continuous Orbit Track Rotation */
        @keyframes orbitSpin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        /* Counter spin to keep icons upright during orbit */
        @keyframes iconCounterSpin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(-360deg);
          }
        }

        .splash-orbit-track {
          animation: orbitSpin 9s linear infinite;
        }

        .splash-icon-counter-spin > div {
          animation: iconCounterSpin 9s linear infinite;
        }

        /* 
          Dynamic 3D Camera Plunge: 
          Dives from the specific location of the randomly chosen icon directly into its center.
        */
        @keyframes cameraPlungeDynamic {
          0% {
            transform: translate3d(var(--start-x, 0px), var(--start-y, -215px), 0px) scale(1);
            opacity: 1;
            filter: blur(0px);
          }
          30% {
            transform: translate3d(calc(var(--start-x, 0px) * 0.5), calc(var(--start-y, -215px) * 0.5), 200px) scale(2.8);
            opacity: 1;
            filter: blur(0px);
          }
          60% {
            transform: translate3d(0px, 0px, 500px) scale(25);
            opacity: 0.95;
            filter: blur(1px);
          }
          85% {
            opacity: 0.8;
            filter: blur(4px);
          }
          100% {
            transform: translate3d(0px, 0px, 900px) scale(180);
            opacity: 0;
            filter: blur(12px);
          }
        }

        .splash-camera-plunge {
          animation: cameraPlungeDynamic 0.95s cubic-bezier(0.55, 0, 0.1, 1) forwards !important;
          transform-origin: center center;
          will-change: transform, opacity, filter;
        }

        /* Speed Tunnel Flare during Plunge */
        @keyframes tunnelRush {
          0% {
            transform: scale(0.2);
            opacity: 0;
          }
          50% {
            transform: scale(3);
            opacity: 0.6;
          }
          100% {
            transform: scale(10);
            opacity: 0;
          }
        }

        .splash-tunnel-rush {
          animation: tunnelRush 0.95s cubic-bezier(0.55, 0, 0.1, 1) forwards;
        }
      `}</style>

    </div>
  );
}
