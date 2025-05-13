
import React from 'react';

interface StyleOptionProps {
  id: string;
  name: string;
  label: string;
  description: string;
  imageSrc: string;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

const StyleOption: React.FC<StyleOptionProps> = ({
  id,
  name,
  label,
  description,
  imageSrc,
  isSelected,
  onSelect,
}) => {
  return (
    <div
      className={`relative rounded-lg overflow-hidden cursor-pointer transition-all ${
        isSelected 
          ? 'ring-4 ring-architect-accent scale-[1.02]'
          : 'hover:shadow-lg hover:scale-[1.01]'
      }`}
      onClick={() => onSelect(id)}
    >
      <input
        type="checkbox"
        id={id}
        name={name}
        className="absolute opacity-0"
        checked={isSelected}
        onChange={() => onSelect(id)}
      />
      <div className="h-48 bg-gray-100 overflow-hidden">
        <img
          src={imageSrc}
          alt={label}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>
      <div className="p-4 bg-white">
        <h3 className="font-medium text-architect-dark text-lg">{label}</h3>
        <p className="text-sm text-architect-dark/70 mt-1">{description}</p>
      </div>
      {isSelected && (
        <div className="absolute top-2 right-2 bg-architect-accent text-white rounded-full p-1 shadow-md">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>
      )}
    </div>
  );
};

export default StyleOption;
