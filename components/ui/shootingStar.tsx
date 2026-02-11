"use client";

import React, { useEffect, useRef } from "react";
import { useTheme } from "@/app/context/ThemeContext";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  color: string;
  size: number;
}

const ShootingStarCursor = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { isDark } = useTheme();
  
  // Track mouse position
  const mouse = useRef({ x: 0, y: 0 });
  const lastMouse = useRef({ x: 0, y: 0 });
  
  // Physics configuration
  const particles = useRef<Particle[]>([]);
  const MAX_PARTICLES = 40; // Length of the tail

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    const createParticle = (x: number, y: number, vx: number, vy: number) => {
      // Color based on theme (Orange/Gold for Dark Mode, Blue/Cyan for Light Mode)
      const color = isDark 
        ? `hsla(${30 + Math.random() * 30}, 100%, 70%, `  // Gold/Orange
        : `hsla(${200 + Math.random() * 40}, 100%, 60%, `; // Blue/Cyan

      particles.current.push({
        x,
        y,
        vx: vx * 0.2, // Slow down the spread
        vy: vy * 0.2,
        life: 1, // 100% life
        color,
        size: Math.random() * 3 + 1
      });
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Calculate mouse velocity for particle direction
      const dx = mouse.current.x - lastMouse.current.x;
      const dy = mouse.current.y - lastMouse.current.y;
      
      // Only generate particles if mouse is moving
      if (Math.abs(dx) > 0.1 || Math.abs(dy) > 0.1) {
        // Add multiple particles for density
        for(let i=0; i<3; i++) {
            createParticle(
                mouse.current.x, 
                mouse.current.y, 
                dx + (Math.random() - 0.5) * 5, 
                dy + (Math.random() - 0.5) * 5
            );
        }
      }

      // Update last mouse position
      lastMouse.current.x += (mouse.current.x - lastMouse.current.x) * 0.5;
      lastMouse.current.y += (mouse.current.y - lastMouse.current.y) * 0.5;

      // Draw Cursor Head (The Star)
      ctx.beginPath();
      ctx.arc(mouse.current.x, mouse.current.y, 4, 0, Math.PI * 2);
      ctx.fillStyle = isDark ? "#fbbf24" : "#0ea5e9";
      ctx.fill();
      // Glow
      ctx.shadowBlur = 15;
      ctx.shadowColor = isDark ? "#f59e0b" : "#38bdf8";

      // Render Particles (The Tail)
      for (let i = 0; i < particles.current.length; i++) {
        const p = particles.current[i];
        
        // Update physics
        p.x -= p.vx; // Move opposite to velocity to create trail
        p.y -= p.vy;
        p.life -= 0.04; // Fade out speed
        p.size -= 0.05; // Shrink speed

        // Draw
        if (p.life > 0 && p.size > 0) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = p.color + p.life + ")";
          ctx.fill();
        } else {
          // Remove dead particles
          particles.current.splice(i, 1);
          i--;
        }
      }
      
      // Reset shadow for next frame
      ctx.shadowBlur = 0;

      animationId = requestAnimationFrame(animate);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove);
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, [isDark]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-50"
    />
  );
};

export default ShootingStarCursor;