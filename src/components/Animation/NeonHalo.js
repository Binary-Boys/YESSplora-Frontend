import React, { useEffect, useRef, useState } from 'react';

const NeonHalo = ({ children, className = '', intensity = 1 }) => {
  const [isHovered, setIsHovered] = useState(false);
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    if (!isHovered) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      if (isHovered) {
        const time = Date.now() * 0.003;
        const rect = canvas.getBoundingClientRect();
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        // Multiple pulsing rings
        for (let i = 0; i < 3; i++) {
          const pulseSize = 50 + i * 20 + Math.sin(time + i) * 10;
          const alpha = (0.3 - i * 0.1) * intensity;
          
          ctx.save();
          ctx.globalAlpha = alpha;
          
          // Outer glow
          const gradient = ctx.createRadialGradient(
            centerX, centerY, 0,
            centerX, centerY, pulseSize
          );
          gradient.addColorStop(0, 'rgba(254, 74, 86, 0.2)');
          gradient.addColorStop(0.5, 'rgba(89, 4, 4, 0.1)');
          gradient.addColorStop(1, 'rgba(254, 74, 86, 0)');
          
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(centerX, centerY, pulseSize, 0, Math.PI * 2);
          ctx.fill();
          
          // Inner ring
          ctx.strokeStyle = '#FE4A56';
          ctx.lineWidth = 2;
          ctx.shadowColor = '#FE4A56';
          ctx.shadowBlur = 15;
          ctx.beginPath();
          ctx.arc(centerX, centerY, pulseSize * 0.7, 0, Math.PI * 2);
          ctx.stroke();
          
          ctx.restore();
        }
      }
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isHovered, intensity]);

  return (
    <div
      className={`relative ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
      {isHovered && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none z-10"
          style={{ background: 'transparent' }}
        />
      )}
    </div>
  );
};

export default NeonHalo;
