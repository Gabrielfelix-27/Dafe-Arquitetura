
import React from 'react';
import { FormData } from '../../types/form';
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

interface FurnitureEquipmentStepProps {
  formData: FormData;
  onFormChange: (field: keyof FormData, value: any) => void;
}

const FurnitureEquipmentStep: React.FC<FurnitureEquipmentStepProps> = ({ formData, onFormChange }) => {
  return (
    <div className="form-step space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="existingFurniture">Há móveis ou eletrodomésticos que deseja manter? Quais?</Label>
          <Textarea
            id="existingFurniture"
            placeholder="Liste os móveis e equipamentos que deseja manter no projeto"
            value={formData.existingFurniture}
            onChange={(e) => onFormChange('existingFurniture', e.target.value)}
            className="mt-1.5 min-h-[100px]"
          />
        </div>
        
        <div className="pt-4">
          <Label className="mb-3 block">Deseja móveis planejados, soltos ou mistos?</Label>
          <RadioGroup
            value={formData.furniturePreference}
            onValueChange={(value) => onFormChange('furniturePreference', value)}
            className="flex flex-col space-y-1"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="planejados" id="planejados" />
              <Label htmlFor="planejados" className="cursor-pointer">Planejados</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="soltos" id="soltos" />
              <Label htmlFor="soltos" className="cursor-pointer">Soltos</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="mistos" id="mistos" />
              <Label htmlFor="mistos" className="cursor-pointer">Mistos</Label>
            </div>
          </RadioGroup>
        </div>
        
        <div className="pt-4">
          <Label htmlFor="preferredBrands">Preferência por marcas ou fornecedores específicos?</Label>
          <Textarea
            id="preferredBrands"
            placeholder="Cite marcas ou fornecedores que você prefere"
            value={formData.preferredBrands}
            onChange={(e) => onFormChange('preferredBrands', e.target.value)}
            className="mt-1.5"
          />
        </div>
      </div>
    </div>
  );
};

export default FurnitureEquipmentStep;
