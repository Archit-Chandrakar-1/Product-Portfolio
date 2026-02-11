"use client";

import { useEffect } from "react";

export default function ScreenProtection() {
  useEffect(() => {
    // 1. Disable Right Click
    const handleContextmenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    // 2. Aggressive Keyboard Blocking
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === "PrintScreen" ||
        (e.ctrlKey && e.key === "p") || // Print
        (e.ctrlKey && e.shiftKey && e.key === "s") || // Snipping Tool shortcut
        (e.metaKey && e.shiftKey && e.key === "4") // Mac Screenshot
      ) {
        e.preventDefault();
        alert("Screenshots are disabled for privacy.");
        // Hide content immediately
        document.body.style.display = "none";
        setTimeout(() => (document.body.style.display = "block"), 1000);
      }
    };

    // 3. Blur Content on Window Focus Loss (Stops Snipping Tools)
    const handleVisibilityChange = () => {
      if (document.hidden) {
        document.body.style.filter = "blur(20px)";
      } else {
        document.body.style.filter = "none";
      }
    };

    document.addEventListener("contextmenu", handleContextmenu);
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("contextmenu", handleContextmenu);
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return (
    <style jsx global>{`
      /* 4. CSS Print Protection (The strongest layer) */
      @media print {
        body {
          display: none !important;
        }
      }
      
      /* Disable selection everywhere */
      body {
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
      }
    `}</style>
  );
}