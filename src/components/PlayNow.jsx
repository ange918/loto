import React from 'react';
import { motion } from 'framer-motion';
import { Phone, ArrowRight, ShieldCheck } from 'lucide-react';

const PlayNow = () => {
  const paymentMethods = [
    {
      id: 'mtn',
      name: 'MTN Mobile Money',
      color: 'bg-[#FFCC00]',
      textColor: 'text-black',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/MTN_Logo.svg/800px-MTN_Logo.svg.png'
    },
    {
      id: 'moov',
      name: 'Moov Money',
      color: 'bg-[#005DA4]',
      textColor: 'text-white',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Moov_Africa_Logo.svg/1200px-Moov_Africa_Logo.svg.png'
    },
    {
      id: 'wave',
      name: 'Wave',
      color: 'bg-[#1DA1F2]',
      textColor: 'text-white',
      logo: 'https://www.wave.com/static/wave-logo-fb-046603a15291b241b712c98d8955b206.png'
    }
  ];

  return (
    <section id="play-now" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-[#0B1C2D] mb-4">
            Prêt à tenter votre <span className="text-[#1D4ED8]">chance</span> ?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choisissez votre moyen de paiement préféré pour valider votre participation au tirage Loto Visa Canada.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {paymentMethods.map((method) => (
            <motion.div
              key={method.id}
              whileHover={{ y: -10 }}
              className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 flex flex-col"
            >
              <div className={`h-32 ${method.color} flex items-center justify-center p-6`}>
                <img 
                  src={method.logo} 
                  alt={method.name} 
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              <div className="p-8 flex-grow flex flex-col">
                <h3 className="text-xl font-bold text-[#0B1C2D] mb-4">{method.name}</h3>
                <p className="text-gray-600 mb-6 flex-grow">
                  Paiement instantané et sécurisé via votre compte {method.name}.
                </p>
                <button className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${method.color} ${method.textColor} hover:opacity-90 shadow-lg`}>
                  Payer avec {method.id.toUpperCase()}
                  <ArrowRight size={20} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 bg-[#0B1C2D] rounded-3xl p-8 md:p-12 text-white relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-4 text-blue-400">
                <ShieldCheck size={24} />
                <span className="font-bold uppercase tracking-wider text-sm">Transactions Sécurisées</span>
              </div>
              <h3 className="text-3xl font-bold mb-4">Besoin d'assistance ?</h3>
              <p className="text-gray-400 text-lg">
                Notre équipe est disponible 24/7 pour vous accompagner dans votre processus d'inscription.
              </p>
            </div>
            <div className="flex gap-4">
              <a href="tel:+22900000000" className="bg-white text-[#0B1C2D] px-8 py-4 rounded-full font-bold flex items-center gap-2 hover:bg-gray-100 transition-all">
                <Phone size={20} />
                Nous appeler
              </a>
            </div>
          </div>
          {/* Decorative circles */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-900/20 rounded-full -ml-32 -mb-32 blur-3xl"></div>
        </div>
      </div>
    </section>
  );
};

export default PlayNow;