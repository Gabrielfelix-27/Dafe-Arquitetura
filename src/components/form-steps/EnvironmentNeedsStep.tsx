import React, { useState, useEffect } from 'react';
import { FormData } from '../../types/form';
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Checkbox } from "../ui/checkbox";
import { motion, AnimatePresence } from "framer-motion";

interface EnvironmentNeedsStepProps {
  formData: FormData;
  onFormChange: (field: keyof FormData, value: any) => void;
}

const InteractiveMessage = ({ message, icon }: { message: string, icon: string }) => (
  <motion.div 
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.3 }}
    className="bg-architect-light/70 px-4 py-2 rounded-md mt-2 text-sm flex items-center gap-2 text-architect-green"
  >
    <span className="text-xl">{icon}</span>
    <span className="font-medium">{message}</span>
  </motion.div>
);

const EnvironmentNeedsStep: React.FC<EnvironmentNeedsStepProps> = ({ formData, onFormChange }) => {
  const [showPetsMessage, setShowPetsMessage] = useState(false);
  const [showKidsMessage, setShowKidsMessage] = useState(false);
  const [showAccessibilityMessage, setShowAccessibilityMessage] = useState(false);
  
  // Mostrar mensagens quando as opções são selecionadas
  useEffect(() => {
    if (formData.hasPets) {
      setShowPetsMessage(true);
      // Esconder após alguns segundos para não ficar sempre visível
      const timer = setTimeout(() => setShowPetsMessage(false), 6000);
      return () => clearTimeout(timer);
    }
  }, [formData.hasPets]);
  
  useEffect(() => {
    if (formData.hasKidsOrElderly) {
      setShowKidsMessage(true);
      const timer = setTimeout(() => setShowKidsMessage(false), 6000);
      return () => clearTimeout(timer);
    }
  }, [formData.hasKidsOrElderly]);
  
  useEffect(() => {
    if (formData.hasAccessibilityNeeds) {
      setShowAccessibilityMessage(true);
      const timer = setTimeout(() => setShowAccessibilityMessage(false), 6000);
      return () => clearTimeout(timer);
    }
  }, [formData.hasAccessibilityNeeds]);

  const handlePetsChange = (checked: boolean) => {
    onFormChange('hasPets', !!checked);
    if (checked) {
      setShowPetsMessage(true);
    }
  };

  const handleKidsElderlyChange = (checked: boolean) => {
    onFormChange('hasKidsOrElderly', !!checked);
    if (checked) {
      setShowKidsMessage(true);
    }
  };

  const handleAccessibilityChange = (checked: boolean) => {
    onFormChange('hasAccessibilityNeeds', !!checked);
    if (checked) {
      setShowAccessibilityMessage(true);
    }
  };
  
  return (
    <div className="form-step space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="environments">Liste os ambientes e suas necessidades específicas</Label>
          <Textarea
            id="environments"
            placeholder="Ex: Sala de estar (precisa acomodar 6 pessoas), Cozinha (precisa de espaço para refeições rápidas)..."
            value={formData.environments}
            onChange={(e) => onFormChange('environments', e.target.value)}
            className="mt-1.5 min-h-[120px]"
          />
        </div>
        
        <div className="pt-4">
          <h3 className="font-medium text-architect-dark mb-4">Funcionalidades e Necessidades Especiais</h3>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="residentsCount">Número de moradores e idades</Label>
              <Input
                id="residentsCount"
                placeholder="Ex: 2 adultos (35 e 40 anos), 1 criança (8 anos)"
                value={formData.residentsCount}
                onChange={(e) => onFormChange('residentsCount', e.target.value)}
                className="mt-1.5"
              />
            </div>
            
            <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-6">
              <div className="flex flex-col">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="hasPets" 
                    checked={formData.hasPets} 
                    onCheckedChange={handlePetsChange}
                  />
                  <Label htmlFor="hasPets" className="cursor-pointer">Possui animais de estimação</Label>
                </div>
                <AnimatePresence>
                  {showPetsMessage && (
                    <InteractiveMessage 
                      message="Que fofo! Os animais fazem a alegria da casa!" 
                      icon="🐾" 
                    />
                  )}
                </AnimatePresence>
              </div>
              
              <div className="flex flex-col">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="hasKidsOrElderly" 
                    checked={formData.hasKidsOrElderly} 
                    onCheckedChange={handleKidsElderlyChange}
                  />
                  <Label htmlFor="hasKidsOrElderly" className="cursor-pointer">Tem filhos pequenos ou idosos</Label>
                </div>
                <AnimatePresence>
                  {showKidsMessage && (
                    <InteractiveMessage 
                      message="Vamos priorizar conforto e segurança para toda família!" 
                      icon="👨‍👩‍👧‍👦" 
                    />
                  )}
                </AnimatePresence>
              </div>
              
              <div className="flex flex-col">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="hasAccessibilityNeeds" 
                    checked={formData.hasAccessibilityNeeds} 
                    onCheckedChange={handleAccessibilityChange}
                  />
                  <Label htmlFor="hasAccessibilityNeeds" className="cursor-pointer">Há necessidades especiais de acessibilidade</Label>
                </div>
                <AnimatePresence>
                  {showAccessibilityMessage && (
                    <InteractiveMessage 
                      message="Acessibilidade é essencial para um lar inclusivo!" 
                      icon="♿" 
                    />
                  )}
                </AnimatePresence>
              </div>
            </div>
            
            <div>
              <Label htmlFor="homeOfficeNeeds">Trabalha em home office? Precisa de espaço para isso?</Label>
              <Textarea
                id="homeOfficeNeeds"
                placeholder="Descreva suas necessidades de home office, se houver"
                value={formData.homeOfficeNeeds}
                onChange={(e) => onFormChange('homeOfficeNeeds', e.target.value)}
                className="mt-1.5"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnvironmentNeedsStep;
