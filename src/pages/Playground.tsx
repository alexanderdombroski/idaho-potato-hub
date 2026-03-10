import { useEffect, useRef, useState, useCallback } from "react";
import potatoRusset from "@/assets/potato-russet.jpg";

interface Potato {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  rotation: number;
  vr: number;
}

const Playground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const potatoesRef = useRef<Potato[]>([]);
  const dragRef = useRef<{ id: number; offsetX: number; offsetY: number; lastX: number; lastY: number } | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const animRef = useRef<number>(0);
  const [loaded, setLoaded] = useState(false);
  const mousePos = useRef({ x: 0, y: 0 });
  const followerPos = useRef({ x: 0, y: 0 });

  // Load image
  useEffect(() => {
    const img = new Image();
    img.src = potatoRusset;
    img.onload = () => {
      imgRef.current = img;
      setLoaded(true);
    };
  }, []);

  const spawnPotato = useCallback((canvas: HTMLCanvasElement) => {
    const size = 60 + Math.random() * 40;
    const potato: Potato = {
      id: Date.now() + Math.random(),
      x: Math.random() * (canvas.width - size),
      y: -size,
      vx: (Math.random() - 0.5) * 4,
      vy: Math.random() * 2 + 1,
      size,
      rotation: Math.random() * Math.PI * 2,
      vr: (Math.random() - 0.5) * 0.1,
    };
    potatoesRef.current.push(potato);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      canvas.height = canvas.parentElement?.clientHeight || 600;
    };
    resize();
    window.addEventListener("resize", resize);

    // Spawn initial potatoes
    for (let i = 0; i < 5; i++) {
      const size = 60 + Math.random() * 40;
      potatoesRef.current.push({
        id: Date.now() + i,
        x: Math.random() * (canvas.width - size),
        y: Math.random() * (canvas.height - size),
        vx: 0, vy: 0, size,
        rotation: Math.random() * Math.PI * 2,
        vr: 0,
      });
    }

    const gravity = 0.3;
    const friction = 0.98;
    const bounce = 0.6;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw follower potato (cursor follower)
      const dx = mousePos.current.x - followerPos.current.x;
      const dy = mousePos.current.y - followerPos.current.y;
      followerPos.current.x += dx * 0.08;
      followerPos.current.y += dy * 0.08;

      if (imgRef.current && mousePos.current.x > 0) {
        ctx.globalAlpha = 0.3;
        ctx.drawImage(imgRef.current, followerPos.current.x - 25, followerPos.current.y - 25, 50, 50);
        ctx.globalAlpha = 1;
      }

      potatoesRef.current.forEach((p) => {
        if (dragRef.current?.id === p.id) {
          // Being dragged
        } else {
          p.vy += gravity;
          p.vx *= friction;
          p.vy *= friction;
          p.x += p.vx;
          p.y += p.vy;
          p.rotation += p.vr;

          // Bounce off walls
          if (p.x < 0) { p.x = 0; p.vx *= -bounce; }
          if (p.x + p.size > canvas.width) { p.x = canvas.width - p.size; p.vx *= -bounce; }
          if (p.y + p.size > canvas.height) { p.y = canvas.height - p.size; p.vy *= -bounce; p.vr *= 0.95; }
          if (p.y < 0) { p.y = 0; p.vy *= -bounce; }
        }

        // Draw
        if (imgRef.current) {
          ctx.save();
          ctx.translate(p.x + p.size / 2, p.y + p.size / 2);
          ctx.rotate(p.rotation);
          ctx.drawImage(imgRef.current, -p.size / 2, -p.size / 2, p.size, p.size);
          ctx.restore();
        }
      });

      animRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [loaded]);

  const getPotatoAt = (x: number, y: number) => {
    for (let i = potatoesRef.current.length - 1; i >= 0; i--) {
      const p = potatoesRef.current[i];
      if (x >= p.x && x <= p.x + p.size && y >= p.y && y <= p.y + p.size) {
        return p;
      }
    }
    return null;
  };

  const getCanvasCoords = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    if ("touches" in e) {
      return { x: e.touches[0].clientX - rect.left, y: e.touches[0].clientY - rect.top };
    }
    return { x: (e as React.MouseEvent).clientX - rect.left, y: (e as React.MouseEvent).clientY - rect.top };
  };

  const handlePointerDown = (e: React.MouseEvent | React.TouchEvent) => {
    const { x, y } = getCanvasCoords(e);
    const potato = getPotatoAt(x, y);
    if (potato) {
      dragRef.current = { id: potato.id, offsetX: x - potato.x, offsetY: y - potato.y, lastX: x, lastY: y };
      potato.vx = 0;
      potato.vy = 0;
    }
  };

  const handlePointerMove = (e: React.MouseEvent | React.TouchEvent) => {
    const { x, y } = getCanvasCoords(e);
    mousePos.current = { x, y };

    if (dragRef.current) {
      const potato = potatoesRef.current.find((p) => p.id === dragRef.current!.id);
      if (potato) {
        potato.x = x - dragRef.current.offsetX;
        potato.y = y - dragRef.current.offsetY;
        dragRef.current.lastX = x;
        dragRef.current.lastY = y;
      }
    }
  };

  const handlePointerUp = (e: React.MouseEvent | React.TouchEvent) => {
    if (dragRef.current) {
      const potato = potatoesRef.current.find((p) => p.id === dragRef.current!.id);
      if (potato) {
        const coords = "changedTouches" in e
          ? { x: e.changedTouches[0].clientX, y: e.changedTouches[0].clientY }
          : { x: (e as React.MouseEvent).clientX, y: (e as React.MouseEvent).clientY };
        const rect = canvasRef.current?.getBoundingClientRect();
        if (rect) {
          const cx = coords.x - rect.left;
          const cy = coords.y - rect.top;
          potato.vx = (cx - dragRef.current.lastX) * 0.5;
          potato.vy = (cy - dragRef.current.lastY) * 0.5;
          potato.vr = potato.vx * 0.05;
        }
      }
      dragRef.current = null;
    }
  };

  return (
    <div className="min-h-screen px-6 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-5xl font-display font-bold text-center mb-4">
          Potato Playground
        </h1>
        <p className="font-body text-sm text-center text-muted-foreground mb-6">
          Drag and throw potatoes around. Click below to add more.
        </p>

        <div className="text-center mb-6">
          <button
            onClick={() => canvasRef.current && spawnPotato(canvasRef.current)}
            className="bg-primary text-primary-foreground px-6 py-3 font-body uppercase text-sm tracking-wider hover:bg-accent hover:text-accent-foreground transition-colors border-2 border-primary"
          >
            Drop a Potato
          </button>
        </div>

        <div className="border-2 border-primary relative" style={{ height: "500px" }}>
          <canvas
            ref={canvasRef}
            className="w-full h-full block"
            onMouseDown={handlePointerDown}
            onMouseMove={handlePointerMove}
            onMouseUp={handlePointerUp}
            onMouseLeave={handlePointerUp}
            onTouchStart={handlePointerDown}
            onTouchMove={handlePointerMove}
            onTouchEnd={handlePointerUp}
          />
        </div>
      </div>
    </div>
  );
};

export default Playground;
