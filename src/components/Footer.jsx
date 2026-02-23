import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#0B1C2D] text-white py-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <span className="text-2xl font-bold mb-6 block">Loto Visa Canada</span>
            <p className="text-blue-200/60 leading-relaxed">
              Votre pont vers une nouvelle carrière et une vie au Canada. Processus sécurisé et transparent.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold mb-6">Liens rapides</h4>
            <ul className="space-y-4 text-blue-200/60">
              <li><a href="#" className="hover:text-white transition-colors">Accueil</a></li>
              <li><a href="#about" className="hover:text-white transition-colors">À propos</a></li>
              <li><a href="#how-it-works" className="hover:text-white transition-colors">Comment ça marche</a></li>
              <li><a href="#play" className="hover:text-white transition-colors">Jouer</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-6">Légal</h4>
            <ul className="space-y-4 text-blue-200/60">
              <li><a href="#" className="hover:text-white transition-colors">Conditions d'utilisation</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Politique de confidentialité</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Mentions légales</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-6">Suivez-nous</h4>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-[#1D4ED8] transition-all">FB</a>
              <a href="#" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-[#1D4ED8] transition-all">TW</a>
              <a href="#" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-[#1D4ED8] transition-all">IG</a>
            </div>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/5 text-center text-blue-200/40 text-sm">
          <p>&copy; {new Date().getFullYear()} Loto Visa Canada. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
