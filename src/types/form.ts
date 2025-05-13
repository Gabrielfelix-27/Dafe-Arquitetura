export interface FormData {
  // Dados Básicos
  fullName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  
  // Objetivo do Projeto
  projectReason: string;
  transformationGoals: string;
  
  // Estilo e Preferências Estéticas
  styles: string[];
  otherStyle?: string;
  favoriteColors: string;
  dislikedColors: string;
  references: string;
  
  // Ambientes a Serem Projetados
  environments: string;
  
  // Funcionalidades e Necessidades Especiais
  residentsCount: string;
  hasPets: boolean;
  hasKidsOrElderly: boolean;
  hasAccessibilityNeeds: boolean;
  homeOfficeNeeds: string;
  
  // Equipamentos e Mobiliário
  existingFurniture: string;
  furniturePreference: 'planejados' | 'soltos' | 'mistos';
  preferredBrands: string;
  
  // Orçamento e Prazos
  budget: string;
  investmentLevel: 'economico' | 'intermediario' | 'altoPadrao';
  idealTimeframe: string;
  deadline: string;
  
  // Observações Adicionais
  additionalNotes: string;
}

export const defaultFormData: FormData = {
  fullName: '',
  phone: '',
  email: '',
  address: '',
  city: '',
  projectReason: '',
  transformationGoals: '',
  styles: [],
  favoriteColors: '',
  dislikedColors: '',
  references: '',
  environments: '',
  residentsCount: '',
  hasPets: false,
  hasKidsOrElderly: false,
  hasAccessibilityNeeds: false,
  homeOfficeNeeds: '',
  existingFurniture: '',
  furniturePreference: 'planejados',
  preferredBrands: '',
  budget: '',
  investmentLevel: 'intermediario',
  idealTimeframe: '',
  deadline: '',
  additionalNotes: '',
};

export interface FormStep {
  id: number;
  title: string;
  subtitle: string;
}

export const formSteps: FormStep[] = [
  {
    id: 1,
    title: "Dados Básicos",
    subtitle: "Informações pessoais e de contato"
  },
  {
    id: 2,
    title: "Objetivo do Projeto",
    subtitle: "Conte-nos sobre suas motivações para este projeto"
  },
  {
    id: 3,
    title: "Estilo e Preferências",
    subtitle: "Selecione os estilos que mais se identifica"
  },
  {
    id: 4,
    title: "Preferências Estéticas Detalhadas",
    subtitle: "Informações sobre cores e referências"
  },
  {
    id: 5,
    title: "Ambientes e Necessidades",
    subtitle: "Detalhes sobre os espaços a serem projetados"
  },
  {
    id: 6,
    title: "Mobiliário e Equipamentos",
    subtitle: "Informações sobre móveis e equipamentos desejados"
  },
  {
    id: 7,
    title: "Orçamento e Prazos",
    subtitle: "Defina seu investimento e cronograma"
  },
  {
    id: 8,
    title: "Finalização",
    subtitle: "Informações adicionais e envio"
  }
];
