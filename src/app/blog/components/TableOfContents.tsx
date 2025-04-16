// src/app/blog/components/TableOfContents.tsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { List, ChevronDown, ChevronUp } from 'lucide-react';

interface TOCItem {
  id: string;
  title: string;
  level: number;
}

interface TableOfContentsProps {
  content: string;
  className?: string;
}

const TableOfContents: React.FC<TableOfContentsProps> = ({ content, className = '' }) => {
  const [headings, setHeadings] = useState<TOCItem[]>([]);
  const [isOpen, setIsOpen] = useState(true);
  const [activeId, setActiveId] = useState<string>('');

  // Extraer los encabezados del contenido HTML
  useEffect(() => {
    // Crear un elemento div temporal para contener el HTML
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = content;
    
    // Buscar todos los encabezados h2 y h3
    const h2Elements = tempDiv.querySelectorAll('h2[id]');
    const h3Elements = tempDiv.querySelectorAll('h3[id]');
    
    const headingItems: TOCItem[] = [];
    
    // Procesar los h2
    h2Elements.forEach(el => {
      const id = el.getAttribute('id') || '';
      const title = el.textContent || '';
      if (id && title) {
        headingItems.push({ id, title, level: 2 });
      }
    });
    
    // Procesar los h3
    h3Elements.forEach(el => {
      const id = el.getAttribute('id') || '';
      const title = el.textContent || '';
      if (id && title) {
        headingItems.push({ id, title, level: 3 });
      }
    });
    
    // Ordenar los encabezados según su aparición en el documento
    headingItems.sort((a, b) => {
      const aEl = document.getElementById(a.id);
      const bEl = document.getElementById(b.id);
      
      if (!aEl || !bEl) return 0;
      
      return aEl.compareDocumentPosition(bEl) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1;
    });
    
    setHeadings(headingItems);
  }, [content]);

  // Seguimiento de la posición de desplazamiento para resaltar el encabezado activo
  useEffect(() => {
    const handleScroll = () => {
      const headingElements = headings.map(heading => document.getElementById(heading.id));
      
      // Encontrar el encabezado visible más cercano a la parte superior de la ventana
      const currentHeading = headingElements.reduce((prev, current) => {
        if (!current) return prev;
        
        const rect = current.getBoundingClientRect();
        const topOffset = rect.top + window.scrollY;
        
        if (topOffset < window.scrollY + 100 && (!prev || topOffset > prev.offsetTop)) {
          return { id: current.id, offsetTop: topOffset };
        }
        
        return prev;
      }, { id: '', offsetTop: 0 });
      
      setActiveId(currentHeading.id);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [headings]);

  // Si no hay encabezados, no renderizamos nada
  if (headings.length === 0) {
    return null;
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden ${className}`}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 bg-gray-50 text-gray-800 font-medium"
      >
        <div className="flex items-center">
          <List className="w-5 h-5 mr-2 text-[#46b1b9]" />
          <span>Tabla de contenidos</span>
        </div>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-[#46b1b9]" />
        ) : (
          <ChevronDown className="w-5 h-5 text-[#46b1b9]" />
        )}
      </button>
      
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <nav className="p-4">
              <ul className="space-y-2">
                {headings.map(item => (
                  <li 
                    key={item.id}
                    className={`${item.level === 3 ? 'pl-4' : ''}`}
                  >
                    <a
                      href={`#${item.id}`}
                      className={`block py-1 px-2 rounded text-sm hover:bg-[#46b1b9]/10 transition-colors
                        ${item.id === activeId 
                          ? 'text-[#46b1b9] font-medium bg-[#46b1b9]/10' 
                          : 'text-gray-600'
                        }`}
                      onClick={(e) => {
                        e.preventDefault();
                        document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
                      }}
                    >
                      {item.title}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default TableOfContents;