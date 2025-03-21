// src/app/agendar-cita/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/header/header';
import { Calendar, Clock, Users, Calendar as CalendarIcon, Search } from 'lucide-react';
import { getDoctorsByCompany, getAvailableSlots } from '@/services/api';
import { format, addDays, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';

interface Doctor {
  id: number;
  nombre: string;
  specialty?: {
    name: string;
  };
}

interface Slot {
  id: number;
  fecha: string;
  hora_inicio: string;
  hora_fin: string;
  duracion: string;
}

interface GroupedSlots {
  [key: string]: Slot[];
}

const AgendarCitaPage = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [dateRange, setDateRange] = useState<{
    startDate: Date;
    endDate: Date;
  }>({
    startDate: new Date(),
    endDate: addDays(new Date(), 14), // Por defecto 2 semanas
  });
  const [groupedSlots, setGroupedSlots] = useState<GroupedSlots>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);

  // Cargar médicos al iniciar
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        // Usamos companyId=1 por defecto para nuestra empresa específica
        const companyId = 1;
        const data = await getDoctorsByCompany(companyId);
        setDoctors(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching doctors:', error);
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  // Cargar slots disponibles cuando se selecciona un médico
  useEffect(() => {
    const fetchSlots = async () => {
      if (!selectedDoctor) return;

      setLoading(true);
      try {
        const startDateStr = format(dateRange.startDate, 'yyyy-MM-dd');
        const endDateStr = format(dateRange.endDate, 'yyyy-MM-dd');
        
        const data = await getAvailableSlots(
          1, // ID de empresa fijo para este ejercicio
          selectedDoctor.id,
          startDateStr,
          endDateStr
        );
        
        // Agrupar slots por fecha
        const grouped = data.slots.reduce((acc: GroupedSlots, slot: Slot) => {
          if (!acc[slot.fecha]) {
            acc[slot.fecha] = [];
          }
          acc[slot.fecha].push(slot);
          return acc;
        }, {});
        
        setGroupedSlots(grouped);
      } catch (error) {
        console.error('Error fetching available slots:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSlots();
  }, [selectedDoctor, dateRange]);

  const handleDoctorSelect = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setSelectedSlot(null);
  };

  const handleDateRangeChange = (type: 'start' | 'end', value: string) => {
    const date = new Date(value);
    setDateRange(prev => ({
      ...prev,
      [type === 'start' ? 'startDate' : 'endDate']: date
    }));
    setSelectedSlot(null);
  };

  const handleSlotSelect = (slot: Slot) => {
    setSelectedSlot(slot);
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      
      <section className="py-10 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Agenda tu{' '}
              <span className="bg-gradient-to-r from-[#46b1b9] to-[#22616a] text-transparent bg-clip-text">
                Consulta
              </span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Selecciona el especialista y la fecha que mejor se adapte a tus necesidades
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {/* Selección de médico */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white p-6 rounded-xl shadow-lg"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Users className="w-5 h-5 mr-2 text-[#46b1b9]" />
                Selecciona un Especialista
              </h2>
              <div className="space-y-3">
                {doctors.map((doctor) => (
                  <motion.button
                    key={doctor.id}
                    onClick={() => handleDoctorSelect(doctor)}
                    className={`w-full p-3 rounded-lg text-left transition-all duration-300 ${
                      selectedDoctor?.id === doctor.id
                        ? 'bg-gradient-to-r from-[#46b1b9]/20 to-[#22616a]/20 border-l-4 border-[#46b1b9]'
                        : 'bg-gray-50 hover:bg-gray-100'
                    }`}
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="font-medium text-gray-900">{doctor.nombre}</div>
                    {doctor.specialty && (
                      <div className="text-sm text-[#46b1b9]">{doctor.specialty.name}</div>
                    )}
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Selección de fechas */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white p-6 rounded-xl shadow-lg"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-[#46b1b9]" />
                Selecciona un Rango de Fechas
              </h2>
              <div className="space-y-4">
                <div>
                  <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
                    Fecha de inicio
                  </label>
                  <input
                    type="date"
                    id="startDate"
                    min={format(new Date(), 'yyyy-MM-dd')}
                    value={format(dateRange.startDate, 'yyyy-MM-dd')}
                    onChange={(e) => handleDateRangeChange('start', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-[#46b1b9] focus:border-[#46b1b9] outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
                    Fecha de fin
                  </label>
                  <input
                    type="date"
                    id="endDate"
                    min={format(dateRange.startDate, 'yyyy-MM-dd')}
                    value={format(dateRange.endDate, 'yyyy-MM-dd')}
                    onChange={(e) => handleDateRangeChange('end', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-[#46b1b9] focus:border-[#46b1b9] outline-none"
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  disabled={!selectedDoctor}
                  className={`w-full mt-4 px-4 py-2 rounded-lg flex items-center justify-center space-x-2 ${
                    selectedDoctor
                      ? 'bg-gradient-to-r from-[#46b1b9] to-[#22616a] text-white'
                      : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <Search className="w-4 h-4" />
                  <span>Buscar Disponibilidad</span>
                </motion.button>
              </div>
            </motion.div>

            {/* Resumen de selección */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white p-6 rounded-xl shadow-lg"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <CalendarIcon className="w-5 h-5 mr-2 text-[#46b1b9]" />
                Resumen de tu Selección
              </h2>

              {selectedDoctor ? (
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-medium text-gray-900">Especialista</h3>
                    <p className="text-[#46b1b9]">{selectedDoctor.nombre}</p>
                    {selectedDoctor.specialty && (
                      <p className="text-sm text-gray-600">{selectedDoctor.specialty.name}</p>
                    )}
                  </div>

                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-medium text-gray-900">Rango de fechas</h3>
                    <p className="text-gray-600">
                      {format(dateRange.startDate, 'dd MMM yyyy', { locale: es })} - {format(dateRange.endDate, 'dd MMM yyyy', { locale: es })}
                    </p>
                  </div>

                  {selectedSlot && (
                    <div className="p-4 bg-[#46b1b9]/10 border border-[#46b1b9]/30 rounded-lg">
                      <h3 className="font-medium text-gray-900">Horario seleccionado</h3>
                      <p className="text-[#22616a] font-medium">
                        {format(parseISO(selectedSlot.fecha), 'EEEE dd MMM yyyy', { locale: es })}
                      </p>
                      <p className="text-[#22616a]">
                        {selectedSlot.hora_inicio} - {selectedSlot.hora_fin}
                      </p>
                      <p className="text-sm text-gray-600">
                        Duración: {selectedSlot.duracion} minutos
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-40 text-center text-gray-500">
                  <CalendarIcon className="w-12 h-12 mb-2 text-gray-300" />
                  <p>Selecciona un especialista para ver la disponibilidad</p>
                </div>
              )}
            </motion.div>
          </div>

          {/* Horarios disponibles */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white p-6 rounded-xl shadow-lg"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <Clock className="w-5 h-5 mr-2 text-[#46b1b9]" />
              Horarios Disponibles
            </h2>

            {loading ? (
              <div className="flex justify-center items-center h-40">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#46b1b9]"></div>
              </div>
            ) : !selectedDoctor ? (
              <div className="text-center py-10 text-gray-500">
                <p>Selecciona un especialista para ver los horarios disponibles</p>
              </div>
            ) : Object.keys(groupedSlots).length === 0 ? (
              <div className="text-center py-10 text-gray-500">
                <p>No hay horarios disponibles en el rango de fechas seleccionado</p>
                <p className="text-sm mt-2">Intenta con un rango de fechas diferente</p>
              </div>
            ) : (
              <div className="space-y-6">
                {Object.entries(groupedSlots).map(([date, daySlots]) => (
                  <div key={date} className="border-b border-gray-200 pb-6 last:border-0">
                    <h3 className="font-medium text-gray-900 mb-3 capitalize">
                      {format(parseISO(date), 'EEEE dd MMMM yyyy', { locale: es })}
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
                      {daySlots.map((slot) => (
                        <motion.button
                          key={slot.id}
                          onClick={() => handleSlotSelect(slot)}
                          className={`p-3 rounded-lg text-center transition-all duration-200 ${
                            selectedSlot?.id === slot.id
                              ? 'bg-gradient-to-r from-[#46b1b9] to-[#22616a] text-white shadow-md'
                              : 'bg-gray-50 hover:bg-[#46b1b9]/10 text-gray-900'
                          }`}
                          whileHover={{ y: -3 }}
                          whileTap={{ scale: 0.97 }}
                        >
                          <p className="font-medium">{slot.hora_inicio}</p>
                          <p className="text-xs opacity-80">{slot.duracion} min</p>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>

          {/* Botón para continuar */}
          {selectedSlot && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-8 flex justify-center"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded-lg bg-gradient-to-r from-[#46b1b9] to-[#22616a] text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Continuar con la Reserva
              </motion.button>
            </motion.div>
          )}
        </div>
      </section>
    </main>
  );
};

export default AgendarCitaPage;