import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';
import { Document, Packer, Paragraph, TextRun, HeadingLevel, Table, TableRow, TableCell, BorderStyle } from 'docx';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export interface BriefingData {
  id: string;
  created_at: string;
  full_name: string;
  email: string;
  phone: string;
  project_reason: string;
  environments: string;
  investment_level: string;
  styles: string[];
  address?: string;
  city?: string;
  transformation_goals?: string;
  other_style?: string;
  favorite_colors?: string;
  disliked_colors?: string;
  design_references?: string;
  residents_count?: string;
  has_pets?: boolean;
  has_kids_or_elderly?: boolean;
  has_accessibility_needs?: boolean;
  home_office_needs?: string;
  existing_furniture?: string;
  furniture_preference?: string;
  preferred_brands?: string;
  budget?: string;
  ideal_timeframe?: string;
  deadline?: string;
  additional_notes?: string;
}

const formatDate = (dateString: string) => {
  try {
    return format(new Date(dateString), "dd 'de' MMMM 'de' yyyy, HH:mm", { locale: ptBR });
  } catch (e) {
    return dateString;
  }
};

const getInvestmentLevelText = (level: string) => {
  switch (level) {
    case 'economico': return 'Econômico';
    case 'intermediario': return 'Intermediário';
    case 'altoPadrao': return 'Alto Padrão';
    default: return level;
  }
};

// Exportar para PDF
export const exportToPDF = async (briefingId: string, briefingData: BriefingData) => {
  const element = document.getElementById('briefing-print-container');
  if (!element) {
    console.error('Elemento de impressão não encontrado');
    return;
  }

  try {
    // O elemento já está visível e configurado pelo componente Admin

    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      logging: false,
      backgroundColor: '#ffffff',
      imageTimeout: 0,
      windowWidth: 1200,
    });
    
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });
    
    const imgWidth = 210;  // A4 width in mm
    const pageHeight = 297;  // A4 height in mm
    const imgHeight = canvas.height * imgWidth / canvas.width;
    let heightLeft = imgHeight;
    let position = 0;
    
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;
    
    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }
    
    pdf.save(`Briefing_${briefingData.full_name.replace(/ /g, '_')}.pdf`);
  } catch (error) {
    console.error('Erro ao exportar para PDF:', error);
  }
};

// Exportar para DOC
export const exportToDOC = async (briefingData: BriefingData) => {
  try {
    const doc = new Document({
      sections: [
        {
          properties: {},
          children: [
            new Paragraph({
              text: "Briefing de Projeto Arquitetônico",
              heading: HeadingLevel.HEADING_1,
              spacing: {
                after: 200
              }
            }),
            
            new Paragraph({
              text: `Cliente: ${briefingData.full_name}`,
              heading: HeadingLevel.HEADING_2,
              spacing: {
                after: 100
              }
            }),
            
            new Paragraph({
              text: `Data: ${formatDate(briefingData.created_at)}`,
              spacing: {
                after: 400
              }
            }),
            
            // Dados Básicos
            new Paragraph({
              text: "DADOS BÁSICOS",
              heading: HeadingLevel.HEADING_3,
              spacing: {
                after: 200
              }
            }),
            
            createDetailsTable([
              { label: "Nome", value: briefingData.full_name },
              { label: "Email", value: briefingData.email },
              { label: "Telefone", value: briefingData.phone },
              { label: "Endereço", value: briefingData.address || "-" },
              { label: "Cidade", value: briefingData.city || "-" },
            ]),
            
            // Objetivo do Projeto
            new Paragraph({
              text: "OBJETIVO DO PROJETO",
              heading: HeadingLevel.HEADING_3,
              spacing: {
                before: 400,
                after: 200
              }
            }),
            
            new Paragraph({
              text: "Motivo do projeto:"
            }),
            new Paragraph({
              text: briefingData.project_reason || "-",
              spacing: {
                after: 200
              }
            }),
            
            new Paragraph({
              text: "Objetivos de transformação:"
            }),
            new Paragraph({
              text: briefingData.transformation_goals || "-",
              spacing: {
                after: 200
              }
            }),
            
            // Estilo e Preferências
            new Paragraph({
              text: "ESTILO E PREFERÊNCIAS",
              heading: HeadingLevel.HEADING_3,
              spacing: {
                before: 400,
                after: 200
              }
            }),
            
            createDetailsTable([
              { label: "Estilos", value: Array.isArray(briefingData.styles) ? briefingData.styles.join(", ") : briefingData.styles },
              { label: "Outro estilo", value: briefingData.other_style || "-" },
              { label: "Cores favoritas", value: briefingData.favorite_colors || "-" },
              { label: "Cores que não gosta", value: briefingData.disliked_colors || "-" },
            ]),
            
            new Paragraph({
              text: "Referências:",
              spacing: {
                before: 200
              }
            }),
            new Paragraph({
              text: briefingData.design_references || "-",
              spacing: {
                after: 200
              }
            }),
            
            // Ambientes e Necessidades
            new Paragraph({
              text: "AMBIENTES E NECESSIDADES",
              heading: HeadingLevel.HEADING_3,
              spacing: {
                before: 400,
                after: 200
              }
            }),
            
            new Paragraph({
              text: "Ambientes a serem projetados:"
            }),
            new Paragraph({
              text: briefingData.environments || "-",
              spacing: {
                after: 200
              }
            }),
            
            createDetailsTable([
              { label: "Número de residentes", value: briefingData.residents_count || "-" },
              { label: "Possui animais de estimação", value: briefingData.has_pets ? "Sim" : "Não" },
              { label: "Possui crianças ou idosos", value: briefingData.has_kids_or_elderly ? "Sim" : "Não" },
              { label: "Necessidades de acessibilidade", value: briefingData.has_accessibility_needs ? "Sim" : "Não" },
            ]),
            
            new Paragraph({
              text: "Necessidades de home office:",
              spacing: {
                before: 200
              }
            }),
            new Paragraph({
              text: briefingData.home_office_needs || "-",
              spacing: {
                after: 200
              }
            }),
            
            // Mobiliário
            new Paragraph({
              text: "MOBILIÁRIO",
              heading: HeadingLevel.HEADING_3,
              spacing: {
                before: 400,
                after: 200
              }
            }),
            
            new Paragraph({
              text: "Mobiliário existente:"
            }),
            new Paragraph({
              text: briefingData.existing_furniture || "-",
              spacing: {
                after: 200
              }
            }),
            
            createDetailsTable([
              { label: "Preferência de mobiliário", value: briefingData.furniture_preference === "planejados" ? "Móveis Planejados" : 
                                                        briefingData.furniture_preference === "soltos" ? "Móveis Soltos" : 
                                                        briefingData.furniture_preference === "mistos" ? "Mistos" : 
                                                        briefingData.furniture_preference || "-" },
              { label: "Marcas preferidas", value: briefingData.preferred_brands || "-" },
            ]),
            
            // Orçamento e Prazos
            new Paragraph({
              text: "ORÇAMENTO E PRAZOS",
              heading: HeadingLevel.HEADING_3,
              spacing: {
                before: 400,
                after: 200
              }
            }),
            
            createDetailsTable([
              { label: "Orçamento disponível", value: briefingData.budget || "-" },
              { label: "Nível de investimento", value: getInvestmentLevelText(briefingData.investment_level) },
              { label: "Prazo ideal", value: briefingData.ideal_timeframe || "-" },
              { label: "Data limite", value: briefingData.deadline || "-" },
            ]),
            
            // Observações Adicionais
            ...(briefingData.additional_notes ? [
              new Paragraph({
                text: "OBSERVAÇÕES ADICIONAIS",
                heading: HeadingLevel.HEADING_3,
                spacing: {
                  before: 400,
                  after: 200
                }
              }),
              
              new Paragraph({
                text: briefingData.additional_notes
              })
            ] : []),
          ]
        }
      ]
    });
    
    // Gera o arquivo DOCX
    const buffer = await Packer.toBuffer(doc);
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
    saveAs(blob, `Briefing_${briefingData.full_name.replace(/ /g, '_')}.docx`);
    
  } catch (error) {
    console.error('Erro ao exportar para DOCX:', error);
  }
};

// Função auxiliar para criar tabelas para o formato DOC
function createDetailsTable(items: { label: string, value: string }[]) {
  const rows = items.map(item => {
    return new TableRow({
      children: [
        new TableCell({
          children: [new Paragraph(item.label)],
          width: {
            size: 30,
            type: 'pct'
          }
        }),
        new TableCell({
          children: [new Paragraph(item.value)],
          width: {
            size: 70,
            type: 'pct'
          }
        })
      ]
    });
  });

  return new Table({
    rows,
    width: {
      size: 100,
      type: 'pct'
    },
    borders: {
      top: { style: BorderStyle.SINGLE, size: 1, color: '#D1D5DB' },
      bottom: { style: BorderStyle.SINGLE, size: 1, color: '#D1D5DB' },
      left: { style: BorderStyle.SINGLE, size: 1, color: '#D1D5DB' },
      right: { style: BorderStyle.SINGLE, size: 1, color: '#D1D5DB' },
      insideHorizontal: { style: BorderStyle.SINGLE, size: 1, color: '#D1D5DB' },
      insideVertical: { style: BorderStyle.SINGLE, size: 1, color: '#D1D5DB' }
    }
  });
}

// Exportar para formato de Notas do iPhone (arquivo de texto)
export const exportToAppleNotes = (briefingData: BriefingData) => {
  try {
    let text = `# Briefing de Projeto Arquitetônico\n\n`;
    text += `Cliente: ${briefingData.full_name}\n`;
    text += `Data: ${formatDate(briefingData.created_at)}\n\n`;
    
    // Dados Básicos
    text += `## DADOS BÁSICOS\n\n`;
    text += `Nome: ${briefingData.full_name}\n`;
    text += `Email: ${briefingData.email}\n`;
    text += `Telefone: ${briefingData.phone}\n`;
    text += `Endereço: ${briefingData.address || "-"}\n`;
    text += `Cidade: ${briefingData.city || "-"}\n\n`;
    
    // Objetivo do Projeto
    text += `## OBJETIVO DO PROJETO\n\n`;
    text += `Motivo do projeto:\n${briefingData.project_reason || "-"}\n\n`;
    text += `Objetivos de transformação:\n${briefingData.transformation_goals || "-"}\n\n`;
    
    // Estilo e Preferências
    text += `## ESTILO E PREFERÊNCIAS\n\n`;
    text += `Estilos: ${Array.isArray(briefingData.styles) ? briefingData.styles.join(", ") : briefingData.styles}\n`;
    text += `Outro estilo: ${briefingData.other_style || "-"}\n`;
    text += `Cores favoritas: ${briefingData.favorite_colors || "-"}\n`;
    text += `Cores que não gosta: ${briefingData.disliked_colors || "-"}\n\n`;
    text += `Referências:\n${briefingData.design_references || "-"}\n\n`;
    
    // Ambientes e Necessidades
    text += `## AMBIENTES E NECESSIDADES\n\n`;
    text += `Ambientes a serem projetados:\n${briefingData.environments || "-"}\n\n`;
    text += `Número de residentes: ${briefingData.residents_count || "-"}\n`;
    text += `Possui animais de estimação: ${briefingData.has_pets ? "Sim" : "Não"}\n`;
    text += `Possui crianças ou idosos: ${briefingData.has_kids_or_elderly ? "Sim" : "Não"}\n`;
    text += `Necessidades de acessibilidade: ${briefingData.has_accessibility_needs ? "Sim" : "Não"}\n\n`;
    text += `Necessidades de home office:\n${briefingData.home_office_needs || "-"}\n\n`;
    
    // Mobiliário
    text += `## MOBILIÁRIO\n\n`;
    text += `Mobiliário existente:\n${briefingData.existing_furniture || "-"}\n\n`;
    text += `Preferência de mobiliário: ${
      briefingData.furniture_preference === "planejados" ? "Móveis Planejados" : 
      briefingData.furniture_preference === "soltos" ? "Móveis Soltos" : 
      briefingData.furniture_preference === "mistos" ? "Mistos" : 
      briefingData.furniture_preference || "-"
    }\n`;
    text += `Marcas preferidas: ${briefingData.preferred_brands || "-"}\n\n`;
    
    // Orçamento e Prazos
    text += `## ORÇAMENTO E PRAZOS\n\n`;
    text += `Orçamento disponível: ${briefingData.budget || "-"}\n`;
    text += `Nível de investimento: ${getInvestmentLevelText(briefingData.investment_level)}\n`;
    text += `Prazo ideal: ${briefingData.ideal_timeframe || "-"}\n`;
    text += `Data limite: ${briefingData.deadline || "-"}\n\n`;
    
    // Observações Adicionais
    if (briefingData.additional_notes) {
      text += `## OBSERVAÇÕES ADICIONAIS\n\n`;
      text += `${briefingData.additional_notes}\n`;
    }
    
    // Criar blob e download
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    saveAs(blob, `Briefing_${briefingData.full_name.replace(/ /g, '_')}.txt`);
    
  } catch (error) {
    console.error('Erro ao exportar para Notas do iPhone:', error);
  }
}; 