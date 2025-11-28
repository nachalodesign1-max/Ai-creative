import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Curriculum from './components/Curriculum';
import PromptGenerator from './components/PromptGenerator';
import Contact from './components/Contact';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-brand-dark text-white selection:bg-brand-accent selection:text-brand-dark">
      <Header />
      <main>
        <Hero />
        <Curriculum />
        <PromptGenerator />
      </main>
      <Contact />
    </div>
  );
};

export default App;