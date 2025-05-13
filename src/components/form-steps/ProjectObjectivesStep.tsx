
import React from 'react';
import { FormData } from '../../types/form';
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

interface ProjectObjectivesStepProps {
  formData: FormData;
  onFormChange: (field: keyof FormData, value: any) => void;
}

const ProjectObjectivesStep: React.FC<ProjectObjectivesStepProps> = ({ formData, onFormChange }) => {
  return (
    <div className="form-step space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="projectReason">Qual o principal motivo para contratar o projeto de interiores?</Label>
          <Textarea
            id="projectReason"
            placeholder="Conte-nos sobre sua motivação para esse projeto..."
            value={formData.projectReason}
            onChange={(e) => onFormChange('projectReason', e.target.value)}
            className="mt-1.5 min-h-[120px]"
          />
        </div>
        
        <div>
          <Label htmlFor="transformationGoals">O que deseja transformar, otimizar ou melhorar no espaço?</Label>
          <Textarea
            id="transformationGoals"
            placeholder="Descreva os objetivos de transformação para o seu espaço..."
            value={formData.transformationGoals}
            onChange={(e) => onFormChange('transformationGoals', e.target.value)}
            className="mt-1.5 min-h-[120px]"
          />
        </div>
      </div>
    </div>
  );
};

export default ProjectObjectivesStep;
