import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MessageSquare } from 'lucide-react';

const Contact = () => {
  return (
    <section id="contact" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-[#0B1C2D] mb-6">Contactez-nous</h2>
            <p className="text-lg text-gray-600 mb-10">
              Une question ? Notre équipe est là pour vous aider dans vos démarches.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-center space-x-4 p-4 bg-white rounded-2xl shadow-sm border border-gray-100">
                <div className="bg-[#1D4ED8]/10 p-3 rounded-xl">
                  <MessageSquare className="text-[#1D4ED8] w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">WhatsApp</p>
                  <p className="font-bold text-[#111827]">+225 01 23 45 67 89</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 p-4 bg-white rounded-2xl shadow-sm border border-gray-100">
                <div className="bg-[#1D4ED8]/10 p-3 rounded-xl">
                  <Mail className="text-[#1D4ED8] w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">Email</p>
                  <p className="font-bold text-[#111827]">contact@lotovisa.ca</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 p-4 bg-white rounded-2xl shadow-sm border border-gray-100">
                <div className="bg-[#10B981]/10 p-3 rounded-xl">
                  <Phone className="text-[#10B981] w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">Support client</p>
                  <p className="font-bold text-[#111827]">Disponible 24/7</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-gray-100"
          >
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nom complet</label>
                  <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#1D4ED8] focus:border-transparent outline-none transition-all" placeholder="Votre nom" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input type="email" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#1D4ED8] focus:border-transparent outline-none transition-all" placeholder="votre@email.com" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Téléphone</label>
                <input type="tel" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#1D4ED8] focus:border-transparent outline-none transition-all" placeholder="+225..." />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <textarea rows="4" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#1D4ED8] focus:border-transparent outline-none transition-all" placeholder="Comment pouvons-nous vous aider ?"></textarea>
              </div>
              <button type="submit" className="w-full bg-[#1D4ED8] hover:bg-blue-700 text-white py-4 rounded-xl font-bold text-lg transition-all">
                Envoyer le message
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
