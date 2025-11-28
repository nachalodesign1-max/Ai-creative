import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Loader2, Copy, Terminal, Command } from 'lucide-react';
import { GenerationType } from '../types';
import { enhancePrompt } from '../services/geminiService';

const PromptGenerator: React.FC = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeType, setActiveType] = useState<GenerationType>(GenerationType.PHOTO);
  const resultRef = useRef<HTMLDivElement>(null);

  const handleEnhance = async () => {
    if (!input.trim()) return;

    setIsLoading(true);
    setResult('');
    
    // Simulate thinking time for UX if API is too fast, but mostly just call API
    const enhancedText = await enhancePrompt(input, activeType);
    
    setResult(enhancedText);
    setIsLoading(false);
  };

  // Auto-scroll to bottom of console when result arrives
  useEffect(() => {
    if (result && resultRef.current) {
      resultRef.current.scrollTop = resultRef.current.scrollHeight;
    }
  }, [result]);

  const copyToClipboard = () => {
    if (result) {
      navigator.clipboard.writeText(result);
    }
  };

  return (
    <section id="demo" className="py-24 bg-gradient-to-b from-brand-dark to-brand-surface relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-primary/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 bg-white/5 rounded-2xl mb-6 ring-1 ring-white/10 backdrop-blur-md">
            <Sparkles className="w-6 h-6 text-yellow-400 mr-2" />
            <span className="text-white font-medium">Powered by Gemini 2.5 Flash</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">AI Промпт-Ассистент</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Попробуйте бесплатно прямо сейчас. Напишите простую идею, и наш AI-ассистент превратит её в идеальный промпт.
          </p>
        </div>

        <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            
            {/* Left Column: Controls */}
            <div className="space-y-6 flex flex-col h-full">
              {/* Tabs */}
              <div className="bg-white/5 p-1 rounded-xl flex w-full">
                <button
                  onClick={() => setActiveType(GenerationType.PHOTO)}
                  className={`flex-1 py-3 rounded-lg text-sm font-medium transition-all ${
                    activeType === GenerationType.PHOTO
                      ? 'bg-brand-accent text-black shadow-lg'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  Фото
                </button>
                <button
                  onClick={() => setActiveType(GenerationType.VIDEO)}
                  className={`flex-1 py-3 rounded-lg text-sm font-medium transition-all ${
                    activeType === GenerationType.VIDEO
                      ? 'bg-brand-primary text-white shadow-lg'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  Видео
                </button>
              </div>

              {/* Input */}
              <div className="flex-grow">
                <label htmlFor="prompt-input" className="block text-sm font-medium text-gray-300 mb-2">
                  Ваша идея (на русском):
                </label>
                <textarea
                  id="prompt-input"
                  className="w-full h-40 lg:h-48 bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder-gray-500 focus:ring-2 focus:ring-brand-accent focus:border-transparent outline-none transition-all resize-none leading-relaxed"
                  placeholder={activeType === GenerationType.PHOTO ? "Например: Киберпанк самурай под дождем, неоновый свет..." : "Например: Дрон летит над футуристическим городом, закат..."}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                />
              </div>

              <button
                onClick={handleEnhance}
                disabled={isLoading || !input.trim()}
                className={`w-full py-4 rounded-xl font-bold text-white shadow-lg flex items-center justify-center gap-2 transition-all group ${
                  isLoading || !input.trim()
                    ? 'bg-gray-700 cursor-not-allowed opacity-50'
                    : 'bg-gradient-to-r from-brand-primary to-brand-accent hover:scale-[1.01] hover:shadow-brand-accent/25'
                }`}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Генерация...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                    Улучшить Промпт
                  </>
                )}
              </button>
            </div>

            {/* Right Column: Console Output */}
            <div className="bg-[#0D1117] rounded-xl border border-white/10 flex flex-col min-h-[350px] overflow-hidden relative">
              {/* Mac-style Window Header */}
              <div className="flex items-center justify-between px-4 py-3 bg-white/5 border-b border-white/5">
                 <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50"></div>
                 </div>
                 <div className="flex items-center gap-2 text-gray-500 text-xs font-mono">
                    <Terminal className="w-3 h-3" />
                    <span>console — bash</span>
                 </div>
                 <div className="w-12"></div> {/* Spacer for center alignment */}
              </div>

              {/* Console Content */}
              <div 
                ref={resultRef}
                className="flex-grow p-6 font-mono text-sm leading-relaxed overflow-y-auto custom-scrollbar"
              >
                 {isLoading ? (
                   <div className="space-y-3 animate-pulse">
                     <div className="flex items-center gap-2 text-gray-500 text-xs mb-4">
                        <Loader2 className="w-3 h-3 animate-spin" />
                        <span>Processing request...</span>
                     </div>
                     <div className="h-4 bg-white/10 rounded w-3/4"></div>
                     <div className="h-4 bg-white/10 rounded w-1/2"></div>
                     <div className="h-4 bg-white/10 rounded w-5/6"></div>
                   </div>
                 ) : result ? (
                   <>
                     <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-2">
                        <span className="text-green-500 text-xs font-bold uppercase tracking-wider">Success</span>
                        <button 
                          onClick={copyToClipboard}
                          className="text-xs flex items-center gap-1.5 text-gray-400 hover:text-brand-accent transition-colors"
                        >
                          <Copy className="w-3 h-3" /> Copy
                        </button>
                     </div>
                     <div className="whitespace-pre-wrap text-gray-300">
                       {result}
                     </div>
                   </>
                 ) : (
                   <div className="h-full flex flex-col items-center justify-center text-gray-700 select-none">
                      <Command className="w-8 h-8 mb-3 opacity-20" />
                      <p className="text-center text-xs uppercase tracking-widest opacity-40">Ожидание ввода...</p>
                   </div>
                 )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromptGenerator;