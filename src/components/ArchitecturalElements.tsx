import React from 'react';

interface ArchitecturalElementsProps {
  variant?: 'top-right' | 'bottom-left' | 'full';
  className?: string;
}

const ArchitecturalElements: React.FC<ArchitecturalElementsProps> = ({ 
  variant = 'full',
  className = ''
}) => {
  // Elemento decorativo de canto superior direito (linhas arquitetônicas minimalistas)
  if (variant === 'top-right') {
    return (
      <div className={`absolute top-0 right-0 pointer-events-none ${className}`}>
        <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <line x1="120" y1="40" x2="80" y2="40" stroke="#4B5842" strokeWidth="1" strokeOpacity="0.3" />
          <line x1="120" y1="60" x2="60" y2="60" stroke="#4B5842" strokeWidth="1" strokeOpacity="0.3" />
          <line x1="80" y1="0" x2="80" y2="40" stroke="#4B5842" strokeWidth="1" strokeOpacity="0.3" />
          <line x1="60" y1="0" x2="60" y2="60" stroke="#4B5842" strokeWidth="1" strokeOpacity="0.3" />
          <circle cx="80" cy="40" r="3" fill="#4B5842" fillOpacity="0.2" />
          <circle cx="60" cy="60" r="3" fill="#4B5842" fillOpacity="0.2" />
        </svg>
      </div>
    );
  }
  
  // Elemento decorativo de canto inferior esquerdo (planta baixa estilizada)
  if (variant === 'bottom-left') {
    return (
      <div className={`absolute bottom-0 left-0 pointer-events-none ${className}`}>
        <svg width="150" height="100" viewBox="0 0 150 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="10" y="30" width="60" height="60" stroke="#4B5842" strokeWidth="1" strokeOpacity="0.3" strokeDasharray="2 2" />
          <rect x="30" y="10" width="20" height="20" stroke="#4B5842" strokeWidth="1" strokeOpacity="0.3" />
          <line x1="70" y1="60" x2="100" y2="60" stroke="#4B5842" strokeWidth="1" strokeOpacity="0.3" />
          <line x1="40" y1="90" x2="40" y2="120" stroke="#4B5842" strokeWidth="1" strokeOpacity="0.3" />
          <circle cx="70" cy="60" r="3" fill="#4B5842" fillOpacity="0.2" />
        </svg>
      </div>
    );
  }
  
  // Componente completo com múltiplos elementos
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {/* Canto superior direito */}
      <div className="absolute top-0 right-0">
        <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <line x1="120" y1="40" x2="80" y2="40" stroke="#4B5842" strokeWidth="1" strokeOpacity="0.2" />
          <line x1="120" y1="60" x2="60" y2="60" stroke="#4B5842" strokeWidth="1" strokeOpacity="0.2" />
          <line x1="80" y1="0" x2="80" y2="40" stroke="#4B5842" strokeWidth="1" strokeOpacity="0.2" />
          <line x1="60" y1="0" x2="60" y2="60" stroke="#4B5842" strokeWidth="1" strokeOpacity="0.2" />
          <circle cx="80" cy="40" r="3" fill="#4B5842" fillOpacity="0.15" />
          <circle cx="60" cy="60" r="3" fill="#4B5842" fillOpacity="0.15" />
        </svg>
      </div>
      
      {/* Canto inferior esquerdo */}
      <div className="absolute bottom-0 left-0">
        <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="10" y="30" width="40" height="40" stroke="#4B5842" strokeWidth="1" strokeOpacity="0.2" strokeDasharray="2 2" />
          <rect x="30" y="10" width="20" height="20" stroke="#4B5842" strokeWidth="1" strokeOpacity="0.2" />
          <line x1="50" y1="50" x2="80" y2="50" stroke="#4B5842" strokeWidth="1" strokeOpacity="0.2" />
          <line x1="40" y1="70" x2="40" y2="100" stroke="#4B5842" strokeWidth="1" strokeOpacity="0.2" />
          <circle cx="50" cy="50" r="2" fill="#4B5842" fillOpacity="0.15" />
        </svg>
      </div>
    </div>
  );
};

export default ArchitecturalElements; 