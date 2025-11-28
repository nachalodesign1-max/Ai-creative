import React, { useState } from 'react';
import { Sparkles, Loader2, Copy, Terminal } from 'lucide-react';
import { GenerationType } from '../types';
import { enhancePrompt } from '../services/geminiService';

const PromptGenerator: React.FC = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeType, setActiveType] = useState<GenerationType>(GenerationType.PHOTO);

  const handleEnhance = async () => {
    if (!input.trim()) return;

    setIsLoading(true);
    setResult('');
    
    // Simulate thinking time for UX if API is too fast, but mostly just call API
    const enhancedText = await enhancePrompt(input, activeType);
    
    setResult(enhancedText);
    setIsLoading(false);
  };

  const copyToClipboard = () => {
    if (result) {
      navigator.clipboard.writeText(result);
      // Could add toast notification here
    }
  };

  return (
    <section id="demo" className="py-24 bg-gradient-to-b from-brand-dark to-brand-surface relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-primary/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 bg-white/5 rounded-2xl mb-6 ring-1 ring-white/10 backdrop-blur-md">
            <Sparkles className="w-6 h-6 text-yellow-400 mr-2" />
            <span className="text-white font-medium">Powered by Gemini 2.5 Flash</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">AI Промпт-Ассистент</h2>
          <p className="text-gray-400 text-lg">
            Попробуйте бесплатно прямо сейчас. Напишите простую идею, и наш AI-ассистент превратит её в идеальный промпт.
          </p>
        </div>

        <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl">
          {/* Tabs */}
          <div className="flex space-x-2 mb-6 bg-white/5 p-1 rounded-lg w-fit mx-auto sm:mx-0">
            <button
              onClick={() => setActiveType(GenerationType.PHOTO)}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
                activeType === GenerationType.PHOTO
                  ? 'bg-brand-accent text-black shadow-lg'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Фото
            </button>
            <button
              onClick={() => setActiveType(GenerationType.VIDEO)}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
                activeType === GenerationType.VIDEO
                  ? 'bg-brand-primary text-white shadow-lg'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Видео
            </button>
          </div>

          {/* Input Area */}
          <div className="space-y-4">
            <div>
              <label htmlFor="prompt-input" className="block text-sm font-medium text-gray-300 mb-2">
                Ваша идея (на русском):
              </label>
              <textarea
                id="prompt-input"
                rows={3}
                className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder-gray-500 focus:ring-2 focus:ring-brand-accent focus:border-transparent outline-none transition-all resize-none"
                placeholder={activeType === GenerationType.PHOTO ? "Например: Киберпанк самурай под дождем, неоновый свет..." : "Например: Дрон летит над футуристическим городом, закат..."}
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
            </div>

            <button
              onClick={handleEnhance}
              disabled={isLoading || !input.trim()}
              className={`w-full py-4 rounded-xl font-bold text-white shadow-lg flex items-center justify-center gap-2 transition-all ${
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
                  <Sparkles className="w-5 h-5" />
                  Улучшить Промпт
                </>
              )}
            </button>
          </div>

          {/* Result Area */}
          {(result || isLoading) && (
            <div className="mt-8 pt-8 border-t border-white/10">
               <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2 text-gray-300">
                    <Terminal className="w-5 h-5" />
                    <span className="font-mono text-sm">Output Console</span>
                  </div>
                  {result && (
                    <button 
                      onClick={copyToClipboard}
                      className="text-xs flex items-center gap-1 text-brand-accent hover:underline cursor-pointer"
                    >
                      <Copy className="w-3 h-3" /> Копировать
                    </button>
                  )}
               </div>
               
               <div className="bg-black rounded-lg p-6 font-mono text-sm leading-relaxed border border-white/10 min-h-[150px]">
                  {isLoading ? (
                    <div className="space-y-2 animate-pulse">
                      <div className="h-4 bg-white/10 rounded w-3/4"></div>
                      <div className="h-4 bg-white/10 rounded w-1/2"></div>
                      <div className="h-4 bg-white/10 rounded w-5/6"></div>
                    </div>
                  ) : (
                    <div className="whitespace-pre-wrap text-green-400">
                      {result}
                    </div>
                  )}
               </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PromptGenerator;