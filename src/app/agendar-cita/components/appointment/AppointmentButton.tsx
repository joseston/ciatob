// src/components/appointment/AppointmentButton.tsx
import React from 'react';
import { motion } from 'framer-motion';

interface AppointmentButtonProps {
  onContinue: () => void;
  disabled: boolean;
}

const AppointmentButton: React.FC<AppointmentButtonProps> = ({
  onContinue,
  disabled
}) => {
  if (disabled) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="mt-8 flex justify-center"
    >
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onContinue}
        className="px-8 py-4 rounded-lg bg-gradient-to-r from-[#46b1b9] to-[#22616a] text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
      >
        Continuar con la Reserva
      </motion.button>
    </motion.div>
  );
};

export default AppointmentButton;