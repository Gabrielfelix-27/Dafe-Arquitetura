import React from 'react';
import { motion } from 'framer-motion';

interface MotivationalMessagesProps {
  step: number;
  totalSteps: number;
}

const MotivationalMessages: React.FC<MotivationalMessagesProps> = ({ step, totalSteps }) => {
  const progress = Math.floor((step / totalSteps) * 100);
  
  const getMessage = () => {
    if (progress < 20) {
      return {
        text: "Vamos dar vida ao seu espaço ideal",
        icon: "🏡"
      };
    } else if (progress < 40) {
      return {
        text: "Seu projeto está começando a ganhar forma",
        icon: "✏️"
      };
    } else if (progress < 60) {
      return {
        text: "Estamos conhecendo seu estilo único",
        icon: "🎨"
      };
    } else if (progress < 80) {
      return {
        text: "Detalhes que farão toda a diferença",
        icon: "✨"
      };
    } else {
      return {
        text: "Quase lá! Seu sonho está prestes a se tornar realidade",
        icon: "🌟"
      };
    }
  };
  
  const message = getMessage();
  
  return (
    <motion.div 
      className="flex items-center gap-3 text-sm text-architect-green/90 mt-1 mb-4"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      key={step} // Key para recriar a animação em cada mudança de step
    >
      <span className="text-xl">{message.icon}</span>
      <span className="font-medium italic">{message.text}</span>
    </motion.div>
  );
};

export default MotivationalMessages; 