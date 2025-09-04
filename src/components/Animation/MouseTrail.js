import React, { useEffect, useRef } from 'react';

const MouseTrail = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const trailRef = useRef([]);
  const particleCloudRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Mouse tracking
    const handleMouseMove = (e) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      
      // Add new trail point with enhanced properties
      trailRef.current.push({
        x: e.clientX,
        y: e.clientY,
        life: 1,
        size: Math.random() * 4 + 3,
        color: Math.random() > 0.6 ? '#FE4A56' : '#590404',
        angle: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.2,
        pulse: Math.random() * Math.PI * 2
      });
      
      // Add particle cloud around mouse
      for (let i = 0; i < 3; i++) {
        particleCloudRef.current.push({
          x: e.clientX + (Math.random() - 0.5) * 40,
          y: e.clientY + (Math.random() - 0.5) * 40,
          life: 1,
          size: Math.random() * 2 + 1,
          color: Math.random() > 0.7 ? '#FE4A56' : Math.random() > 0.4 ? '#590404' : '#FFFFFF',
          velocity: {
            x: (Math.random() - 0.5) * 3,
            y: (Math.random() - 0.5) * 3
          },
          angle: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.3
        });
      }
      
      // Limit array lengths
      if (trailRef.current.length > 25) {
        trailRef.current.shift();
      }
      if (particleCloudRef.current.length > 50) {
        particleCloudRef.current.shift();
      }
    };

    // Mouse leave effect
    const handleMouseLeave = () => {
      mouseRef.current.x = -100;
      mouseRef.current.y = -100;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    // Animation loop
    const animate = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw trail with enhanced effects
      trailRef.current.forEach((point, index) => {
        point.life -= 0.015;
        point.size *= 0.99;
        point.angle += point.rotationSpeed;
        point.pulse += 0.1;
        
        if (point.life > 0) {
          ctx.save();
          ctx.globalAlpha = point.life;
          
          // Dynamic color based on life and pulse
          const hue = point.life > 0.5 ? 340 : 350;
          const saturation = 70 + point.life * 30;
          const lightness = 40 + point.life * 20;
          const color = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
          
          ctx.fillStyle = color;
          ctx.shadowColor = color;
          ctx.shadowBlur = 15 + point.life * 10;
          
          // Rotating star effect
          ctx.translate(point.x, point.y);
          ctx.rotate(point.angle);
          
          const size = point.size * (0.8 + 0.2 * Math.sin(point.pulse));
          
          // Draw star shape
          ctx.beginPath();
          for (let i = 0; i < 5; i++) {
            const angle = (i * Math.PI * 2) / 5;
            const x = Math.cos(angle) * size;
            const y = Math.sin(angle) * size;
            if (i === 0) {
              ctx.moveTo(x, y);
            } else {
              ctx.lineTo(x, y);
            }
          }
          ctx.closePath();
          ctx.fill();
          
          ctx.restore();
        }
      });
      
      // Remove dead trail points
      trailRef.current = trailRef.current.filter(point => point.life > 0);
      
      // Update and draw particle clouds
      particleCloudRef.current.forEach((particle, index) => {
        particle.life -= 0.02;
        particle.x += particle.velocity.x;
        particle.y += particle.velocity.y;
        particle.angle += particle.rotationSpeed;
        particle.size *= 0.98;
        
        // Apply boids-like behavior
        particle.velocity.x *= 0.98;
        particle.velocity.y *= 0.98;
        
        if (particle.life > 0) {
          ctx.save();
          ctx.globalAlpha = particle.life;
          ctx.fillStyle = particle.color;
          ctx.shadowColor = particle.color;
          ctx.shadowBlur = 8;
          
          // Rotating particle
          ctx.translate(particle.x, particle.y);
          ctx.rotate(particle.angle);
          
          // Draw diamond shape
          ctx.beginPath();
          ctx.moveTo(0, -particle.size);
          ctx.lineTo(particle.size, 0);
          ctx.lineTo(0, particle.size);
          ctx.lineTo(-particle.size, 0);
          ctx.closePath();
          ctx.fill();
          
          ctx.restore();
        }
      });
      
      // Remove dead particles
      particleCloudRef.current = particleCloudRef.current.filter(particle => particle.life > 0);
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-50"
      style={{ background: 'transparent' }}
    />
  );
};

export default MouseTrail;
