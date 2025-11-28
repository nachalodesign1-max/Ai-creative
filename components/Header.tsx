import React from 'react';
import { Cpu } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <nav className="absolute w-full z-50 top-0 left-0 pt-6">
      <div className="max-w-5xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="bg-white/10 p-1.5 rounded-lg">
               <Cpu className="w-5 h-5 text-brand-accent" />
            </div>
            <span className="font-bold text-lg tracking-wider text-white">AI CREATOR</span>
          </div>

          <div className="flex items-center gap-4 sm:gap-8">
              <a href="#curriculum" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Программа</a>
              <a href="#contact" className="text-sm font-medium text-white bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full transition-colors">
                Связаться
              </a>
          </div>
      </div>
    </nav>
  );
};

export default Header;