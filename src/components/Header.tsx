import React from 'react';
import { Button } from "./ui/button";
import { Link } from 'react-router-dom';
import Logo from './Logo';
import { Menu, X, Phone, Instagram } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

const Header = () => {
  return (
    <header className="w-full py-2 md:py-3 px-4 bg-architect-green border-b border-architect-green/30">
      <div className="container max-w-7xl mx-auto flex justify-between items-center">
        <Logo className="mb-0" textColor="text-white" />
        
        {/* Menu para Desktop */}
        <div className="hidden md:flex items-center gap-6">
          <a href="tel:+5511989265957" className="flex items-center gap-2 text-white/90 hover:text-white transition-colors">
            <Phone size={16} />
            <span>(11) 98926-5957</span>
          </a>
          <a href="https://www.instagram.com/arq.dannielifelix/" className="flex items-center gap-2 text-white/90 hover:text-white transition-colors">
            <Instagram size={16} />
            <span>Instagram</span>
          </a>
        </div>
        
        {/* Menu Mobile */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-white">
                <Menu size={24} />
                <span className="sr-only">Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[240px] p-0 bg-architect-green text-white">
              <div className="flex flex-col h-full">
                <div className="p-4 border-b border-white/20">
                  <Logo className="mb-2" showText={false} textColor="text-white" />
                </div>
                <div className="flex-1 p-4">
                  <nav className="flex flex-col gap-4">
                    <a href="tel:+5511989265957" className="flex items-center gap-3 py-2 px-3 rounded-md hover:bg-white/10 transition-colors text-white/90 hover:text-white">
                      <Phone size={18} />
                      <span>(11) 98926-5957</span>
                    </a>
                    <a href="https://www.instagram.com/arq.dannielifelix/" className="flex items-center gap-3 py-2 px-3 rounded-md hover:bg-white/10 transition-colors text-white/90 hover:text-white">
                      <Instagram size={18} />
                      <span>Instagram</span>
                    </a>
                  </nav>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
