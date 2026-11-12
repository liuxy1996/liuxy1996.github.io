"use client";

import { useEffect } from "react";

function clamp(value: number): number {
  return Math.min(1, Math.max(0, value));
}

export function ScrollExperience() {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("scroll-ready");
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const revealElements = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]"),
    );
    const scenes = Array.from(
      document.querySelectorAll<HTMLElement>("[data-scroll-scene]"),
    );
    const hero = document.querySelector<HTMLElement>("[data-scroll-hero]");

    if (reducedMotion) {
      revealElements.forEach((element) => element.classList.add("is-revealed"));
      scenes.forEach((scene) => scene.style.setProperty("--scene-progress", "1"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-revealed");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -6% 0px" },
    );

    revealElements.forEach((element) => observer.observe(element));

    let frame = 0;
    const update = () => {
      frame = 0;
      const documentHeight = document.documentElement.scrollHeight;
      const viewport = window.innerHeight;
      const maxScroll = Math.max(1, documentHeight - viewport);
      document.documentElement.style.setProperty(
        "--page-progress",
        clamp(window.scrollY / maxScroll).toFixed(4),
      );

      if (hero) {
        const heroProgress = clamp(window.scrollY / Math.max(hero.offsetHeight, 1));
        hero.style.setProperty("--hero-progress", heroProgress.toFixed(4));
      }

      scenes.forEach((scene) => {
        const rect = scene.getBoundingClientRect();
        const distance = Math.max(1, scene.offsetHeight - viewport);
        const progress = clamp(-rect.top / distance);
        scene.style.setProperty("--scene-progress", progress.toFixed(4));
      });
    };

    const schedule = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    return () => {
      observer.disconnect();
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  return <div className="scroll-meter" aria-hidden="true" />;
}
