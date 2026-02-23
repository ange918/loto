import React from 'react';
import { motion } from 'framer-motion';

const Testimonials = () => {
  const testimonials = [
    {
      name: "Jean Kouassi",
      country: "Côte d'Ivoire",
      image: "https://i.pravatar.cc/150?u=jean",
      quote: "Grâce à ce loto, j'ai pu obtenir mon visa en 4 mois. Le contrat de travail m'attendait à Montréal."
    },
    {
      name: "Aminata Sow",
      country: "Sénégal",
      image: "https://i.pravatar.cc/150?u=ami",
      quote: "Une procédure transparente et un soutien incroyable. Je recommande vivement à tous ceux qui veulent immigrer."
    },
    {
      name: "Moussa Diakité",
      country: "Mali",
      image: "https://i.pravatar.cc/150?u=moussa",
      quote: "Le loto a changé ma vie. Je travaille aujourd'hui comme informaticien à Toronto. Merci !"
    }
  ];

  return (
    <section id="testimonials" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-[#0B1C2D] text-center mb-16">Ils ont réussi avec nous</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-50 p-8 rounded-3xl shadow-sm hover:shadow-md transition-all border border-gray-100"
            >
              <div className="flex items-center mb-6">
                <img src={t.image} alt={t.name} className="w-14 h-14 rounded-full mr-4 border-2 border-[#1D4ED8]/20" />
                <div>
                  <h4 className="font-bold text-[#111827]">{t.name}</h4>
                  <p className="text-sm text-[#1D4ED8]">{t.country}</p>
                </div>
              </div>
              <p className="text-gray-600 italic">"{t.quote}"</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
