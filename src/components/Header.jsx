import React, { useState } from 'react';
import { Menu, X, ChevronRight } from 'lucide-react';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Accueil', href: '#' },
    { name: 'À propos', href: '#about' },
    { name: 'Comment ça marche', href: '#how-it-works' },
    { name: 'Témoignages', href: '#testimonials' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0 flex items-center">
            <span className="text-2xl font-bold text-[#0B1C2D]">Loto Visa Canada</span>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 items-center">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-[#111827] hover:text-[#1D4ED8] font-medium transition-colors"
              >
                {link.name}
              </a>
            ))}
            <button className="bg-[#1D4ED8] text-white px-6 py-2.5 rounded-full font-bold hover:bg-blue-700 transition-all flex items-center">
              Jouer maintenant
              <ChevronRight className="ml-1 w-4 h-4" />
            </button>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-[#111827] p-2"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 pb-4">
          <div className="px-2 pt-2 space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="block px-3 py-2 text-base font-medium text-[#111827] hover:text-[#1D4ED8] hover:bg-gray-50 rounded-md"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <div className="px-3 pt-4">
              <button className="w-full bg-[#1D4ED8] text-white px-6 py-3 rounded-full font-bold hover:bg-blue-700 transition-all text-center">
                Jouer maintenant
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
