
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-architect-dark text-white py-12">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-display text-xl mb-0.5">Dafe</h3>
            <p className="text-white/70 mb-4">Arquitetura e Interiores</p>
            <p className="text-white/70">Transformando espaços em experiências <br /> únicas e funcionais.</p>
          </div>
          
          <div>
            <h3 className="font-medium text-lg mb-4">Contato</h3>
            <p className="text-white/70 mb-2"> dannieli@dafearquitetura.com.br</p>
            <p className="text-white/70 mb-2">(11) 98926-5957</p>
            <p className="text-white/70">Santo andré, SP</p>
          </div>
          
          <div>
            <h3 className="font-medium text-lg mb-4">Siga-nos</h3>
            <div className="flex space-x-4">
              <a href="https://www.instagram.com/arq.dannielifelix/" className="text-white hover:text-architect-accent transition-colors">
                Instagram
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-white/10 text-center text-white/50 text-sm">
          <p>&copy; {new Date().getFullYear()} Dannieli Felix. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
