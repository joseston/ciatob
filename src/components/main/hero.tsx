// Hero Section Component
import { motion } from 'framer-motion';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const loaderProp = ({ src }: { src: string }) => {
  return src;
};


export const HeroSection = () => (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#46b1b9]/10 to-transparent py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center lg:text-left"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Tratamiento Integral de la{' '}
              <span className="bg-gradient-to-r from-[#46b1b9] to-[#22616a] text-transparent bg-clip-text">
                Obesidad
              </span>
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Equipo multidisciplinario especializado en transformar vidas a través de tratamientos personalizados y seguimiento continuo.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href="/agendar-cita">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 rounded-lg bg-gradient-to-r from-[#46b1b9] to-[#22616a] text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Agendar Consulta
                </motion.button>
              </Link>
              <Link href="/servicios">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 rounded-lg border-2 border-[#46b1b9] text-[#46b1b9] font-semibold hover:bg-[#46b1b9]/10 transition-all duration-300"
                >
                  Conoce más
                </motion.button>
              </Link>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <Image
              loader={loaderProp}
              unoptimized
              src="https://static.scieluxe.com/files/logociatov.jpg"
              alt="Equipo médico CIATOB"
              width={600}
              height={400}
              className="rounded-2xl shadow-2xl"
              priority
            />
          </motion.div>
        </div>
      </div>
    </section>
  );

export default HeroSection;