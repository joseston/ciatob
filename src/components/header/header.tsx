// src/components/header/header.tsx
'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const loaderProp = ({ src }: { src: string }) => {
  return src;
};

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { name: 'Inicio', href: '/' },
    { name: 'Blog', href: '/blog' },
    { name: 'Especialistas', href: '/especialistas' },
    { name: 'Nosotros', href: '/nosotros' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm">
      <nav className="mx-auto max-w-7xl px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="group">
            <div className="relative flex items-center space-x-3">
              <Image
                loader={loaderProp}
                unoptimized
                src="https://static.scieluxe.com/files/logociatov.jpg"
                alt="CIATOB Logo"
                width={50}
                height={50}
                className="transition-transform group-hover:scale-105"
                priority
              />
              <span className="text-xl font-bold bg-gradient-to-r from-[#46b1b9] to-[#22616a] text-transparent bg-clip-text">
                CIATOB
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-600 hover:text-[#46b1b9] transition-colors duration-200"
              >
                {item.name}
              </Link>
            ))}
            <Link href="/agendar-cita">
              <motion.button 
                className="px-4 py-2 rounded-md bg-gradient-to-r from-[#46b1b9] to-[#22616a] text-white hover:opacity-90 transition-opacity duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Agenda Cita
              </motion.button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-full hover:bg-[#46b1b9]/10 text-[#46b1b9] transition-all duration-200 focus:outline-none"
            aria-label="Toggle menu"
          >
            <motion.div
              animate={{ rotate: isMenuOpen ? 90 : 0 }}
              transition={{ duration: 0.2 }}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </motion.div>
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="md:hidden overflow-hidden border-t border-[#46b1b9]/10"
            >
              <div className="py-4 space-y-4">
                {menuItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block px-4 py-2 text-gray-600 hover:text-[#46b1b9] hover:bg-[#46b1b9]/5 transition-all duration-200"
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="px-4 pt-2">
                  <Link href="/agendar-cita">
                    <button 
                      className="w-full px-4 py-2 rounded-md bg-gradient-to-r from-[#46b1b9] to-[#22616a] text-white hover:opacity-90 transition-opacity duration-200"
                    >
                      Agenda Cita
                    </button>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};

export default Header;