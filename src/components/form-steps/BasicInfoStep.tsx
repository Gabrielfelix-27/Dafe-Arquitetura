
import React from 'react';
import { FormData } from '../../types/form';
import { Input } from "../ui/input";
import { Label } from "../ui/label";

interface BasicInfoStepProps {
  formData: FormData;
  onFormChange: (field: keyof FormData, value: any) => void;
}

const BasicInfoStep: React.FC<BasicInfoStepProps> = ({ formData, onFormChange }) => {
  return (
    <div className="form-step space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="fullName">Nome completo</Label>
          <Input
            id="fullName"
            placeholder="Seu nome completo"
            value={formData.fullName}
            onChange={(e) => onFormChange('fullName', e.target.value)}
            className="mt-1.5"
          />
        </div>
        
        <div>
          <Label htmlFor="phone">Telefone / WhatsApp</Label>
          <Input
            id="phone"
            placeholder="(00) 00000-0000"
            value={formData.phone}
            onChange={(e) => onFormChange('phone', e.target.value)}
            className="mt-1.5"
          />
        </div>
        
        <div>
          <Label htmlFor="email">E-mail</Label>
          <Input
            id="email"
            placeholder="seuemail@exemplo.com"
            type="email"
            value={formData.email}
            onChange={(e) => onFormChange('email', e.target.value)}
            className="mt-1.5"
          />
        </div>
        
        <div>
          <Label htmlFor="address">Endereço do imóvel</Label>
          <Input
            id="address"
            placeholder="Endereço completo"
            value={formData.address}
            onChange={(e) => onFormChange('address', e.target.value)}
            className="mt-1.5"
          />
        </div>
        
        <div>
          <Label htmlFor="city">Cidade</Label>
          <Input
            id="city"
            placeholder="Sua cidade"
            value={formData.city}
            onChange={(e) => onFormChange('city', e.target.value)}
            className="mt-1.5"
          />
        </div>
      </div>
    </div>
  );
};

export default BasicInfoStep;
