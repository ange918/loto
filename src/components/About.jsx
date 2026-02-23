import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <section id="about" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="order-2 lg:order-1"
          >
            <img 
              src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&q=80&w=800" 
              alt="Professional support" 
              className="rounded-2xl shadow-xl"
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="order-1 lg:order-2"
          >
            <h2 className="text-4xl font-bold text-[#0B1C2D] mb-6">
              Une opportunité d’immigration structurée
            </h2>
            <div className="space-y-6 text-lg text-gray-600">
              <p>
                Notre structure accompagne les talents internationaux vers leur rêve canadien grâce à un processus de sélection transparent et encadré par des experts.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="bg-[#1D4ED8] w-2 h-2 rounded-full mt-2.5 mr-4 flex-shrink-0"></div>
                  <span><strong>Organisation du loto :</strong> Tirage au sort équitable parmi les participants inscrits.</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-[#1D4ED8] w-2 h-2 rounded-full mt-2.5 mr-4 flex-shrink-0"></div>
                  <span><strong>Accompagnement administratif :</strong> Assistance complète pour vos démarches de visa.</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-[#1D4ED8] w-2 h-2 rounded-full mt-2.5 mr-4 flex-shrink-0"></div>
                  <span><strong>Sélection transparente :</strong> Critères clairs et processus audité.</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-[#1D4ED8] w-2 h-2 rounded-full mt-2.5 mr-4 flex-shrink-0"></div>
                  <span><strong>Mise en relation employeurs :</strong> Placement garanti dès votre arrivée.</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
