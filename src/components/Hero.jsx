import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight } from 'lucide-react';

const Hero = () => {
  const benefits = [
    'Visa Canada',
    'Emploi garanti',
    'Processus encadré',
    'Paiement sécurisé'
  ];

  return (
    <section className="relative min-h-[80vh] flex items-center pt-20 pb-32 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1503614472-8c93d56e92ce?auto=format&fit=crop&q=80&w=2000" 
          alt="Canada Landscape" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-white/30 md:from-white md:via-white/90 md:to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 text-[#1D4ED8] text-sm font-bold mb-6 border border-blue-100">
              <span className="relative flex h-2 w-2 mr-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              Édition 2026 Ouverte
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold text-[#0B1C2D] leading-tight mb-6">
              Votre chance d’obtenir un <span className="text-[#1D4ED8]">Visa Canada</span> et un emploi
            </h1>
            <p className="text-lg text-gray-700 mb-8 max-w-lg font-medium">
              Participez à notre Loto Visa Canada. 5000 participants. Des gagnants sélectionnés pour obtenir un visa et un contrat de travail.
            </p>
            
            <div className="grid grid-cols-2 gap-4 mb-10">
              {benefits.map((benefit) => (
                <div key={benefit} className="flex items-center space-x-2 bg-white/50 backdrop-blur-sm p-2 rounded-lg border border-white/20">
                  <CheckCircle2 className="text-[#10B981] w-5 h-5 flex-shrink-0" />
                  <span className="text-[#111827] font-semibold">{benefit}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => {
                  const target = document.querySelector('#play-now');
                  if (target) target.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-[#1D4ED8] text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-center transform hover:-translate-y-0.5"
              >
                Jouer maintenant
                <ArrowRight className="ml-2 w-5 h-5" />
              </button>
              <button 
                onClick={() => {
                  const target = document.querySelector('#about');
                  if (target) target.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-white/80 backdrop-blur-sm border-2 border-[#1D4ED8] text-[#1D4ED8] px-8 py-4 rounded-full font-bold text-lg hover:bg-blue-50 transition-all text-center transform hover:-translate-y-0.5"
              >
                En savoir plus
              </button>
            </div>
          </motion.div>

          <div className="hidden lg:block">
            {/* Empty space for the background image to show through more on large screens */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
