import React from 'react';
import { ArrowRight, MessageCircle } from 'lucide-react';

const Hero: React.FC = () => {
  const scrollToCurriculum = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.getElementById('curriculum');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center pt-20 overflow-hidden bg-brand-dark">
      {/* Subtle Background Glows */}
      <div className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none">
        <div className="absolute top-[10%] left-[50%] -translate-x-1/2 w-[500px] h-[500px] bg-brand-primary/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[10%] left-[20%] w-[300px] h-[300px] bg-brand-accent/10 rounded-full blur-[100px]"></div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Avatar / Profile Placeholder */}
        <div className="mb-8 inline-block relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-brand-accent to-brand-primary rounded-full blur opacity-50 group-hover:opacity-75 transition-opacity"></div>
            <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-brand-surface border-4 border-brand-dark flex items-center justify-center overflow-hidden">
                <span className="text-5xl">👩‍💻</span>
            </div>
        </div>

        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6">
          Персональные<br/>AI Консультации
        </h1>
        
        <p className="text-lg md:text-xl text-gray-400 mb-10 leading-relaxed font-light">
           Привет! Я помогаю креаторам и бизнесу внедрять нейросети.
           <br className="hidden sm:block" /> 
           Разберем генерацию <span className="text-brand-accent font-medium">Фото</span> и <span className="text-brand-primary font-medium">Видео</span> за две практические сессии.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="https://t.me/annypov" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto flex items-center justify-center gap-2 bg-brand-primary text-white px-8 py-3.5 rounded-full font-medium hover:bg-indigo-500 transition-all shadow-lg shadow-brand-primary/25">
            <MessageCircle className="w-5 h-5" />
            Написать мне
          </a>
          <a 
            href="#curriculum" 
            onClick={scrollToCurriculum}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-brand-surface text-gray-200 border border-white/10 px-8 py-3.5 rounded-full font-medium hover:bg-white/5 transition-all"
          >
            Смотреть программу <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;