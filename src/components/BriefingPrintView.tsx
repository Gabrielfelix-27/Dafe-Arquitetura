import React from 'react';
import { BriefingData } from '../lib/export-utils';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface BriefingPrintViewProps {
  briefing: BriefingData;
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

// Estilos inline para garantir renderização para exportação
const styles = {
  container: {
    padding: '40px',
    maxWidth: '100%',
    margin: '0 auto',
    backgroundColor: '#fff',
    fontFamily: 'Arial, sans-serif',
    color: '#333',
  },
  header: {
    textAlign: 'center' as const,
    marginBottom: '32px',
  },
  heading1: {
    fontSize: '28px',
    fontWeight: 'bold',
    marginBottom: '8px',
    color: '#111',
  },
  heading2: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '16px',
    paddingBottom: '8px',
    borderBottom: '1px solid #ddd',
    color: '#333',
  },
  heading3: {
    fontSize: '18px',
    fontWeight: 'bold',
    marginBottom: '8px',
    color: '#444',
  },
  clientName: {
    fontSize: '20px',
    marginBottom: '4px',
  },
  date: {
    fontSize: '14px',
    color: '#666',
  },
  section: {
    marginBottom: '24px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '16px',
  },
  field: {
    marginBottom: '12px',
  },
  label: {
    fontWeight: 'bold',
    marginBottom: '4px',
  },
  value: {
    background: '#f5f5f5',
    padding: '8px',
    borderRadius: '4px',
  },
  longText: {
    whiteSpace: 'pre-wrap' as const,
    background: '#f5f5f5',
    padding: '12px',
    borderRadius: '4px',
    marginTop: '4px',
  },
  footer: {
    marginTop: '40px',
    paddingTop: '16px',
    borderTop: '1px solid #ddd',
    textAlign: 'center' as const,
    fontSize: '14px',
    color: '#666',
  },
};

const BriefingPrintView: React.FC<BriefingPrintViewProps> = ({ briefing }) => {
  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.heading1}>Briefing de Projeto Arquitetônico</h1>
        <p style={styles.clientName}>{briefing.full_name}</p>
        <p style={styles.date}>{formatDate(briefing.created_at)}</p>
      </div>

      <div>
        {/* Dados Básicos */}
        <section style={styles.section}>
          <h2 style={styles.heading2}>DADOS BÁSICOS</h2>
          <div style={styles.grid}>
            <div style={styles.field}>
              <p style={styles.label}>Nome:</p>
              <p>{briefing.full_name}</p>
            </div>
            <div style={styles.field}>
              <p style={styles.label}>Email:</p>
              <p>{briefing.email}</p>
            </div>
            <div style={styles.field}>
              <p style={styles.label}>Telefone:</p>
              <p>{briefing.phone}</p>
            </div>
            <div style={styles.field}>
              <p style={styles.label}>Endereço:</p>
              <p>{briefing.address || "-"}</p>
            </div>
            <div style={styles.field}>
              <p style={styles.label}>Cidade:</p>
              <p>{briefing.city || "-"}</p>
            </div>
          </div>
        </section>

        {/* Objetivo do Projeto */}
        <section style={styles.section}>
          <h2 style={styles.heading2}>OBJETIVO DO PROJETO</h2>
          <div style={styles.field}>
            <p style={styles.label}>Motivo do projeto:</p>
            <p style={styles.longText}>{briefing.project_reason || "-"}</p>
          </div>
          <div style={styles.field}>
            <p style={styles.label}>Objetivos de transformação:</p>
            <p style={styles.longText}>{briefing.transformation_goals || "-"}</p>
          </div>
        </section>

        {/* Estilo e Preferências */}
        <section style={styles.section}>
          <h2 style={styles.heading2}>ESTILO E PREFERÊNCIAS</h2>
          <div style={styles.grid}>
            <div style={styles.field}>
              <p style={styles.label}>Estilos:</p>
              <p>{Array.isArray(briefing.styles) ? briefing.styles.join(", ") : briefing.styles}</p>
            </div>
            {briefing.other_style && (
              <div style={styles.field}>
                <p style={styles.label}>Outro estilo:</p>
                <p>{briefing.other_style}</p>
              </div>
            )}
            <div style={styles.field}>
              <p style={styles.label}>Cores favoritas:</p>
              <p>{briefing.favorite_colors || "-"}</p>
            </div>
            <div style={styles.field}>
              <p style={styles.label}>Cores que não gosta:</p>
              <p>{briefing.disliked_colors || "-"}</p>
            </div>
          </div>
          <div style={styles.field}>
            <p style={styles.label}>Referências:</p>
            <p style={styles.longText}>{briefing.design_references || "-"}</p>
          </div>
        </section>

        {/* Ambientes e Necessidades */}
        <section style={styles.section}>
          <h2 style={styles.heading2}>AMBIENTES E NECESSIDADES</h2>
          <div style={styles.field}>
            <p style={styles.label}>Ambientes a serem projetados:</p>
            <p style={styles.longText}>{briefing.environments || "-"}</p>
          </div>
          <div style={styles.grid}>
            <div style={styles.field}>
              <p style={styles.label}>Número de residentes:</p>
              <p>{briefing.residents_count || "-"}</p>
            </div>
            <div style={styles.field}>
              <p style={styles.label}>Possui animais de estimação:</p>
              <p>{briefing.has_pets ? 'Sim' : 'Não'}</p>
            </div>
            <div style={styles.field}>
              <p style={styles.label}>Possui crianças ou idosos:</p>
              <p>{briefing.has_kids_or_elderly ? 'Sim' : 'Não'}</p>
            </div>
            <div style={styles.field}>
              <p style={styles.label}>Necessidades de acessibilidade:</p>
              <p>{briefing.has_accessibility_needs ? 'Sim' : 'Não'}</p>
            </div>
          </div>
          <div style={styles.field}>
            <p style={styles.label}>Necessidades de home office:</p>
            <p style={styles.longText}>{briefing.home_office_needs || "-"}</p>
          </div>
        </section>

        {/* Mobiliário */}
        <section style={styles.section}>
          <h2 style={styles.heading2}>MOBILIÁRIO</h2>
          <div style={styles.field}>
            <p style={styles.label}>Mobiliário existente:</p>
            <p style={styles.longText}>{briefing.existing_furniture || "-"}</p>
          </div>
          <div style={styles.grid}>
            <div style={styles.field}>
              <p style={styles.label}>Preferência de mobiliário:</p>
              <p>
                {briefing.furniture_preference === 'planejados' && 'Móveis Planejados'}
                {briefing.furniture_preference === 'soltos' && 'Móveis Soltos'}
                {briefing.furniture_preference === 'mistos' && 'Mistos'}
              </p>
            </div>
            <div style={styles.field}>
              <p style={styles.label}>Marcas preferidas:</p>
              <p>{briefing.preferred_brands || "-"}</p>
            </div>
          </div>
        </section>

        {/* Orçamento e Prazos */}
        <section style={styles.section}>
          <h2 style={styles.heading2}>ORÇAMENTO E PRAZOS</h2>
          <div style={styles.grid}>
            <div style={styles.field}>
              <p style={styles.label}>Orçamento disponível:</p>
              <p>{briefing.budget || "-"}</p>
            </div>
            <div style={styles.field}>
              <p style={styles.label}>Nível de investimento:</p>
              <p>{getInvestmentLevelText(briefing.investment_level)}</p>
            </div>
            <div style={styles.field}>
              <p style={styles.label}>Prazo ideal:</p>
              <p>{briefing.ideal_timeframe || "-"}</p>
            </div>
            <div style={styles.field}>
              <p style={styles.label}>Data limite:</p>
              <p>{briefing.deadline || "-"}</p>
            </div>
          </div>
        </section>

        {/* Observações Adicionais */}
        {briefing.additional_notes && (
          <section style={styles.section}>
            <h2 style={styles.heading2}>OBSERVAÇÕES ADICIONAIS</h2>
            <p style={styles.longText}>{briefing.additional_notes}</p>
          </section>
        )}
      </div>
      
      <footer style={styles.footer}>
        <p>Dannieli Felix - Arquitetura & Design de Interiores</p>
        <p>Documento gerado em {format(new Date(), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}</p>
      </footer>
    </div>
  );
};

export default BriefingPrintView; 