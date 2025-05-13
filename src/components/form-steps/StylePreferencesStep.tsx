import React, { useState, useEffect } from 'react';
import { FormData } from '../../types/form';
import StyleOption from "../StyleOption";
import { motion, AnimatePresence } from "framer-motion";

interface StylePreferencesStepProps {
  formData: FormData;
  onFormChange: (field: keyof FormData, value: any) => void;
}

const styles = [
  {
    id: "moderno",
    name: "styles",
    label: "Moderno",
    description: "Clean, contemporâneo, com linhas retas e minimalismo",
    imageSrc: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=500&auto=format&fit=crop"
  },
  {
    id: "classico",
    name: "styles",
    label: "Clássico",
    description: "Elegante, atemporal, com detalhes ornamentados",
    imageSrc: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=500&auto=format&fit=crop"
  },
  {
    id: "industrial",
    name: "styles",
    label: "Industrial",
    description: "Materiais brutos, metal, concreto aparente",
    imageSrc: "https://images.unsplash.com/photo-1525438160292-a4a860951216?q=80&w=500&auto=format&fit=crop"
  },
  {
    id: "escandinavo",
    name: "styles",
    label: "Escandinavo",
    description: "Funcional, madeiras claras, tons neutros",
    imageSrc: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=500&auto=format&fit=crop"
  },
  {
    id: "minimalista",
    name: "styles",
    label: "Minimalista",
    description: "Essencial, poucos elementos, ordem e clareza",
    imageSrc: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=500&auto=format&fit=crop"
  },
  {
    id: "rustico",
    name: "styles",
    label: "Rústico",
    description: "Aconchegante, materiais naturais, madeira",
    imageSrc: "https://images.unsplash.com/photo-1533377358125-8c9adf396a70?q=80&w=500&auto=format&fit=crop"
  },
  {
    id: "ecletico",
    name: "styles",
    label: "Eclético",
    description: "Mistura de estilos, personalizado",
    imageSrc: "https://images.unsplash.com/photo-1592247350590-4d37c73c7fb8?q=80&w=500&auto=format&fit=crop"
  }
];

const StyleMessage = ({ selectedCount }: { selectedCount: number }) => {
  const getMessage = () => {
    if (selectedCount === 0) {
      return {
        message: "Selecione os estilos que você mais se identifica",
        icon: "👆"
      };
    } else if (selectedCount === 1) {
      return {
        message: "Ótima escolha! Quer selecionar mais algum estilo?",
        icon: "👍"
      };
    } else if (selectedCount === 2) {
      return {
        message: "Excelente combinação! Suas escolhas ajudarão a definir seu projeto",
        icon: "✨"
      };
    } else {
      return {
        message: "Incrível! Você selecionou vários estilos que se complementam",
        icon: "🌟"
      };
    }
  };

  const { message, icon } = getMessage();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.4 }}
      className="mt-4 py-3 px-4 bg-architect-light/70 rounded-md text-architect-green/90 flex items-center gap-2"
    >
      <span className="text-xl">{icon}</span>
      <span className="font-medium">{message}</span>
    </motion.div>
  );
};

const StylePreferencesStep: React.FC<StylePreferencesStepProps> = ({ formData, onFormChange }) => {
  const [showStyleMessage, setShowStyleMessage] = useState(true);
  const [lastSelectedCount, setLastSelectedCount] = useState(formData.styles.length);

  useEffect(() => {
    // Apenas mostrar mensagem se o número de estilos selecionados mudar
    if (formData.styles.length !== lastSelectedCount) {
      setShowStyleMessage(true);
      setLastSelectedCount(formData.styles.length);
      
      // Esconder a mensagem após 6 segundos
      const timer = setTimeout(() => setShowStyleMessage(false), 6000);
      return () => clearTimeout(timer);
    }
  }, [formData.styles, lastSelectedCount]);

  const handleStyleSelect = (id: string) => {
    let updatedStyles = [...formData.styles];
    if (updatedStyles.includes(id)) {
      updatedStyles = updatedStyles.filter(style => style !== id);
    } else {
      updatedStyles.push(id);
    }
    onFormChange('styles', updatedStyles);
  };

  return (
    <div className="form-step space-y-8">
      <div>
        <h3 className="font-medium text-lg text-architect-dark mb-4">Quais estilos você mais se identifica?</h3>
        <p className="text-sm text-architect-dark/70 mb-6">Selecione todos os que você gosta (clique nas imagens)</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {styles.map((style) => (
            <StyleOption
              key={style.id}
              id={style.id}
              name={style.name}
              label={style.label}
              description={style.description}
              imageSrc={style.imageSrc}
              isSelected={formData.styles.includes(style.id)}
              onSelect={handleStyleSelect}
            />
          ))}
        </div>
        
        <AnimatePresence>
          {showStyleMessage && (
            <StyleMessage selectedCount={formData.styles.length} />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default StylePreferencesStep;
