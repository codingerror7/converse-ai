"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, CheckCircle, Terminal, Cpu } from 'lucide-react';
import Card from '../common/Card';
import Badge from '../common/Badge';
import GenerationStageCard from './GenerationStageCard';

const STAGES = [
  { id: 0, label: 'Analyzing Industry' },
  { id: 1, label: 'Designing Personality' },
  { id: 2, label: 'Creating Conversation Framework' },
  { id: 3, label: 'Building Knowledge Structure' },
  { id: 4, label: 'Training Intelligence Layer' },
  { id: 5, label: 'Preparing Deployment' },
  { id: 6, label: 'Deploying AI Employee' }
];

const METRICS_LOGS = [
  "Initializing cognitive compiler...",
  "Loading industry domain matrices...",
  "Synthesizing vocabulary datasets...",
  "Calibrating semantic embeddings...",
  "Validating alignment constraints...",
  "Constructing dialog graph trees...",
  "Optimizing feedforward pathways...",
  "Configuring vector databases...",
  "Injecting safety protocols...",
  "Finalizing weight allocations...",
  "Spawning server instance...",
  "Connecting webhook protocols...",
  "Deploying active socket hooks...",
  "System fully online."
];

export default function GenerationScreen() {
  const router = useRouter();
  const [currentStage, setCurrentStage] = useState(0);
  const [logs, setLogs] = useState([]);
  const [logIndex, setLogIndex] = useState(0);

  // Auto-progress stages
  useEffect(() => {
    if (currentStage >= STAGES.length) {
      const timeout = setTimeout(() => {
        router.push('/dashboard');
      }, 1500);
      return () => clearTimeout(timeout);
    }

    const duration = 1800 + Math.random() * 800; // time per step
    const interval = setTimeout(() => {
      setCurrentStage((prev) => prev + 1);
    }, duration);

    return () => clearTimeout(interval);
  }, [currentStage, router]);

  // Stream live logs
  useEffect(() => {
    if (logIndex >= METRICS_LOGS.length) return;

    const interval = setInterval(() => {
      setLogs((prev) => [...prev.slice(-6), {
        time: new Date().toLocaleTimeString(),
        text: METRICS_LOGS[logIndex]
      }]);
      setLogIndex((prev) => prev + 1);
    }, 900);

    return () => clearInterval(interval);
  }, [logIndex]);

  return (
    <div className="min-h-screen bg-background flex flex-col justify-center items-center py-16 px-4 md:px-8 bg-mesh">
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background pointer-events-none" />
      
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-12 gap-8 items-center z-10">
        
        {/* Left Side - The Core Assembly */}
        <div className="md:col-span-5 flex flex-col items-center justify-center space-y-6 text-center">
          <div className="relative w-64 h-64 flex items-center justify-center">
            
            {/* Ambient Lighting Ring */}
            <motion.div
              animate={{ 
                rotate: 360,
                scale: [1, 1.05, 1],
              }}
              transition={{ 
                rotate: { duration: 15, repeat: Infinity, ease: "linear" },
                scale: { duration: 3, repeat: Infinity, ease: "easeInOut" }
              }}
              className="absolute inset-0 rounded-full border border-accent/20 border-dashed"
            />

            {/* Glowing Orb Core */}
            <motion.div
              animate={{ 
                scale: [0.95, 1.05, 0.95],
                boxShadow: [
                  "0 0 40px rgba(124, 92, 255, 0.4)",
                  "0 0 80px rgba(124, 92, 255, 0.7)",
                  "0 0 40px rgba(124, 92, 255, 0.4)"
                ]
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="w-40 h-40 rounded-full bg-gradient-to-tr from-[#7C5CFF] via-[#06B6D4] to-[#10B981] flex items-center justify-center relative"
            >
              <Cpu size={48} className="text-white animate-pulse" />
              
              {/* Concentric expanding ripples */}
              <div className="absolute inset-0 rounded-full border-2 border-accent/30 animate-ping opacity-75" />
            </motion.div>

            {/* Orbiting particles */}
            <div className="absolute w-52 h-52 animate-[spin_8s_linear_infinite]">
              <div className="absolute top-0 left-1/2 w-3.5 h-3.5 rounded-full bg-[#06B6D4] shadow-lg shadow-[#06B6D4]/50" />
            </div>
            <div className="absolute w-56 h-56 animate-[spin_12s_linear_infinite_reverse]">
              <div className="absolute bottom-0 left-1/2 w-4 h-4 rounded-full bg-[#10B981] shadow-lg shadow-[#10B981]/50" />
            </div>
          </div>

          <div className="space-y-1">
            <Badge variant="accent" className="animate-pulse">Assembly In Progress</Badge>
            <h2 className="text-xl font-extrabold tracking-tight text-primary">Synthesizing Neural Framework</h2>
            <p className="text-xs text-secondary max-w-xs mx-auto">
              Please do not refresh. Preparing vectors and cognitive nodes for production runtime.
            </p>
          </div>
        </div>

        {/* Right Side - Assembly stages list */}
        <div className="md:col-span-7 space-y-6">
          <Card elevation="elevated" className="bg-surface-elevated border-border/80 p-6 space-y-5">
            <h3 className="text-sm font-bold uppercase tracking-wider text-secondary flex items-center gap-2">
              <Terminal size={14} className="text-accent" /> Timeline Checklist
            </h3>
            
            <div className="space-y-3">
              {STAGES.map((stage) => (
                <GenerationStageCard
                  key={stage.id}
                  label={stage.label}
                  isActive={currentStage === stage.id}
                  isCompleted={currentStage > stage.id}
                />
              ))}
            </div>
          </Card>

          {/* Telemetry log window */}
          <Card elevation="none" className="bg-[#050506] border border-border/60 p-4 rounded-2xl">
            <div className="flex items-center justify-between mb-3 border-b border-border/30 pb-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-secondary flex items-center gap-1.5">
                <Terminal size={10} /> Active Compiler logs
              </span>
              <span className="text-[9px] text-[#2ED47A] font-medium animate-pulse">Connection Stable</span>
            </div>
            
            <div className="space-y-1.5 font-mono text-[10px] text-secondary/80 min-h-[110px] overflow-hidden">
              <AnimatePresence initial={false}>
                {logs.map((log, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-2"
                  >
                    <span className="text-accent font-semibold">{log.time}</span>
                    <span className="text-primary/95 font-medium">{log.text}</span>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </Card>
        </div>

      </div>
    </div>
  );
}
