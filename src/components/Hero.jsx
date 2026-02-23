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
    <section className="relative bg-white pt-20 pb-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-6xl font-extrabold text-[#0B1C2D] leading-tight mb-6">
              Votre chance d’obtenir un <span className="text-[#1D4ED8]">Visa Canada</span> et un emploi
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-lg">
              Participez à notre Loto Visa Canada. 5000 participants. Des gagnants sélectionnés pour obtenir un visa et un contrat de travail.
            </p>
            
            <div className="grid grid-cols-2 gap-4 mb-10">
              {benefits.map((benefit) => (
                <div key={benefit} className="flex items-center space-x-2">
                  <CheckCircle2 className="text-[#10B981] w-5 h-5 flex-shrink-0" />
                  <span className="text-[#111827] font-medium">{benefit}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-[#1D4ED8] text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-center">
                Jouer maintenant
                <ArrowRight className="ml-2 w-5 h-5" />
              </button>
              <button className="border-2 border-[#1D4ED8] text-[#1D4ED8] px-8 py-4 rounded-full font-bold text-lg hover:bg-blue-50 transition-all text-center">
                En savoir plus
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1503614472-8c93d56e92ce?auto=format&fit=crop&q=80&w=800" 
                alt="Canada Skyline" 
                className="w-full h-auto"
              />
            </div>
            {/* Abstract decorative elements */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#1D4ED8]/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-[#10B981]/10 rounded-full blur-3xl"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
