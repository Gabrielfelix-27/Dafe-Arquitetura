import React from 'react';
import { FormData } from '../../types/form';
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

interface DetailedStylePreferencesStepProps {
  formData: FormData;
  onFormChange: (field: keyof FormData, value: any) => void;
}

const DetailedStylePreferencesStep: React.FC<DetailedStylePreferencesStepProps> = ({ formData, onFormChange }) => {
  return (
    <div className="form-step space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="otherStyle">Outro estilo? Especifique:</Label>
          <Input
            id="otherStyle"
            placeholder="Descreva outro estilo que você goste"
            value={formData.otherStyle || ''}
            onChange={(e) => onFormChange('otherStyle', e.target.value)}
            className="mt-1.5"
          />
        </div>
        
        <div>
          <Label htmlFor="favoriteColors">Cores favoritas</Label>
          <Input
            id="favoriteColors"
            placeholder="Suas cores preferidas"
            value={formData.favoriteColors}
            onChange={(e) => onFormChange('favoriteColors', e.target.value)}
            className="mt-1.5"
          />
        </div>
        
        <div>
          <Label htmlFor="dislikedColors">Cores que não gosta</Label>
          <Input
            id="dislikedColors"
            placeholder="Cores que você evitaria"
            value={formData.dislikedColors}
            onChange={(e) => onFormChange('dislikedColors', e.target.value)}
            className="mt-1.5"
          />
        </div>
        
        <div>
          <Label htmlFor="references">Tem referências de ambientes (Pinterest, Instagram, etc)?</Label>
          <Textarea
            id="references"
            placeholder="Cole links ou descreva referências de ambientes que você gosta"
            value={formData.references}
            onChange={(e) => onFormChange('references', e.target.value)}
            className="mt-1.5"
          />
        </div>
      </div>
    </div>
  );
};

export default DetailedStylePreferencesStep; 