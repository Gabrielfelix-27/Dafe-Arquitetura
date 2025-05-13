
import React from 'react';
import { FormData } from '../../types/form';
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

interface FinalNotesStepProps {
  formData: FormData;
  onFormChange: (field: keyof FormData, value: any) => void;
}

const FinalNotesStep: React.FC<FinalNotesStepProps> = ({ formData, onFormChange }) => {
  return (
    <div className="form-step space-y-6">
      <div>
        <Label htmlFor="additionalNotes">Observações adicionais</Label>
        <Textarea
          id="additionalNotes"
          placeholder="Compartilhe quaisquer informações adicionais ou preocupações específicas que você tenha sobre seu projeto"
          value={formData.additionalNotes}
          onChange={(e) => onFormChange('additionalNotes', e.target.value)}
          className="mt-1.5 min-h-[200px]"
        />
      </div>
      
      <div className="pt-4 text-sm text-architect-dark/70">
        <p>Ao enviar este formulário, você concorda em receber um contato da arquiteta Dannieli Felix para discutir seu projeto.</p>
      </div>
    </div>
  );
};

export default FinalNotesStep;
