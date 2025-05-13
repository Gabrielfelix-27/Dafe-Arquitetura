import React from 'react';
import { Button } from "./ui/button";
import { Link } from 'react-router-dom';
import Logo from './Logo';

const Header = () => {
  return (
    <header className="w-full py-2 md:py-3 px-4 border-b border-architect-beige">
      <div className="container max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2 md:gap-0">
        <Logo className="mb-2 md:mb-0" />
        <div>
          <Link to="/login" className="inline-block">
            <Button 
              size="sm"
              className="bg-architect-green hover:bg-architect-green/90 text-white font-medium px-4 py-1 text-xs md:text-sm shadow-sm"
            >
              Área da Arquiteta
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
