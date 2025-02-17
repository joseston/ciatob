// Services Section Component
import { motion } from 'framer-motion';
import { Droplet, Leaf, Smile, Dumbbell, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export const ServicesSection = () => {
    const services = [
      {
        icon: Droplet,
        title: "Endocrinología",
        description: "Evaluación y tratamiento hormonal especializado para el control del peso y trastornos metabólicos.",
      },
      {
        icon: Leaf,
        title: "Nutrición",
        description: "Planes alimenticios personalizados y educación nutricional adaptada a tu estilo de vida.",
      },
      {
        icon: Smile,
        title: "Psicología",
        description: "Apoyo psicológico y terapéutico para desarrollar hábitos saludables y una relación positiva con la alimentación.",
      },
      {
        icon: Dumbbell,
        title: "Medicina Deportiva",
        description: "Prescripción de ejercicio personalizado y seguimiento de la actividad física para optimizar resultados.",
      },
    ];
  
    return (
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Nuestras Especialidades
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Ofrecemos un enfoque integral para el tratamiento de la obesidad, combinando diferentes especialidades médicas para lograr resultados duraderos.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 rounded-xl bg-white shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-[#46b1b9] to-[#22616a] rounded-lg flex items-center justify-center mb-4">
                  <service.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <Link href={`/especialidades/${service.title.toLowerCase()}`}>
                  <button className="flex items-center text-[#46b1b9] hover:text-[#22616a] transition-colors duration-200">
                    Saber más <ChevronRight className="w-4 h-4 ml-1" />
                  </button>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    );
  };

export default ServicesSection;