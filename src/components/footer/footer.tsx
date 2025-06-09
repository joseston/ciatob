'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronDown, 
  MapPin, 
  Mail, 
  Phone,
  Instagram, 
  Facebook, 
  Globe,
  HeartPulse,
  Droplet,
  Leaf,
  Smile,
  Dumbbell as Barbell  
} from 'lucide-react';

const loaderProp = ({ src }: { src: string }) => {
  return src;
};

interface FooterSection {
  title: string;
  icon: React.ElementType;
  links: Array<{
    text: string;
    href: string;
    icon?: React.ElementType;
  }>;
}

const footerSections: FooterSection[] = [
  {
    title: "Explora",
    icon: Globe,
    links: [
      { text: "Inicio", href: "/" },
      { text: "Nosotros", href: "/nosotros" },
      { text: "Especialidades", href: "/especialidades" },
      { text: "Agendar Cita", href: "/citas" }
    ]
  },
  {
    title: "Especialidades",
    icon: HeartPulse,
    links: [
      { text: "Endocrinología", href: "/endocrinologia", icon: Droplet },
      { text: "Nutrición", href: "/nutricion", icon: Leaf },
      { text: "Psicología", href: "/psicologia", icon: Smile },
      { text: "Medicina Deportiva", href: "/medicina-deportiva", icon: Barbell }
    ]
  }
];

const FooterAccordion: React.FC<{
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
}> = ({ title, icon: Icon, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-[#46b1b9]/10 lg:border-none">
      {/* Mobile Version */}
      <div className="lg:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-between w-full py-4 text-left text-gray-800 group"
        >
          <div className="flex items-center space-x-2">
            <Icon className="w-5 h-5 text-[#46b1b9] group-hover:text-[#22616a] transition-colors" />
            <span className="text-lg font-semibold group-hover:text-[#46b1b9] transition-colors">
              {title}
            </span>
          </div>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className="w-5 h-5 text-[#46b1b9]" />
          </motion.div>
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="pb-4">
                {children}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Desktop Version - Always Visible */}
      <div className="hidden lg:block">
        <div className="py-4">
          <div className="flex items-center space-x-2 mb-4">
            <Icon className="w-5 h-5 text-[#46b1b9]" />
            <span className="text-lg font-semibold text-gray-800">
              {title}
            </span>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};
const SocialLink: React.FC<{
  icon: React.ElementType;
  href: string;
  label: string;
}> = ({ icon: Icon, href, label }) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="w-10 h-10 flex items-center justify-center bg-gradient-to-br from-[#46b1b9] to-[#22616a] text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    aria-label={label}
  >
    <Icon size={20} />
  </motion.a>
);

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-b from-white to-gray-50">

      <div className="max-w-7xl mx-auto px-4 pt-16 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Branding Section */}
          <div className="lg:col-span-4">
            <motion.div 
              className="flex flex-col items-center lg:items-start space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Link href="/" className="group">
                <div className="relative flex items-center space-x-3">
                  <Image
                    loader={loaderProp}
                    unoptimized
                    src="https://static.scieluxe.com/files/logociatov.jpg"
                    alt="Scieluxe Logo"
                    width={100}
                    height={100}
                    className="transition-transform group-hover:scale-105"
                    priority
                  />
                  <span className="text-2xl font-bold bg-gradient-to-r from-[#46b1b9] to-[#22616a] text-transparent bg-clip-text">
                    CIATOB
                  </span>
                </div>
              </Link>
              <p className="text-gray-600 text-center lg:text-left">
                Clínica Integral Avanzada de Tratamiento de Obesidades. 
              </p>
              <div className="flex space-x-3">
                <SocialLink
                  icon={Instagram}
                  href="https://www.instagram.com/clinicadeobesidad_ciatob/"
                  label="Instagram"
                />
                <SocialLink
                  icon={Facebook}
                  href="https://www.facebook.com/clinicadeobesidadesciatob"
                  label="Facebook"
                />
              </div>
            </motion.div>
          </div>

          {/* Navigation Sections */}
          <div className="lg:col-span-5">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {footerSections.map((section) => (
                <FooterAccordion 
                  key={section.title} 
                  title={section.title}
                  icon={section.icon}
                >
                  <ul className="space-y-3">
                    {section.links.map((link) => (
                      <motion.li 
                        key={link.text}
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Link
                          href={link.href}
                          className="flex items-center space-x-2 text-gray-600 hover:text-[#46b1b9] transition-colors duration-200"
                        >
                          {link.icon && (
                            <link.icon className="w-4 h-4" />
                          )}
                          <span>{link.text}</span>
                        </Link>
                      </motion.li>
                    ))}
                  </ul>
                </FooterAccordion>
              ))}
            </div>
          </div>

          {/* Contact Section */}
          <div className="lg:col-span-3">
            <FooterAccordion title="Contacto" icon={Mail}>
              <div className="space-y-4">
                <motion.div 
                  className="flex items-start space-x-3 group"
                  whileHover={{ x: 5 }}
                >
                  <MapPin className="w-5 h-5 text-[#46b1b9] mt-1" />
                  <p className="text-gray-600 group-hover:text-[#46b1b9] transition-colors">
                    Av. Alejandro Velasco Astete 1952, <br/>
                    Lima 18, Perú
                  </p>
                </motion.div>
                <motion.div 
                  className="flex items-start space-x-3 group"
                  whileHover={{ x: 5 }}
                >
                  <Mail className="w-5 h-5 text-[#46b1b9] mt-1" />
                  <a 
                    href="mailto:contacto@ciatob.com"
                    className="text-gray-600 group-hover:text-[#46b1b9] transition-colors"
                  >
                    contacto@ciatob.com
                  </a>
                </motion.div>
                <motion.div 
                  className="flex items-start space-x-3 group"
                  whileHover={{ x: 5 }}
                >
                  <Phone className="w-5 h-5 text-[#46b1b9] mt-1" />
                  <a 
                    href="tel:+51948213270"
                    className="text-gray-600 group-hover:text-[#46b1b9] transition-colors"
                  >
                    +51 948213270
                  </a>
                </motion.div>
              </div>
            </FooterAccordion>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-12 pt-6 border-t border-[#46b1b9]/10">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} CIATOB. Todos los derechos reservados.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <Link
                href="/es-pe/privacy"
                className="text-sm text-gray-500 hover:text-[#46b1b9] transition-colors"
              >
                Política de Privacidad
              </Link>
              <Link
                href="/terms"
                className="text-sm text-gray-500 hover:text-[#46b1b9] transition-colors"
              >
                Términos de Servicio
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;