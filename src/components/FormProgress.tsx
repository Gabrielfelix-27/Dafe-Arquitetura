import React from 'react';
import { motion } from 'framer-motion';
import { formSteps } from '../types/form';

interface FormProgressProps {
  currentStep: number;
  totalSteps: number;
}

const FormProgress: React.FC<FormProgressProps> = ({ currentStep, totalSteps }) => {
  const progress = (currentStep / totalSteps) * 100;
  
  return (
    <div className="w-full mb-6 relative">
      <div className="flex justify-between mb-4 text-sm">
        <span className="text-architect-dark font-medium">
          <span className="text-architect-green font-semibold">Etapa {currentStep}</span>
          <span className="mx-2 text-architect-dark/40">•</span>
          <span className="text-architect-dark/80">{formSteps[currentStep - 1].title}</span>
        </span>
        <span className="text-architect-dark/70 font-medium">{currentStep}/{totalSteps}</span>
      </div>
      
      {/* Barra de progresso */}
      <div className="w-full h-1.5 bg-architect-beige/30 rounded-full overflow-hidden">
        <motion.div 
          className="h-full bg-gradient-to-r from-architect-green/70 to-architect-green rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ 
            duration: 0.5,
            ease: "easeOut"
          }}
        />
      </div>
      
      {/* Indicadores de etapas */}
      <div className="absolute top-9 left-0 right-0 flex justify-between">
        {formSteps.map((step, index) => {
          const isActive = currentStep > index;
          const isCurrent = currentStep === index + 1;
          
          return (
            <div 
              key={step.id} 
              className="flex flex-col items-center"
              style={{ width: `${100 / totalSteps}%` }}
            >
              <motion.div 
                className={`w-2.5 h-2.5 rounded-full ${
                  isCurrent 
                    ? 'bg-white border-2 border-architect-green' 
                    : isActive 
                      ? 'bg-architect-green' 
                      : 'bg-architect-beige/50'
                }`}
                initial={{ scale: 1 }}
                animate={{ scale: isCurrent ? 1.2 : 1 }}
                transition={{ duration: 0.3 }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FormProgress;
