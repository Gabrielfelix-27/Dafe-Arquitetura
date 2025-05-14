import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  className?: string;
  showText?: boolean;
  textColor?: string;
  logoHeight?: string;
  isWhite?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ 
  className, 
  showText = true, 
  textColor = "text-architect-dark",
  logoHeight = "h-12 md:h-16",
  isWhite = false
}) => {
  const [imageSrc, setImageSrc] = useState<string>('/Dafe-Logo.png');
  const [imageError, setImageError] = useState<boolean>(false);

  useEffect(() => {
    // Verificar se a imagem está disponível
    const img = new Image();
    img.onload = () => {
      setImageSrc('/Dafe-Logo.png');
      setImageError(false);
    };
    img.onerror = () => {
      console.error('Não foi possível carregar a imagem do logo');
      // Tente caminhos alternativos
      setImageSrc(window.location.origin + '/Dafe-Logo.png');
      setImageError(true);
    };
    img.src = '/Dafe-Logo.png';
  }, []);

  const whiteFilter = isWhite ? "brightness(0) invert(1)" : "";

  return (
    <Link 
      to="/" 
      className={className || ''}
      aria-label="Ir para a página inicial"
    >
      <div className="cursor-pointer text-center md:text-left flex flex-col items-center md:items-start">
        <div className="relative inline-block overflow-hidden rounded">
          {imageError ? (
            // Fallback para quando a imagem não carregar
            <div className={`${logoHeight} bg-transparent flex items-center justify-center px-3 py-1`}>
              <span className={`${textColor} font-semibold text-lg`}>Dannieli Felix</span>
            </div>
          ) : (
            <img 
              src={imageSrc}
              alt="Dannieli Felix - Arquitetura & Design de Interiores" 
              className={`${logoHeight} w-auto object-contain`}
              style={{ filter: whiteFilter }}
              onError={(e) => {
                console.error('Erro ao carregar o logo com caminho:', imageSrc);
                setImageError(true);
              }}
            />
          )}
        </div>
        
        {showText && (
          <p className={`${textColor}/80 mt-1 text-xs md:text-sm font-medium`}>
            
          </p>
        )}
      </div>
    </Link>
  );
};

export default Logo; 