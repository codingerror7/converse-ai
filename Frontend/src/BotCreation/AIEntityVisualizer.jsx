"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AIEntityVisualizer({ step = 1 }) {
  // Configs for the core based on creation step
  const coreVariants = {
    1: {
      scale: 0.8,
      opacity: 0.85,
      filter: "drop-shadow(0 0 25px rgba(124, 92, 255, 0.4))",
      color: "from-accent via-accent/80 to-accent/40"
    },
    2: {
      scale: 1.2,
      opacity: 0.95,
      filter: "drop-shadow(0 0 50px rgba(124, 92, 255, 0.65))",
      color: "from-accent via-[#A855F7] to-[#EC4899]"
    },
    3: {
      scale: 1.4,
      opacity: 1,
      filter: "drop-shadow(0 0 65px rgba(124, 92, 255, 0.8))",
      color: "from-[#8B5CF6] via-[#A855F7] to-[#3B82F6]"
    },
    4: {
      scale: 1.6,
      opacity: 1,
      filter: "drop-shadow(0 0 80px rgba(124, 92, 255, 0.95))",
      color: "from-[#7C5CFF] via-[#06B6D4] to-[#10B981]"
    }
  };

  const activeCore = coreVariants[step] || coreVariants[1];

  // Particles for Step 3 & 4
  const step3Nodes = [
    { id: 1, radius: 100, duration: 8, delay: 0 },
    { id: 2, radius: 130, duration: 12, delay: -3 },
    { id: 3, radius: 160, duration: 16, delay: -6 }
  ];

  const step4SphereNodes = Array.from({ length: 18 }, (_, i) => {
    const angle = (i * Math.PI * 2) / 18;
    const radiusX = 140 + Math.sin(i * 1.5) * 30;
    const radiusY = 80 + Math.cos(i * 1.5) * 20;
    return {
      id: i,
      angle,
      radiusX,
      radiusY,
      duration: 5 + (i % 4) * 3,
      size: 4 + (i % 3) * 2,
      color: i % 3 === 0 ? '#7C5CFF' : i % 3 === 1 ? '#06B6D4' : '#10B981'
    };
  });

  return (
    <div className="relative w-full h-[500px] flex items-center justify-center overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute w-[500px] h-[500px] rounded-full bg-accent/5 ambient-glow transition-all duration-1000" />
      
      {/* The Central AI Intelligence Core */}
      <div className="relative flex items-center justify-center">
        {/* Outer orbital rings (appear in later steps) */}
        <AnimatePresence>
          {step >= 2 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="absolute w-80 h-80 rounded-full border border-border/30 border-dashed animate-[spin_40s_linear_infinite]"
            />
          )}
          {step >= 3 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="absolute w-[400px] h-[400px] rounded-full border border-border/20 animate-[spin_60s_linear_infinite_reverse]"
            />
          )}
        </AnimatePresence>

        {/* Central Core Sphere */}
        <motion.div
          key={`core-${step}`}
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ 
            scale: activeCore.scale, 
            opacity: activeCore.opacity,
          }}
          transition={{ 
            type: "spring", 
            stiffness: 100, 
            damping: 15,
          }}
          className="relative z-10 w-32 h-32 rounded-full"
          style={{ filter: activeCore.filter }}
        >
          {/* Animated Core Pulse Layers */}
          <div className={`absolute inset-0 rounded-full bg-gradient-to-tr ${activeCore.color} animate-pulse-slow`} />
          <motion.div 
            animate={{ 
              scale: [1, 1.05, 1],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute -inset-2 rounded-full border border-accent/20 bg-accent/5" 
          />
          <motion.div 
            animate={{ 
              scale: [1, 1.15, 1],
              opacity: [0.1, 0.25, 0.1]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5
            }}
            className="absolute -inset-4 rounded-full border border-accent/10 bg-accent/2" 
          />
        </motion.div>

        {/* STEP 3 Nodes: Floating nodes revolving around the core */}
        {step === 3 && step3Nodes.map((node) => (
          <motion.div
            key={`s3-node-${node.id}`}
            animate={{ rotate: 360 }}
            transition={{
              duration: node.duration,
              repeat: Infinity,
              ease: "linear",
              delay: node.delay
            }}
            className="absolute top-1/2 left-1/2"
            style={{
              width: node.radius * 2,
              height: node.radius * 2,
              marginLeft: -node.radius,
              marginTop: -node.radius,
            }}
          >
            {/* The Node dot */}
            <div className="absolute top-0 left-1/2 -ml-2 w-4 h-4 rounded-full bg-accent border-2 border-primary shadow-lg shadow-accent/50" />
            
            {/* Small radial orbit connection */}
            <svg className="absolute inset-0 w-full h-full opacity-10 pointer-events-none">
              <circle cx={node.radius} cy={node.radius} r={node.radius} fill="none" stroke="#F5F5F7" strokeWidth="1" />
            </svg>
          </motion.div>
        ))}

        {/* STEP 4: Complete Intelligence Sphere of dense floating particles */}
        {step === 4 && step4SphereNodes.map((node) => (
          <motion.div
            key={`s4-node-${node.id}`}
            animate={{ 
              rotateX: 360,
              rotateY: 360,
            }}
            transition={{
              duration: node.duration,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute"
            style={{
              perspective: 1000,
              width: node.radiusX * 2,
              height: node.radiusY * 2,
            }}
          >
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.7, 1, 0.7]
              }}
              transition={{
                duration: 2 + (node.id % 3),
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute rounded-full shadow-lg"
              style={{
                width: node.size,
                height: node.size,
                backgroundColor: node.color,
                boxShadow: `0 0 10px ${node.color}`,
                top: '50%',
                left: '50%',
                transform: `translate(-50%, -50%) translate3d(${Math.sin(node.angle) * node.radiusX}px, ${Math.cos(node.angle) * node.radiusY}px, ${Math.sin(node.angle) * 50}px)`
              }}
            />
          </motion.div>
        ))}
      </div>
      
      {/* Dynamic guidance helper text inside the left panel */}
      <div className="absolute bottom-10 left-0 right-0 text-center px-10">
        <h4 className="text-lg font-bold tracking-tight mb-2 text-primary">
          {step === 1 && "Core Instantiated"}
          {step === 2 && "Synthesizing Environment"}
          {step === 3 && "Integrating Intelligence Domains"}
          {step === 4 && "AI Employee Fully Aligned"}
        </h4>
        <p className="text-xs text-secondary max-w-sm mx-auto leading-relaxed">
          {step === 1 && "The foundational cognitive engine is online. Choose a deployment category to specialize its operational scope."}
          {step === 2 && "Naming and describing the employee maps their strategic objectives to your organization's business structure."}
          {step === 3 && "Defining character profiles, templates, and conversational styles initializes the relational communication model."}
          {step === 4 && "Reviewing details and structure before finalizing the deployment configuration."}
        </p>
      </div>
    </div>
  );
}
