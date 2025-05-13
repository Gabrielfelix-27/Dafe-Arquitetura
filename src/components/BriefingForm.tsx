import React, { useState } from 'react';
import { Button } from './ui/button';
import { defaultFormData, FormData, formSteps } from '../types/form';
import FormProgress from './FormProgress';
import BasicInfoStep from './form-steps/BasicInfoStep';
import ProjectObjectivesStep from './form-steps/ProjectObjectivesStep';
import StylePreferencesStep from './form-steps/StylePreferencesStep';
import EnvironmentNeedsStep from './form-steps/EnvironmentNeedsStep';
import FurnitureEquipmentStep from './form-steps/FurnitureEquipmentStep';
import BudgetTimelineStep from './form-steps/BudgetTimelineStep';
import FinalNotesStep from './form-steps/FinalNotesStep';
import SuccessMessage from './SuccessMessage';
import { useToast } from '../hooks/use-toast';
import { supabase } from '../integrations/supabase/client';
import DetailedStylePreferencesStep from './form-steps/DetailedStylePreferencesStep';

const BriefingForm = () => {
  const [formData, setFormData] = useState<FormData>(defaultFormData);
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleFormChange = (field: keyof FormData, value: any) => {
    setFormData(prevData => ({
      ...prevData,
      [field]: value
    }));
  };

  const handleNextStep = () => {
    if (validateCurrentStep()) {
      if (currentStep < formSteps.length) {
        setCurrentStep(prevStep => prevStep + 1);
        window.scrollTo(0, 0);
      }
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prevStep => prevStep - 1);
      window.scrollTo(0, 0);
    }
  };

  const validateCurrentStep = () => {
    // Simple validation for required fields per step
    if (currentStep === 1) {
      if (!formData.fullName || !formData.email || !formData.phone) {
        toast({
          title: "Campos obrigatórios",
          description: "Por favor, preencha os campos Nome, E-mail e Telefone.",
          variant: "destructive",
        });
        return false;
      }
      
      // Basic email validation
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(formData.email)) {
        toast({
          title: "E-mail inválido",
          description: "Por favor, forneça um endereço de e-mail válido.",
          variant: "destructive",
        });
        return false;
      }
    } else if (currentStep === 2) {
      if (!formData.projectReason) {
        toast({
          title: "Campo obrigatório",
          description: "Por favor, informe o motivo para o projeto de interiores.",
          variant: "destructive",
        });
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateCurrentStep()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Map form data to match the Supabase table structure
      const briefingData = {
        full_name: formData.fullName,
        phone: formData.phone,
        email: formData.email,
        address: formData.address,
        city: formData.city,
        project_reason: formData.projectReason,
        transformation_goals: formData.transformationGoals,
        styles: formData.styles,
        other_style: formData.otherStyle,
        favorite_colors: formData.favoriteColors,
        disliked_colors: formData.dislikedColors,
        design_references: formData.references,
        environments: formData.environments,
        residents_count: formData.residentsCount,
        has_pets: formData.hasPets,
        has_kids_or_elderly: formData.hasKidsOrElderly,
        has_accessibility_needs: formData.hasAccessibilityNeeds,
        home_office_needs: formData.homeOfficeNeeds,
        existing_furniture: formData.existingFurniture,
        furniture_preference: formData.furniturePreference,
        preferred_brands: formData.preferredBrands,
        budget: formData.budget,
        investment_level: formData.investmentLevel,
        ideal_timeframe: formData.idealTimeframe,
        deadline: formData.deadline,
        additional_notes: formData.additionalNotes
      };

      // Insert briefing into Supabase
      const { error } = await supabase
        .from('briefings')
        .insert([briefingData]);

      if (error) {
        throw error;
      }
      
      // Set success state
      setIsSubmitted(true);
      
      toast({
        title: "Formulário enviado com sucesso!",
        description: "Recebemos seu briefing e entraremos em contato em breve.",
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Erro ao enviar formulário",
        description: "Ocorreu um erro ao enviar seu briefing. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <BasicInfoStep formData={formData} onFormChange={handleFormChange} />;
      case 2:
        return <ProjectObjectivesStep formData={formData} onFormChange={handleFormChange} />;
      case 3:
        return <StylePreferencesStep formData={formData} onFormChange={handleFormChange} />;
      case 4:
        return <DetailedStylePreferencesStep formData={formData} onFormChange={handleFormChange} />;
      case 5:
        return <EnvironmentNeedsStep formData={formData} onFormChange={handleFormChange} />;
      case 6:
        return <FurnitureEquipmentStep formData={formData} onFormChange={handleFormChange} />;
      case 7:
        return <BudgetTimelineStep formData={formData} onFormChange={handleFormChange} />;
      case 8:
        return <FinalNotesStep formData={formData} onFormChange={handleFormChange} />;
      default:
        return null;
    }
  };

  if (isSubmitted) {
    return <SuccessMessage />;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div>
        <FormProgress currentStep={currentStep} totalSteps={formSteps.length} />
        
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-display font-medium text-architect-dark">
            {formSteps[currentStep - 1].title}
          </h2>
          <p className="mt-2 text-architect-dark/70">
            {formSteps[currentStep - 1].subtitle}
          </p>
        </div>
        
        {renderStepContent()}
      </div>
      
      <div className="flex flex-col-reverse sm:flex-row justify-between pt-6 border-t border-architect-beige/50">
        <div>
          {currentStep > 1 && (
            <Button
              type="button"
              variant="outline"
              onClick={handlePreviousStep}
              className="w-full sm:w-auto"
            >
              Voltar
            </Button>
          )}
        </div>
        
        <div className="mb-4 sm:mb-0">
          {currentStep < formSteps.length ? (
            <Button
              type="button"
              onClick={handleNextStep}
              className="w-full sm:w-auto bg-architect-green hover:bg-architect-green/90"
            >
              Próximo
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-full sm:w-auto bg-architect-accent hover:bg-architect-accent/90"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Enviando..." : "Enviar Briefing"}
            </Button>
          )}
        </div>
      </div>
    </form>
  );
};

export default BriefingForm;
