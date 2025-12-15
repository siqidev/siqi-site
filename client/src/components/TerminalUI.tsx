import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";

// --- Terminal Window Component ---
interface TerminalWindowProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  children: React.ReactNode;
}

export function TerminalWindow({ title = "TERMINAL", children, className, ...props }: TerminalWindowProps) {
  // Filter out event handlers that might conflict with framer-motion props if passed directly
  const { onDrag, onDragStart, onDragEnd, ...validProps } = props as any;
  
  return (
    <motion.div 
      initial={{ scale: 0.9, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, type: "spring" }}
      className={cn("terminal-window flex flex-col", className)} 
      {...validProps}
    >
      <div className="terminal-header">
        <span className="text-xs font-display tracking-widest uppercase flex items-center gap-2">
          <span className="w-3 h-3 bg-red-500 rounded-full opacity-50"></span>
          <span className="w-3 h-3 bg-yellow-500 rounded-full opacity-50"></span>
          <span className="w-3 h-3 bg-green-500 rounded-full opacity-50"></span>
          {title}
        </span>
        <span className="text-xs opacity-50">v1.0.0</span>
      </div>
      <div className="p-4 md:p-6 flex-1 overflow-auto relative">
        {children}
        <div className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-primary opacity-50"></div>
      </div>
    </motion.div>
  );
}

// --- Glitch Text Component ---
interface GlitchTextProps {
  text: string;
  className?: string;
  as?: React.ElementType;
}

export function GlitchText({ text, className, as: Component = "span" }: GlitchTextProps) {
  return (
    <Component className={cn("glitch-text font-display", className)} data-text={text}>
      {text}
    </Component>
  );
}

// --- Typewriter Effect Component ---
interface TypewriterProps {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
  onComplete?: () => void;
}

export function Typewriter({ text, speed = 50, delay = 0, className, onComplete }: TypewriterProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const startTimeout = setTimeout(() => {
      setStarted(true);
    }, delay);
    return () => clearTimeout(startTimeout);
  }, [delay]);

  useEffect(() => {
    if (!started) return;

    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayedText((prev) => prev + text.charAt(i));
        i++;
      } else {
        clearInterval(interval);
        if (onComplete) onComplete();
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed, started, onComplete]);

  return (
    <span className={cn("font-mono", className)}>
      {displayedText}
      <span className="animate-pulse">_</span>
    </span>
  );
}

// --- Matrix Rain Background (Simplified) ---
export function MatrixRain() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20 z-0">
      {/* This would ideally be a canvas implementation for performance, 
          but for simplicity we'll use a CSS pattern or static image overlay 
          defined in global CSS for now. */}
      <div className="w-full h-full bg-[url('/images/hero-bg.png')] bg-cover bg-center opacity-30 mix-blend-screen"></div>
    </div>
  );
}
