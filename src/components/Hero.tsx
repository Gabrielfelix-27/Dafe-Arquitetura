import React from 'react';

const Hero = () => {
  return (
    <div className="bg-architect-brown-light py-12 md:py-20">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-sans font-semibold text-architect-dark leading-tight">
            Transformamos ambientes em experiências memoráveis.
          </h1>
          
          <p className="mt-6 text-lg md:text-xl text-architect-dark/80 leading-relaxed">
            Transforme sua casa em um lugar único, que reflita sua personalidade e estilo de vida.
            Conheça nosso trabalho e descubra qual estilo combina com você.
          </p>
          
          <div className="mt-8 border-b border-architect-beige/70 w-24 mx-auto"></div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
