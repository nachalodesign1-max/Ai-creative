import React from 'react';
import { MessageCircle, ArrowUpRight } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <footer id="contact" className="bg-brand-surface/30 py-20 border-t border-white/5">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        <h2 className="text-3xl font-bold text-white mb-6">Начать обучение</h2>
        <p className="text-gray-400 mb-10 max-w-lg mx-auto leading-relaxed">
          Чтобы записаться на консультацию или задать вопрос, просто напишите мне в Telegram.
        </p>

        <div className="flex justify-center">
          <a 
            href="https://t.me/annypov" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 bg-[#2AABEE]/10 border border-[#2AABEE]/20 rounded-xl hover:bg-[#2AABEE]/20 transition-all cursor-pointer shadow-lg shadow-[#2AABEE]/10"
          >
            <MessageCircle className="w-6 h-6 text-[#2AABEE]" />
            <span className="text-white font-medium text-lg">Написать в Telegram</span>
            <ArrowUpRight className="w-5 h-5 text-gray-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </a>
        </div>
        
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-center items-center gap-6 text-xs text-gray-600">
           <span>&copy; 2024 AI Creator</span>
           <span className="hidden md:block">•</span>
           <a href="#" className="hover:text-gray-400 transition-colors">Политика конфиденциальности</a>
        </div>
      </div>
    </footer>
  );
};

export default Contact;