import React, { useState, useEffect } from 'react';
import { FormData } from '../../types/form';
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { motion, AnimatePresence } from "framer-motion";

interface BudgetTimelineStepProps {
  formData: FormData;
  onFormChange: (field: keyof FormData, value: any) => void;
}

const InvestmentTip = ({ message, icon }: { message: string, icon: string }) => (
  <motion.div 
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: 20 }}
    transition={{ duration: 0.4 }}
    className="mt-3 p-3 bg-architect-light rounded-md text-sm flex items-center gap-2 text-architect-green/90 border-l-2 border-architect-green/50"
  >
    <span className="text-xl">{icon}</span>
    <span>{message}</span>
  </motion.div>
);

const BudgetTimelineStep: React.FC<BudgetTimelineStepProps> = ({ formData, onFormChange }) => {
  const [showInvestmentTip, setShowInvestmentTip] = useState(false);
  
  // Exibir dicas para o nível de investimento selecionado
  useEffect(() => {
    if (formData.investmentLevel) {
      setShowInvestmentTip(true);
      // Esconder após 8 segundos
      const timer = setTimeout(() => setShowInvestmentTip(false), 8000);
      return () => clearTimeout(timer);
    }
  }, [formData.investmentLevel]);
  
  const getInvestmentTip = () => {
    switch (formData.investmentLevel) {
      case 'economico':
        return {
          message: "Podemos otimizar o orçamento focando em soluções criativas e materiais custo-benefício!",
          icon: "💰"
        };
      case 'intermediario':
        return {
          message: "Ótima escolha! Conseguiremos balancear qualidade e custo para um resultado excelente.",
          icon: "⭐"
        };
      case 'altoPadrao':
        return {
          message: "Vamos explorar materiais premium e soluções exclusivas para criar um ambiente sofisticado.",
          icon: "✨"
        };
      default:
        return { message: "", icon: "" };
    }
  };

  const handleInvestmentChange = (value: string) => {
    onFormChange('investmentLevel', value);
    setShowInvestmentTip(true);
  };
  
  return (
    <div className="form-step space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="budget">Orçamento estimado para execução (móveis, obras, decoração)</Label>
          <Input
            id="budget"
            placeholder="Ex: R$ 50.000,00"
            value={formData.budget}
            onChange={(e) => onFormChange('budget', e.target.value)}
            className="mt-1.5"
          />
        </div>
        
        <div className="pt-4">
          <Label className="mb-3 block">Nível de investimento</Label>
          <RadioGroup
            value={formData.investmentLevel}
            onValueChange={handleInvestmentChange}
            className="flex flex-col space-y-1"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="economico" id="economico" />
              <Label htmlFor="economico" className="cursor-pointer">Econômico</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="intermediario" id="intermediario" />
              <Label htmlFor="intermediario" className="cursor-pointer">Intermediário</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="altoPadrao" id="altoPadrao" />
              <Label htmlFor="altoPadrao" className="cursor-pointer">Alto padrão</Label>
            </div>
          </RadioGroup>
          
          <AnimatePresence>
            {showInvestmentTip && formData.investmentLevel && (
              <InvestmentTip 
                message={getInvestmentTip().message} 
                icon={getInvestmentTip().icon} 
              />
            )}
          </AnimatePresence>
        </div>
        
        <div className="pt-4">
          <div className="space-y-4">
            <div>
              <Label htmlFor="idealTimeframe">Qual o prazo ideal para entrega do projeto?</Label>
              <Input
                id="idealTimeframe"
                placeholder="Ex: 2 meses"
                value={formData.idealTimeframe}
                onChange={(e) => onFormChange('idealTimeframe', e.target.value)}
                className="mt-1.5"
              />
            </div>
            
            <div>
              <Label htmlFor="deadline">Existe alguma data limite para finalização da obra ou decoração?</Label>
              <Input
                id="deadline"
                placeholder="Ex: Até dezembro de 2023"
                value={formData.deadline}
                onChange={(e) => onFormChange('deadline', e.target.value)}
                className="mt-1.5"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BudgetTimelineStep;
