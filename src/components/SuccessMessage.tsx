import React from 'react';

const SuccessMessage = () => {
  return (
    <div className="bg-architect-light py-16 px-6 rounded-lg text-center max-w-2xl mx-auto">
      <svg className="mx-auto h-16 w-16 text-architect-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
      
      <h2 className="mt-6 text-3xl font-display font-medium text-architect-dark">
        Briefing enviado com sucesso!
      </h2>
      
      <p className="mt-4 text-lg text-architect-dark/80">
        Obrigado por compartilhar informações sobre seu projeto
      </p>
      
      <div className="mt-8 text-architect-dark/70">
        <p>Dannieli Felix entrará em contato com você em breve para discutir os próximos passos.</p>
      </div>
      
      <div className="mt-10">
        <a
          href="/"
          className="inline-flex items-center font-medium text-architect-accent hover:underline"
        >
          <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Voltar para o início
        </a>
      </div>
    </div>
  );
};

export default SuccessMessage;
