import React, { useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Box } from '@react-three/drei';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import BackgroundAnimation from './BackgroundAnimation';

// Interactive 3D Mascot Component
const Mascot = ({ position = [0, 0, 0] }) => {
  const groupRef = useRef();
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    // Interactive floating animation
    groupRef.current.position.y = position[1] + Math.sin(time * 1.5) * 0.1;
    
    // Interactive rotation based on mouse
    groupRef.current.rotation.y = time * 0.4;
    groupRef.current.rotation.x = Math.sin(time * 0.5) * 0.1;
    
    // Gentle scale animation
    const scale = 1 + Math.sin(time * 2) * 0.05;
    groupRef.current.scale.set(scale, scale, scale);
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Mascot body */}
      <Box args={[1, 1.5, 1]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#590404" />
      </Box>
      
      {/* Mascot head */}
      <Box args={[0.8, 0.8, 0.8]} position={[0, 1.2, 0]}>
        <meshStandardMaterial color="#FE4A56" />
      </Box>
      
      {/* Eyes */}
      <Box args={[0.1, 0.1, 0.1]} position={[-0.2, 1.3, 0.4]}>
        <meshStandardMaterial color="#FFFFFF" />
      </Box>
      <Box args={[0.1, 0.1, 0.1]} position={[0.2, 1.3, 0.4]}>
        <meshStandardMaterial color="#FFFFFF" />
      </Box>
      
      {/* Arms */}
      <Box args={[0.3, 1, 0.3]} position={[-0.8, 0.2, 0]}>
        <meshStandardMaterial color="#590404" />
      </Box>
      <Box args={[0.3, 1, 0.3]} position={[0.8, 0.2, 0]}>
        <meshStandardMaterial color="#590404" />
      </Box>
      
      {/* Legs */}
      <Box args={[0.3, 0.8, 0.3]} position={[-0.3, -1.2, 0]}>
        <meshStandardMaterial color="#590404" />
      </Box>
      <Box args={[0.3, 0.8, 0.3]} position={[0.3, -1.2, 0]}>
        <meshStandardMaterial color="#590404" />
      </Box>
    </group>
  );
};

// Interactive Floating Particles
const Particles = ({ count = 25 }) => {
  const particles = useRef();
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    for (let i = 0; i < count; i++) {
      const particle = particles.current.children[i];
      if (particle) {
        // Interactive movement
        particle.position.y += Math.sin(time + i * 0.5) * 0.01;
        particle.position.x += Math.cos(time + i * 0.3) * 0.01;
        particle.position.z += Math.sin(time + i * 0.7) * 0.005;
        
        // Interactive rotation
        particle.rotation.z += 0.01;
        particle.rotation.x += 0.005;
        
        // Interactive scale
        const scale = 1 + Math.sin(time + i) * 0.2;
        particle.scale.set(scale, scale, scale);
      }
    }
  });

  return (
    <group ref={particles}>
      {Array.from({ length: count }).map((_, i) => (
        <Box
          key={i}
          args={[0.08, 0.08, 0.08]}
          position={[
            (Math.random() - 0.5) * 25,
            (Math.random() - 0.5) * 25,
            (Math.random() - 0.5) * 25,
          ]}
        >
          <meshStandardMaterial 
            color={Math.random() > 0.5 ? "#FE4A56" : "#590404"}
            transparent
            opacity={0.6}
          />
        </Box>
      ))}
    </group>
  );
};

// Interactive 3D Scene
const Scene = () => {
  return (
    <>
      {/* Enhanced Lighting */}
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#FE4A56" />
      <pointLight position={[-10, -10, -10]} intensity={0.6} color="#590404" />
      <pointLight position={[0, 10, 0]} intensity={0.8} color="#FFFFFF" />
      
      {/* Mascot */}
      <Mascot position={[0, 0, 0]} />
      
      {/* Interactive floating particles */}
      <Particles count={25} />
      
      {/* Interactive camera controls */}
      <OrbitControls 
        enableZoom={true}
        enablePan={true}
        autoRotate
        autoRotateSpeed={0.5}
        maxPolarAngle={Math.PI / 1.5}
        minPolarAngle={Math.PI / 3}
        maxDistance={15}
        minDistance={5}
      />
    </>
  );
};

const IntroScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/');
    }, 4000); // Increased to 4 seconds for better interaction

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden">
      <BackgroundAnimation />
      
      <div className="relative z-10 flex flex-col items-center justify-center h-full">
        {/* 3D Canvas */}
        <div className="w-full h-2/3 max-w-5xl mx-auto">
          <Canvas
            camera={{ position: [0, 0, 8], fov: 75 }}
            style={{ background: 'transparent' }}
          >
            <Scene />
          </Canvas>
        </div>

        {/* Text Content */}
        <motion.div
          className="text-center px-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <motion.h1
            className="text-6xl md:text-8xl font-bold mb-6 gradient-text"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            whileHover={{ scale: 1.05 }}
          >
            YESSplora
          </motion.h1>
          
          <motion.p
            className="text-xl md:text-2xl text-neutral-light mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
          >
            Welcome to the ultimate campus treasure hunt adventure!
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
          >
            <motion.button
              className="px-8 py-4 bg-gradient-bg-primary text-neutral-light rounded-full font-bold text-lg hover:bg-gradient-bg-secondary transition-all duration-300 transform hover:scale-105"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/register')}
            >
              Start Adventure
            </motion.button>
          </motion.div>

          <motion.div
            className="mt-8 text-neutral-light text-opacity-60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 2 }}
          >
            <p>Move your mouse to interact with the 3D world...</p>
            <p className="text-sm mt-2">Loading your journey...</p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default IntroScreen;
