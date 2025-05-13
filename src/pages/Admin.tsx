import React, { useEffect, useState } from 'react';
import { supabase } from '../integrations/supabase/client';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Button } from '../components/ui/button';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { exportToPDF, exportToDOC, exportToAppleNotes, BriefingData } from '../lib/export-utils';
import BriefingPrintView from '../components/BriefingPrintView';

interface Briefing {
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

const Admin = () => {
  const [briefings, setBriefings] = useState<Briefing[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBriefing, setSelectedBriefing] = useState<Briefing | null>(null);
  const [selectedBriefingId, setSelectedBriefingId] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const [isPrinting, setIsPrinting] = useState(false);

  useEffect(() => {
    // Verificar se o usuário está autenticado
    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        setUser(data.session.user);
        fetchBriefings();
      } else {
        // Redirecionar para a página de login se não estiver autenticado
        window.location.href = '/login';
      }
    };

    checkAuth();
  }, []);

  const fetchBriefings = async () => {
    try {
      const { data, error } = await supabase
        .from('briefings')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      setBriefings(data || []);
    } catch (error) {
      console.error('Erro ao buscar briefings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = '/login';
  };

  const viewBriefingDetails = async (id: string) => {
    if (id === selectedBriefingId) {
      // Fechando os detalhes se já estiver aberto
      setSelectedBriefingId(null);
      setSelectedBriefing(null);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('briefings')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        throw error;
      }

      setSelectedBriefing(data);
      setSelectedBriefingId(id);
    } catch (error) {
      console.error('Erro ao buscar detalhes do briefing:', error);
    }
  };

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

  const handlePrintPDF = async (briefing: BriefingData) => {
    setIsPrinting(true);
    
    // Aguardar a renderização do componente de impressão
    setTimeout(async () => {
      try {
        const printElement = document.getElementById('briefing-print-container');
        if (printElement) {
          // Garantir que o container de impressão esteja visível temporariamente
          printElement.style.display = 'block';
          printElement.style.position = 'fixed';
          printElement.style.top = '-9999px';
          printElement.style.left = '-9999px';
          printElement.style.width = '1100px'; // Largura fixa para A4
          printElement.style.height = 'auto';
          printElement.style.backgroundColor = 'white';
          printElement.style.overflow = 'visible';
          
          // Dar tempo para o DOM renderizar
          await new Promise(resolve => setTimeout(resolve, 300));
          
          await exportToPDF(briefing.id, briefing);
          
          // Restaurar ao estado escondido
          printElement.style.display = 'none';
        } else {
          console.error('Elemento de impressão não encontrado');
        }
      } catch (error) {
        console.error('Erro ao exportar PDF:', error);
      } finally {
        setIsPrinting(false);
      }
    }, 300);
  };

  if (!user) {
    return <div className="min-h-screen flex items-center justify-center">Carregando...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      
      <main className="flex-1 container max-w-7xl mx-auto py-12 px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-display font-medium text-architect-dark">
              Painel Administrativo
            </h2>
            <p className="text-architect-dark/70 mt-1">
              Gerencie os briefings enviados pelos clientes
            </p>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            Sair
          </Button>
        </div>

        {/* Div escondida para impressão */}
        {isPrinting && selectedBriefing && (
          <div 
            id="briefing-print-container" 
            className="print-container"
            style={{
              display: 'none',
              position: 'absolute',
              width: '1100px',
              backgroundColor: 'white',
              zIndex: -1,
              padding: '20px'
            }}
          >
            <BriefingPrintView briefing={selectedBriefing as BriefingData} />
          </div>
        )}

        {loading ? (
          <div className="text-center py-12">
            <p>Carregando briefings...</p>
          </div>
        ) : briefings.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-architect-dark/70">Nenhum briefing encontrado.</p>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="overflow-x-auto border border-architect-beige/30 rounded-lg">
              <table className="min-w-full divide-y divide-architect-beige/30">
                <thead className="bg-architect-light">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-architect-dark/70 uppercase tracking-wider">
                      Data
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-architect-dark/70 uppercase tracking-wider">
                      Nome
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-architect-dark/70 uppercase tracking-wider">
                      Email
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-architect-dark/70 uppercase tracking-wider">
                      Motivo
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-architect-dark/70 uppercase tracking-wider">
                      Ambientes
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-architect-dark/70 uppercase tracking-wider">
                      Investimento
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Ações</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-architect-beige/30">
                  {briefings.map((briefing) => (
                    <tr 
                      key={briefing.id} 
                      className={selectedBriefingId === briefing.id ? "bg-architect-light/50" : "hover:bg-architect-light/20"}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-architect-dark">
                        {format(new Date(briefing.created_at), "dd/MM/yyyy")}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-architect-dark">
                        {briefing.full_name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-architect-dark">
                        {briefing.email}
                      </td>
                      <td className="px-6 py-4 text-sm text-architect-dark max-w-[200px] truncate">
                        {briefing.project_reason}
                      </td>
                      <td className="px-6 py-4 text-sm text-architect-dark max-w-[200px] truncate">
                        {briefing.environments}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-architect-dark">
                        {getInvestmentLevelText(briefing.investment_level)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Button 
                          variant={selectedBriefingId === briefing.id ? "default" : "outline"} 
                          size="sm"
                          onClick={() => viewBriefingDetails(String(briefing.id))}
                        >
                          {selectedBriefingId === briefing.id ? "Fechar" : "Ver detalhes"}
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {selectedBriefing && (
              <div id={`briefing-detail-${selectedBriefing.id}`} className="mt-8 p-6 border border-architect-beige/30 rounded-lg bg-white">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h3 className="text-xl font-display font-medium text-architect-dark">
                      Detalhes do Briefing - {selectedBriefing.full_name}
                    </h3>
                    <p className="text-sm text-architect-dark/70">
                      Enviado em {formatDate(selectedBriefing.created_at)}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handlePrintPDF(selectedBriefing as BriefingData)}
                      className="bg-white hover:bg-gray-50 text-red-600 border-red-200 hover:border-red-300"
                    >
                      Exportar PDF
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => exportToDOC(selectedBriefing as BriefingData)}
                      className="bg-white hover:bg-gray-50 text-blue-600 border-blue-200 hover:border-blue-300"
                    >
                      Exportar DOC
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => exportToAppleNotes(selectedBriefing as BriefingData)}
                      className="bg-white hover:bg-gray-50 text-gray-600 border-gray-200 hover:border-gray-300"
                    >
                      Notas iPhone
                    </Button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-medium text-lg mb-4 text-architect-dark">Dados Básicos</h4>
                    <dl className="space-y-2">
                      <div className="grid grid-cols-3 gap-1">
                        <dt className="text-sm text-architect-dark/70">Nome completo:</dt>
                        <dd className="col-span-2">{selectedBriefing.full_name}</dd>
                      </div>
                      <div className="grid grid-cols-3 gap-1">
                        <dt className="text-sm text-architect-dark/70">Email:</dt>
                        <dd className="col-span-2">{selectedBriefing.email}</dd>
                      </div>
                      <div className="grid grid-cols-3 gap-1">
                        <dt className="text-sm text-architect-dark/70">Telefone:</dt>
                        <dd className="col-span-2">{selectedBriefing.phone}</dd>
                      </div>
                      <div className="grid grid-cols-3 gap-1">
                        <dt className="text-sm text-architect-dark/70">Endereço:</dt>
                        <dd className="col-span-2">{selectedBriefing.address}</dd>
                      </div>
                      <div className="grid grid-cols-3 gap-1">
                        <dt className="text-sm text-architect-dark/70">Cidade:</dt>
                        <dd className="col-span-2">{selectedBriefing.city}</dd>
                      </div>
                    </dl>
                  </div>

                  <div>
                    <h4 className="font-medium text-lg mb-4 text-architect-dark">Objetivo do Projeto</h4>
                    <dl className="space-y-2">
                      <div>
                        <dt className="text-sm text-architect-dark/70 mb-1">Motivo do projeto:</dt>
                        <dd className="p-3 bg-architect-light/30 rounded">{selectedBriefing.project_reason}</dd>
                      </div>
                      <div>
                        <dt className="text-sm text-architect-dark/70 mb-1">Objetivos de transformação:</dt>
                        <dd className="p-3 bg-architect-light/30 rounded">{selectedBriefing.transformation_goals}</dd>
                      </div>
                    </dl>
                  </div>

                  <div>
                    <h4 className="font-medium text-lg mb-4 text-architect-dark">Estilo e Preferências</h4>
                    <dl className="space-y-2">
                      <div className="grid grid-cols-3 gap-1">
                        <dt className="text-sm text-architect-dark/70">Estilos:</dt>
                        <dd className="col-span-2">
                          {Array.isArray(selectedBriefing.styles) 
                            ? selectedBriefing.styles.join(', ') 
                            : selectedBriefing.styles}
                        </dd>
                      </div>
                      {selectedBriefing.other_style && (
                        <div className="grid grid-cols-3 gap-1">
                          <dt className="text-sm text-architect-dark/70">Outro estilo:</dt>
                          <dd className="col-span-2">{selectedBriefing.other_style}</dd>
                        </div>
                      )}
                      <div className="grid grid-cols-3 gap-1">
                        <dt className="text-sm text-architect-dark/70">Cores favoritas:</dt>
                        <dd className="col-span-2">{selectedBriefing.favorite_colors}</dd>
                      </div>
                      <div className="grid grid-cols-3 gap-1">
                        <dt className="text-sm text-architect-dark/70">Cores que não gosta:</dt>
                        <dd className="col-span-2">{selectedBriefing.disliked_colors}</dd>
                      </div>
                      <div>
                        <dt className="text-sm text-architect-dark/70 mb-1">Referências:</dt>
                        <dd className="p-3 bg-architect-light/30 rounded">{selectedBriefing.design_references}</dd>
                      </div>
                    </dl>
                  </div>

                  <div>
                    <h4 className="font-medium text-lg mb-4 text-architect-dark">Ambientes e Necessidades</h4>
                    <dl className="space-y-2">
                      <div>
                        <dt className="text-sm text-architect-dark/70 mb-1">Ambientes a serem projetados:</dt>
                        <dd className="p-3 bg-architect-light/30 rounded">{selectedBriefing.environments}</dd>
                      </div>
                      <div className="grid grid-cols-3 gap-1">
                        <dt className="text-sm text-architect-dark/70">Número de residentes:</dt>
                        <dd className="col-span-2">{selectedBriefing.residents_count}</dd>
                      </div>
                      <div className="grid grid-cols-3 gap-1">
                        <dt className="text-sm text-architect-dark/70">Possui animais:</dt>
                        <dd className="col-span-2">{selectedBriefing.has_pets ? 'Sim' : 'Não'}</dd>
                      </div>
                      <div className="grid grid-cols-3 gap-1">
                        <dt className="text-sm text-architect-dark/70">Possui crianças/idosos:</dt>
                        <dd className="col-span-2">{selectedBriefing.has_kids_or_elderly ? 'Sim' : 'Não'}</dd>
                      </div>
                      <div className="grid grid-cols-3 gap-1">
                        <dt className="text-sm text-architect-dark/70">Necessidades de acessibilidade:</dt>
                        <dd className="col-span-2">{selectedBriefing.has_accessibility_needs ? 'Sim' : 'Não'}</dd>
                      </div>
                      <div>
                        <dt className="text-sm text-architect-dark/70 mb-1">Necessidades de home office:</dt>
                        <dd className="p-3 bg-architect-light/30 rounded">{selectedBriefing.home_office_needs}</dd>
                      </div>
                    </dl>
                  </div>

                  <div>
                    <h4 className="font-medium text-lg mb-4 text-architect-dark">Mobiliário</h4>
                    <dl className="space-y-2">
                      <div>
                        <dt className="text-sm text-architect-dark/70 mb-1">Mobiliário existente:</dt>
                        <dd className="p-3 bg-architect-light/30 rounded">{selectedBriefing.existing_furniture}</dd>
                      </div>
                      <div className="grid grid-cols-3 gap-1">
                        <dt className="text-sm text-architect-dark/70">Preferência de mobiliário:</dt>
                        <dd className="col-span-2">
                          {selectedBriefing.furniture_preference === 'planejados' && 'Móveis Planejados'}
                          {selectedBriefing.furniture_preference === 'soltos' && 'Móveis Soltos'}
                          {selectedBriefing.furniture_preference === 'mistos' && 'Mistos'}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-sm text-architect-dark/70 mb-1">Marcas preferidas:</dt>
                        <dd className="p-3 bg-architect-light/30 rounded">{selectedBriefing.preferred_brands}</dd>
                      </div>
                    </dl>
                  </div>

                  <div>
                    <h4 className="font-medium text-lg mb-4 text-architect-dark">Orçamento e Prazos</h4>
                    <dl className="space-y-2">
                      <div className="grid grid-cols-3 gap-1">
                        <dt className="text-sm text-architect-dark/70">Orçamento disponível:</dt>
                        <dd className="col-span-2">{selectedBriefing.budget}</dd>
                      </div>
                      <div className="grid grid-cols-3 gap-1">
                        <dt className="text-sm text-architect-dark/70">Nível de investimento:</dt>
                        <dd className="col-span-2">{getInvestmentLevelText(selectedBriefing.investment_level)}</dd>
                      </div>
                      <div className="grid grid-cols-3 gap-1">
                        <dt className="text-sm text-architect-dark/70">Prazo ideal:</dt>
                        <dd className="col-span-2">{selectedBriefing.ideal_timeframe}</dd>
                      </div>
                      <div className="grid grid-cols-3 gap-1">
                        <dt className="text-sm text-architect-dark/70">Data limite:</dt>
                        <dd className="col-span-2">{selectedBriefing.deadline}</dd>
                      </div>
                    </dl>
                  </div>

                  {selectedBriefing.additional_notes && (
                    <div className="col-span-1 md:col-span-2">
                      <h4 className="font-medium text-lg mb-4 text-architect-dark">Observações Adicionais</h4>
                      <div className="p-4 bg-architect-light/30 rounded whitespace-pre-line">
                        {selectedBriefing.additional_notes}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Admin; 