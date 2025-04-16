import React from 'react';
import { motion } from 'framer-motion';

interface BlogHeaderProps {
  title: string;
  description?: string;
}

const BlogHeader: React.FC<BlogHeaderProps> = ({ title, description }) => {
  return (
    <div className="text-center mb-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          {title}
        </h1>
        {description && (
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {description}
          </p>
        )}
      </motion.div>
    </div>
  );
};

export default BlogHeader;