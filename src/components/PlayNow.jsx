import React from 'react';
import { motion } from 'framer-motion';
import { Phone, CreditCard, Smartphone } from 'lucide-react';

const PlayNow = () => {
  return (
    <section id="play" className="py-24 bg-[#0B1C2D] text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold mb-6">Prêt à tenter votre chance ?</h2>
          <p className="text-blue-200 text-lg mb-12">
            Rejoignez les 5000 participants et commencez votre nouvelle vie au Canada.
          </p>

          <div className="bg-white/5 backdrop-blur-sm p-8 md:p-12 rounded-3xl border border-white/10">
            <h3 className="text-2xl font-bold mb-8">Méthodes de paiement acceptées</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
              <div className="bg-white/10 p-6 rounded-2xl text-left border border-white/5">
                <div className="flex items-center mb-4">
                  <span className="text-2xl mr-2">🇨🇮</span>
                  <span className="font-bold">Côte d’Ivoire</span>
                </div>
                <div className="flex items-center space-x-3 text-blue-200">
                  <Smartphone className="w-5 h-5" />
                  <span>Wave</span>
                </div>
              </div>

              <div className="bg-white/10 p-6 rounded-2xl text-left border border-white/5">
                <div className="flex items-center mb-4">
                  <span className="text-2xl mr-2">🇧🇯</span>
                  <span className="font-bold">Bénin</span>
                </div>
                <div className="space-y-2 text-blue-200">
                  <div className="flex items-center space-x-3">
                    <Smartphone className="w-5 h-5" />
                    <span>MTN Moov</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Smartphone className="w-5 h-5" />
                    <span>Celtis</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center space-x-4 mb-8 text-blue-200">
              <CreditCard className="w-6 h-6" />
              <span>Carte bancaire optionnelle</span>
            </div>

            <button className="w-full bg-[#10B981] hover:bg-[#059669] text-white py-5 rounded-full font-bold text-xl transition-all shadow-lg hover:shadow-[#10B981]/20">
              Je participe maintenant (5000 FCFA)
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PlayNow;
