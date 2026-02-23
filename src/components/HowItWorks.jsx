import React from 'react';
import { motion } from 'framer-motion';
import { UserPlus, CreditCard, Trophy, Plane } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      icon: <UserPlus className="w-8 h-8 text-[#1D4ED8]" />,
      title: "Inscription en ligne",
      description: "Remplissez le formulaire d'inscription avec vos informations personnelles."
    },
    {
      icon: <CreditCard className="w-8 h-8 text-[#1D4ED8]" />,
      title: "Paiement des frais",
      description: "Participation : 5000 FCFA via Wave, MTN, Moov ou carte bancaire."
    },
    {
      icon: <Trophy className="w-8 h-8 text-[#1D4ED8]" />,
      title: "Tirage des gagnants",
      description: "Les gagnants sont sélectionnés de manière aléatoire et transparente."
    },
    {
      icon: <Plane className="w-8 h-8 text-[#1D4ED8]" />,
      title: "Visa + Emploi",
      description: "Accompagnement complet pour le visa et intégration en entreprise."
    }
  ];

  return (
    <section id="how-it-works" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-bold text-[#0B1C2D] mb-16">Comment participer ?</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-8 rounded-2xl bg-gray-50 hover:bg-white hover:shadow-xl transition-all border border-transparent hover:border-gray-100 group"
            >
              <div className="bg-white w-16 h-16 rounded-xl flex items-center justify-center mb-6 shadow-sm group-hover:bg-[#1D4ED8]/10 transition-colors mx-auto">
                {step.icon}
              </div>
              <h3 className="text-xl font-bold text-[#111827] mb-3">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
              {index === 1 && (
                <div className="mt-4 inline-block px-3 py-1 bg-[#10B981]/10 text-[#10B981] rounded-full text-sm font-bold">
                  Participation : 5000
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
