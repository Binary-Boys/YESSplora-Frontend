import React, { useEffect, useRef } from 'react';

const BackgroundAnimation = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const scrollRef = useRef(0);

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
    };

    // Scroll tracking
    const handleScroll = () => {
      scrollRef.current = window.scrollY;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    // Lava bubble system
    class SmokyCloud {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.spheres = [];
        this.life = Math.random() * 300 + 200;
        this.maxLife = this.life;
        this.velocity = {
          x: (Math.random() - 0.5) * 0.3,
          y: (Math.random() - 0.5) * 0.3
        };
        this.size = Math.random() * 80 + 40;
        this.color = Math.random() > 0.7 ? '#FE4A56' : Math.random() > 0.4 ? '#8B0000' : '#590404';
        
        // Create multiple spheres within the cloud
        for (let i = 0; i < 12; i++) {
          this.spheres.push({
            x: x + (Math.random() - 0.5) * this.size,
            y: y + (Math.random() - 0.5) * this.size,
            size: Math.random() * 8 + 3,
            opacity: Math.random() * 0.4 + 0.1,
            velocity: {
              x: (Math.random() - 0.5) * 1,
              y: (Math.random() - 0.5) * 1
            },
            pulse: Math.random() * Math.PI * 2
          });
        }
      }

      update() {
        this.life--;
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        
        // Update each sphere
        this.spheres.forEach(sphere => {
          sphere.x += sphere.velocity.x;
          sphere.y += sphere.velocity.y;
          sphere.pulse += 0.02;
          
          // Add some randomness to movement
          sphere.velocity.x += (Math.random() - 0.5) * 0.1;
          sphere.velocity.y += (Math.random() - 0.5) * 0.1;
          
          // Limit velocity
          sphere.velocity.x = Math.max(-1, Math.min(1, sphere.velocity.x));
          sphere.velocity.y = Math.max(-1, Math.min(1, sphere.velocity.y));
          
          // Keep spheres within cloud bounds
          const dx = sphere.x - this.x;
          const dy = sphere.y - this.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance > this.size) {
            const angle = Math.atan2(dy, dx);
            sphere.x = this.x + Math.cos(angle) * this.size;
            sphere.y = this.y + Math.sin(angle) * this.size;
          }
        });
      }

      draw() {
        const cloudAlpha = (this.life / this.maxLife) * 0.4;
        
        // Draw lava bubble background
        ctx.save();
        ctx.globalAlpha = cloudAlpha * 0.15;
        
        const gradient = ctx.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, this.size
        );
        gradient.addColorStop(0, `${this.color}60`);
        gradient.addColorStop(0.3, `${this.color}30`);
        gradient.addColorStop(0.7, `${this.color}10`);
        gradient.addColorStop(1, `${this.color}00`);
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
        
        // Draw individual spheres
        this.spheres.forEach(sphere => {
          ctx.save();
          ctx.globalAlpha = sphere.opacity * cloudAlpha;
          ctx.fillStyle = this.color;
          ctx.shadowColor = this.color;
          ctx.shadowBlur = 15;
          
          // Pulsing effect
          const pulseSize = sphere.size * (0.8 + 0.2 * Math.sin(sphere.pulse));
          
          ctx.beginPath();
          ctx.arc(sphere.x, sphere.y, pulseSize, 0, Math.PI * 2);
          ctx.fill();
          
          // Add inner glow
          ctx.globalAlpha = sphere.opacity * cloudAlpha * 0.5;
          ctx.shadowBlur = 8;
          ctx.beginPath();
          ctx.arc(sphere.x, sphere.y, pulseSize * 0.5, 0, Math.PI * 2);
          ctx.fill();
          
          ctx.restore();
        });
      }
    }

    // Floating sphere system
    class FloatingSphere {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 8 + 4; // Reduced size
        this.color = Math.random() > 0.6 ? '#FE4A56' : Math.random() > 0.3 ? '#590404' : '#FFFFFF';
        this.velocity = {
          x: (Math.random() - 0.5) * 0.8,
          y: (Math.random() - 0.5) * 0.8
        };
        this.life = Math.random() * 200 + 100;
        this.maxLife = this.life;
        this.pulse = Math.random() * Math.PI * 2;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.02;
      }

      update(mouseX, mouseY, scrollY) {
        this.life--;
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.pulse += 0.03;
        this.rotation += this.rotationSpeed;
        
        // Mouse influence
        if (mouseX > 0 && mouseY > 0) {
          const dx = mouseX - this.x;
          const dy = mouseY - this.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 150) {
            const force = (150 - distance) / 150;
            this.velocity.x += dx * force * 0.001;
            this.velocity.y += dy * force * 0.001;
          }
        }
        
        // Scroll influence
        this.y += scrollY * 0.005;
        
        // Bounce off edges
        if (this.x < this.size || this.x > canvas.width - this.size) {
          this.velocity.x *= -0.8;
        }
        if (this.y < this.size || this.y > canvas.height - this.size) {
          this.velocity.y *= -0.8;
        }
        
        // Keep within bounds
        this.x = Math.max(this.size, Math.min(canvas.width - this.size, this.x));
        this.y = Math.max(this.size, Math.min(canvas.height - this.size, this.y));
        
        // Limit velocity
        const speed = Math.sqrt(this.velocity.x * this.velocity.x + this.velocity.y * this.velocity.y);
        if (speed > 2) {
          this.velocity.x = (this.velocity.x / speed) * 2;
          this.velocity.y = (this.velocity.y / speed) * 2;
        }
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = (this.life / this.maxLife) * 0.3; // Reduced opacity
        
        // Pulsing size
        const pulseSize = this.size * (0.9 + 0.1 * Math.sin(this.pulse));
        
        // Outer glow
        ctx.shadowColor = this.color;
        ctx.shadowBlur = 20;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, pulseSize, 0, Math.PI * 2);
        ctx.fill();
        
        // Inner sphere
        ctx.shadowBlur = 0;
        ctx.fillStyle = '#FFFFFF';
        ctx.globalAlpha = (this.life / this.maxLife) * 0.8;
        ctx.beginPath();
        ctx.arc(this.x, this.y, pulseSize * 0.6, 0, Math.PI * 2);
        ctx.fill();
        
        // Rotating ring
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 2;
        ctx.globalAlpha = (this.life / this.maxLife) * 0.4;
        ctx.beginPath();
        ctx.arc(this.x, this.y, pulseSize * 1.2, 0, Math.PI * 2);
        ctx.stroke();
        
        ctx.restore();
      }
    }

    // Initialize systems
    const smokyClouds = [];
    const floatingSpheres = [];
    const cloudCount = Math.min(8, Math.floor((canvas.width * canvas.height) / 50000));
    const sphereCount = Math.min(5, Math.floor((canvas.width * canvas.height) / 100000)); // Reduced sphere count

    // Create initial smoky clouds in non-centric positions
    for (let i = 0; i < cloudCount; i++) {
      smokyClouds.push(new SmokyCloud(
        Math.random() * canvas.width,
        Math.random() * canvas.height
      ));
    }

    // Create floating spheres
    for (let i = 0; i < sphereCount; i++) {
      floatingSpheres.push(new FloatingSphere(
        Math.random() * canvas.width,
        Math.random() * canvas.height
      ));
    }

    // Animation loop
    const animate = () => {
      const time = Date.now() * 0.001;
      
      // Clear canvas with dark background
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Create multiple non-linear lava particle clouds
      for (let cloudIndex = 0; cloudIndex < 8; cloudIndex++) {
        const cloudOffset = cloudIndex * Math.PI * 2 / 8;
        const cloudX = Math.sin(time * 0.15 + cloudOffset) * canvas.width * 0.4 + canvas.width * 0.5;
        const cloudY = Math.cos(time * 0.2 + cloudOffset) * canvas.height * 0.4 + canvas.height * 0.5;
        
        // Create particle cloud for each lava mass
        for (let i = 0; i < 25; i++) {
          const particleOffset = i * Math.PI * 2 / 25;
          const particleRadius = 80 + Math.sin(time * 0.3 + i * 0.1) * 40;
          const particleX = cloudX + Math.cos(particleOffset + time * 0.5) * particleRadius;
          const particleY = cloudY + Math.sin(particleOffset + time * 0.4) * particleRadius;
          
          // Dynamic particle size and opacity
          const particleSize = 15 + Math.sin(time * 0.8 + i) * 8;
          const particleAlpha = 0.3 + Math.sin(time * 0.6 + i * 0.2) * 0.2;
          
          // Create radial gradient for each particle
          const particleGradient = ctx.createRadialGradient(
            particleX, particleY, 0,
            particleX, particleY, particleSize * 2
          );
          
          // Dynamic color based on particle position and time
          const colorIntensity = Math.sin(time * 0.4 + i * 0.1);
          const baseColor = colorIntensity > 0 ? '#FE4A56' : '#8B0000';
          const glowColor = colorIntensity > 0.5 ? '#FF4500' : '#590404';
          
          particleGradient.addColorStop(0, `${baseColor}${Math.floor(particleAlpha * 255).toString(16).padStart(2, '0')}`);
          particleGradient.addColorStop(0.5, `${glowColor}${Math.floor(particleAlpha * 0.5 * 255).toString(16).padStart(2, '0')}`);
          particleGradient.addColorStop(1, 'rgba(89, 4, 4, 0)');
          
          ctx.fillStyle = particleGradient;
          ctx.beginPath();
          ctx.arc(particleX, particleY, particleSize, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      
      // Add flowing lava streams with particle clusters
      for (let i = 0; i < 5; i++) {
        const streamOffset = i * Math.PI * 2 / 5;
        const streamX = Math.sin(time * 0.2 + streamOffset) * canvas.width * 0.3 + canvas.width * 0.5;
        const streamY = Math.cos(time * 0.3 + streamOffset) * canvas.height * 0.3 + canvas.height * 0.5;
        
        // Create particle cluster for each stream
        for (let j = 0; j < 15; j++) {
          const particleAngle = j * Math.PI * 2 / 15 + time * 0.3;
          const particleDistance = 60 + Math.sin(time * 0.4 + j * 0.2) * 30;
          const particleX = streamX + Math.cos(particleAngle) * particleDistance;
          const particleY = streamY + Math.sin(particleAngle) * particleDistance;
          
          const particleSize = 8 + Math.sin(time * 0.6 + j) * 4;
          const particleAlpha = 0.4 + Math.sin(time * 0.5 + j * 0.1) * 0.2;
          
          const particleGradient = ctx.createRadialGradient(
            particleX, particleY, 0,
            particleX, particleY, particleSize * 3
          );
          
          particleGradient.addColorStop(0, `rgba(254, 74, 86, ${particleAlpha})`);
          particleGradient.addColorStop(0.6, `rgba(139, 0, 0, ${particleAlpha * 0.6})`);
          particleGradient.addColorStop(1, 'rgba(89, 4, 4, 0)');
          
          ctx.fillStyle = particleGradient;
          ctx.beginPath();
          ctx.arc(particleX, particleY, particleSize, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      
      // Add heat distortion waves with particle effects
      for (let i = 0; i < 6; i++) {
        const waveOffset = i * Math.PI * 2 / 6;
        const waveX = Math.sin(time * 0.1 + waveOffset) * canvas.width * 0.4 + canvas.width * 0.5;
        const waveY = Math.cos(time * 0.15 + waveOffset) * canvas.height * 0.4 + canvas.height * 0.5;
        
        // Create particle ring for each heat wave
        for (let j = 0; j < 20; j++) {
          const particleAngle = j * Math.PI * 2 / 20 + time * 0.2;
          const waveRadius = 120 + Math.sin(time * 0.7 + i) * 40;
          const particleX = waveX + Math.cos(particleAngle) * waveRadius;
          const particleY = waveY + Math.sin(particleAngle) * waveRadius;
          
          const particleSize = 6 + Math.sin(time * 0.8 + j) * 3;
          const particleAlpha = 0.15 + Math.sin(time * 0.6 + j * 0.1) * 0.1;
          
          const particleGradient = ctx.createRadialGradient(
            particleX, particleY, 0,
            particleX, particleY, particleSize * 2
          );
          
          particleGradient.addColorStop(0, `rgba(255, 69, 0, ${particleAlpha})`);
          particleGradient.addColorStop(0.7, `rgba(139, 0, 0, ${particleAlpha * 0.5})`);
          particleGradient.addColorStop(1, 'rgba(89, 4, 4, 0)');
          
          ctx.fillStyle = particleGradient;
          ctx.beginPath();
          ctx.arc(particleX, particleY, particleSize, 0, Math.PI * 2);
          ctx.fill();
        }
            }
      
      // Add floating ember particles
      for (let i = 0; i < 40; i++) {
        const emberX = (Math.sin(time * 0.1 + i * 0.5) * canvas.width * 0.6 + canvas.width * 0.5) % canvas.width;
        const emberY = (Math.cos(time * 0.15 + i * 0.3) * canvas.height * 0.6 + canvas.height * 0.5) % canvas.height;
        
        const emberSize = 2 + Math.sin(time * 0.9 + i) * 1.5;
        const emberAlpha = 0.2 + Math.sin(time * 0.7 + i * 0.2) * 0.15;
        
        ctx.save();
        ctx.globalAlpha = emberAlpha;
        ctx.fillStyle = i % 3 === 0 ? '#FF4500' : i % 3 === 1 ? '#FE4A56' : '#8B0000';
        ctx.shadowColor = ctx.fillStyle;
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(emberX, emberY, emberSize, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
      
      // Update and draw smoky clouds
      smokyClouds.forEach((cloud, index) => {
        cloud.update();
        cloud.draw();

        // Remove dead clouds and create new ones
        if (cloud.life <= 0) {
          smokyClouds[index] = new SmokyCloud(
            Math.random() * canvas.width,
            Math.random() * canvas.height
          );
        }
      });

      // Create new smoky clouds occasionally
      if (Math.random() > 0.98 && smokyClouds.length < cloudCount + 2) {
        smokyClouds.push(new SmokyCloud(
          Math.random() * canvas.width,
          Math.random() * canvas.height
        ));
      }

      // Update and draw floating spheres
      floatingSpheres.forEach((sphere, index) => {
        sphere.update(mouseRef.current.x, mouseRef.current.y, scrollRef.current);
        sphere.draw();

        // Remove dead spheres and create new ones
        if (sphere.life <= 0) {
          floatingSpheres[index] = new FloatingSphere(
            Math.random() * canvas.width,
            Math.random() * canvas.height
          );
        }
      });

      // Create new floating spheres occasionally (reduced frequency)
      if (Math.random() > 0.99 && floatingSpheres.length < sphereCount + 2) {
        floatingSpheres.push(new FloatingSphere(
          Math.random() * canvas.width,
          Math.random() * canvas.height
        ));
      }

      animationRef.current = requestAnimationFrame(animate);
    };
    
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      style={{
        background: 'linear-gradient(135deg, #000000 0%, #590404 50%, #000000 100%)'
      }}
    />
  );
};

export default BackgroundAnimation;
