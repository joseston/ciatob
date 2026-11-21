'use client';

import { useState } from 'react';
import { addDays, addMonths, eachDayOfInterval, endOfMonth, format, isBefore, isSameDay, isSameMonth, startOfDay, startOfMonth, subMonths } from 'date-fns';
import { es } from 'date-fns/locale';
import { ArrowRight, CalendarDays, Check, ChevronLeft, ChevronRight, Clock3, HeartPulse, ShieldCheck, Stethoscope, UserRound } from 'lucide-react';

type Specialty = 'endocrinologia' | 'nutricion';
type Doctor = { id: string; name: string; title: string; category: Specialty; initials: string; image: string };
const doctors: Doctor[] = [
  { id: 'helard-manrique', name: 'Helard Andrés Manrique Hurtado', title: 'Dr.', category: 'endocrinologia', initials: 'HM', image: 'https://static.scieluxe.com/files/helard-manrique.png' },
  { id: 'ronald-saavedra', name: 'Ronald Antonio Saavedra Guerra', title: 'Dr.', category: 'endocrinologia', initials: 'RS', image: 'https://static.cidonperu.com/files/cidon/staff/ronald-saavedra.webp' },
  { id: 'magaly-flores', name: 'Magaly Fiorella Flores Fernández', title: 'Dra.', category: 'endocrinologia', initials: 'MF', image: 'https://static.cidonperu.com/files/cidon/staff/magaly-flores.webp' },
  { id: 'maria-quispe', name: 'María Alejandra Quispe Flores', title: 'Dra.', category: 'endocrinologia', initials: 'MQ', image: 'https://static.cidonperu.com/files/cidon/staff/maria-quispe.webp' },
  { id: 'katty-manrique', name: 'Katty Manrique Franco', title: 'Dra.', category: 'endocrinologia', initials: 'KM', image: 'https://static.scieluxe.com/files/katty-manrique.jpg' },
  { id: 'blanca-carranza', name: 'Blanca Rosa Carranza Zavala', title: 'Dra.', category: 'endocrinologia', initials: 'BC', image: 'https://static.cidonperu.com/files/cidon/staff/blanca-carranza.webp' },
  { id: 'guadalupe-ruiz', name: 'Edita Guadalupe Ruiz Huaranga', title: 'Dra.', category: 'endocrinologia', initials: 'ER', image: 'https://static.scieluxe.com/files/guadalupe-ruiz.JPG' },
  { id: 'sonia-perez', name: 'Sonia Helen Pérez Cavero', title: 'Dra.', category: 'endocrinologia', initials: 'SP', image: 'https://static.cidonperu.com/files/cidon/staff/sonia-perez.webp' },
  { id: 'katherine-almeida', name: 'Katherine Almeida', title: 'Lic.', category: 'nutricion', initials: 'KA', image: 'https://static.cidonperu.com/files/cidon/staff/katherine-almeida.webp' },
  { id: 'pamela-zuniga', name: 'Pamela del Rosario Zúñiga Escalante', title: 'Lic.', category: 'nutricion', initials: 'PZ', image: 'https://static.cidonperu.com/files/cidon/staff/pamela-zuniga.webp' },
  { id: 'valeria-vilchez', name: 'Valeria Vílchez Alburquerque', title: 'Lic.', category: 'nutricion', initials: 'VV', image: 'https://static.cidonperu.com/files/cidon/staff/valeria-vilchez.webp' },
  { id: 'rosabel-leon', name: 'Rosabel León Llacma', title: 'Lic.', category: 'nutricion', initials: 'RL', image: 'https://static.cidonperu.com/files/cidon/staff/rosabel-leon.webp' },
];
const labels = { endocrinologia: 'Endocrinología', nutricion: 'Nutrición' };
const times = ['09:00', '09:30', '10:30', '11:00', '15:00', '16:00'];

export default function CidonAgendaPreview() {
  const [specialty, setSpecialty] = useState<Specialty>('endocrinologia');
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [today] = useState(() => startOfDay(new Date()));
  const [month, setMonth] = useState(() => startOfMonth(new Date()));
  const [date, setDate] = useState<Date | null>(null);
  const [time, setTime] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [done, setDone] = useState(false);
  const days = eachDayOfInterval({ start: startOfMonth(month), end: endOfMonth(month) });
  const offset = (days[0].getDay() + 6) % 7;
  const maxDate = addDays(today, 90);
  const card = 'rounded-2xl border border-slate-200/80 bg-white shadow-[0_8px_30px_rgba(15,23,42,0.04)]';

  function chooseSpecialty(value: Specialty) { setSpecialty(value); setDoctor(null); setDate(null); setTime(''); }
  function chooseDoctor(value: Doctor) { setDoctor(value); setDate(null); setTime(''); }

  return (
    <div className="min-h-screen bg-[#f7f8fa] text-[#1d2939]">
      <div className="border-b border-amber-200 bg-amber-50 px-4 py-2 text-center text-xs font-medium text-amber-900">Vista previa de diseño · Especialistas de CIDON y horarios simulados · No se crean citas</div>
      <div className="mx-auto max-w-[1320px] px-4 py-9 sm:px-8 md:py-12">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-5">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-red-50 px-3 py-1.5 text-xs font-semibold text-[#c91426]"><HeartPulse size={14} /> Cuidamos de ti en cada paso</div>
            <h1 className="text-3xl font-bold tracking-tight text-[#182230] sm:text-4xl">Agenda tu consulta</h1>
            <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500 sm:text-base">Elige tu especialista y encuentra el momento ideal para cuidar tu salud.</p>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-500"><ShieldCheck size={18} className="text-[#cf2432]" /> Atención cercana y personalizada</div>
        </div>

        <section className={`${card} mb-5 p-5 sm:p-6`} aria-labelledby="specialty-title">
          <div className="mb-4 flex items-center gap-3"><span className="flex h-8 w-8 items-center justify-center rounded-full bg-red-50 text-sm font-bold text-[#d31424]">1</span><div><h2 id="specialty-title" className="font-bold">Elige una especialidad</h2><p className="text-xs text-slate-500">Comencemos por lo que necesitas</p></div></div>
          <div className="grid gap-3 sm:grid-cols-2">{(Object.keys(labels) as Specialty[]).map((item) => { const Icon = item === 'endocrinologia' ? Stethoscope : HeartPulse; return <button key={item} type="button" onClick={() => chooseSpecialty(item)} aria-pressed={specialty === item} className={`flex items-center gap-3 rounded-xl border p-4 text-left transition ${specialty === item ? 'border-[#e30613] bg-[#fff7f7] ring-1 ring-[#e30613]' : 'border-slate-200 hover:border-red-200 hover:bg-slate-50'}`}><span className={`rounded-lg p-2.5 ${specialty === item ? 'bg-red-100 text-[#d31424]' : 'bg-slate-100 text-slate-500'}`}><Icon size={19} /></span><span className="flex-1"><span className="block text-sm font-bold">{labels[item]}</span><span className="mt-0.5 block text-xs text-slate-500">{item === 'endocrinologia' ? 'Salud hormonal y metabólica' : 'Alimentación y bienestar'}</span></span>{specialty === item && <Check size={17} className="text-[#d31424]" />}</button>; })}</div>
        </section>

        <div className="grid items-start gap-5 lg:grid-cols-[1fr_1fr_0.85fr]">
          <section className={`${card} p-5 sm:p-6`} aria-labelledby="doctor-title">
            <div className="mb-4 flex items-center gap-3"><span className="flex h-8 w-8 items-center justify-center rounded-full bg-red-50 text-sm font-bold text-[#d31424]">2</span><div><h2 id="doctor-title" className="font-bold">Selecciona tu especialista</h2><p className="text-xs text-slate-500">Profesionales de {labels[specialty].toLowerCase()}</p></div></div>
            <div className="max-h-[440px] space-y-2 overflow-y-auto pr-1">{doctors.filter(d => d.category === specialty).map(d => <button key={d.id} type="button" onClick={() => chooseDoctor(d)} aria-pressed={doctor?.id === d.id} className={`flex w-full items-center gap-3 rounded-xl border p-3 text-left transition ${doctor?.id === d.id ? 'border-[#e30613] bg-[#fff7f7]' : 'border-slate-100 hover:border-red-200 hover:bg-slate-50'}`}><span className="relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-red-100 text-xs font-bold text-red-700"><span>{d.initials}</span><img src={d.image} alt="" className="absolute inset-0 h-full w-full object-cover" onError={e => { e.currentTarget.style.display = 'none'; }} /></span><span className="min-w-0 flex-1"><span className="block text-sm font-semibold leading-5">{d.title} {d.name}</span><span className="mt-1 block text-xs text-slate-500">{labels[d.category]}</span></span><span className={`h-4 w-4 shrink-0 rounded-full border ${doctor?.id === d.id ? 'border-[5px] border-[#e30613]' : 'border-slate-300'}`} /></button>)}</div>
          </section>

          <section className={`${card} p-5 sm:p-6`} aria-labelledby="date-title">
            <div className="mb-5 flex items-center gap-3"><span className="flex h-8 w-8 items-center justify-center rounded-full bg-red-50 text-sm font-bold text-[#d31424]">3</span><div><h2 id="date-title" className="font-bold">Elige una fecha</h2><p className="text-xs text-slate-500">{doctor ? 'Selecciona un día de ejemplo' : 'Primero selecciona un especialista'}</p></div></div>
            <div className={!doctor ? 'opacity-40' : ''}>
              <div className="mb-5 flex items-center justify-between"><button type="button" aria-label="Mes anterior" disabled={!doctor || isSameMonth(month, today)} onClick={() => setMonth(subMonths(month, 1))} className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 disabled:opacity-30"><ChevronLeft size={18} /></button><span className="text-sm font-bold capitalize">{format(month, 'MMMM yyyy', { locale: es })}</span><button type="button" aria-label="Mes siguiente" disabled={!doctor || isSameMonth(month, maxDate)} onClick={() => setMonth(addMonths(month, 1))} className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 disabled:opacity-30"><ChevronRight size={18} /></button></div>
              <div className="grid grid-cols-7 text-center text-xs font-semibold text-slate-400">{['L', 'M', 'M', 'J', 'V', 'S', 'D'].map((d, i) => <span key={i} className="py-2">{d}</span>)}</div>
              <div className="grid grid-cols-7 gap-y-1 text-center">{Array.from({ length: offset }, (_, i) => <span key={`empty-${i}`} />)}{days.map(day => { const disabled = !doctor || isBefore(day, today) || day > maxDate || day.getDay() === 0; const selected = date && isSameDay(day, date); return <button key={day.toISOString()} type="button" disabled={disabled} aria-label={format(day, "d 'de' MMMM", { locale: es })} aria-pressed={!!selected} onClick={() => { setDate(day); setTime(''); }} className={`mx-auto flex h-9 w-9 items-center justify-center rounded-full text-sm transition ${selected ? 'bg-[#e30613] font-bold text-white' : 'font-medium text-slate-700 hover:bg-red-50 hover:text-red-700'} disabled:text-slate-300 disabled:hover:bg-transparent`}>{format(day, 'd')}</button>; })}</div>
              <p className="mt-5 flex items-center gap-2 border-t border-slate-100 pt-4 text-xs leading-5 text-slate-500"><CalendarDays size={16} className="shrink-0 text-red-500" /> Fechas y horarios únicamente ilustrativos.</p>
            </div>
          </section>

          <section className={`${card} p-5 sm:p-6`} aria-labelledby="time-title">
            <div className="mb-5 flex items-center gap-3"><span className="flex h-8 w-8 items-center justify-center rounded-full bg-red-50 text-sm font-bold text-[#d31424]">4</span><div><h2 id="time-title" className="font-bold">Selecciona un horario</h2><p className="text-xs text-slate-500">{date ? format(date, "EEEE d 'de' MMMM", { locale: es }) : 'Elige una fecha para continuar'}</p></div></div>
            {!date ? <div className="flex min-h-[175px] flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50/60 p-5 text-center"><Clock3 size={25} className="mb-3 text-slate-300" /><p className="text-sm font-medium text-slate-500">Tu horario, a tu medida</p><p className="mt-1 text-xs leading-5 text-slate-400">Selecciona una fecha para ver las opciones de ejemplo.</p></div> : <div className="grid grid-cols-2 gap-2">{times.map(t => <button key={t} type="button" aria-pressed={time === t} onClick={() => setTime(t)} className={`rounded-xl border px-3 py-3 text-sm font-semibold transition ${time === t ? 'border-[#e30613] bg-[#e30613] text-white' : 'border-slate-200 text-slate-700 hover:border-red-300 hover:bg-red-50'}`}>{t}</button>)}</div>}
            {doctor && date && time && <div className="mt-5 rounded-xl bg-[#fff7f7] p-4"><p className="mb-2 text-xs font-bold uppercase tracking-wide text-[#c91426]">Tu selección</p><p className="text-sm font-semibold">{doctor.title} {doctor.name}</p><p className="mt-1 text-xs capitalize text-slate-600">{format(date, "EEEE d 'de' MMMM", { locale: es })} · {time}</p></div>}
            <button type="button" disabled={!doctor || !date || !time} onClick={() => setShowForm(true)} className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#e30613] px-4 py-3.5 text-sm font-bold text-white transition hover:bg-[#bf0612] disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400">Continuar <ArrowRight size={16} /></button>
            <p className="mt-3 text-center text-xs leading-5 text-slate-400">La cita se confirma después de que nuestro equipo te contacte.</p>
          </section>
        </div>
      </div>
      {showForm && <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-slate-950/60 p-4" role="dialog" aria-modal="true" aria-labelledby="modal-title"><div className="my-auto w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl sm:p-8">{done ? <div className="py-4 text-center"><div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-50 text-green-600"><Check size={27} /></div><h2 id="modal-title" className="text-xl font-bold">Así se vería la confirmación</h2><p className="mt-2 text-sm leading-6 text-slate-500">Esta es una demostración. No se enviaron tus datos ni se creó una cita.</p><button type="button" onClick={() => { setDone(false); setShowForm(false); }} className="mt-6 rounded-xl bg-[#e30613] px-6 py-3 text-sm font-semibold text-white">Volver a la vista previa</button></div> : <><div className="flex items-start justify-between gap-3"><div><p className="mb-1 text-xs font-semibold uppercase tracking-wide text-red-600">Último paso · demostración</p><h2 id="modal-title" className="text-xl font-bold">Cuéntanos sobre ti</h2><p className="mt-1 text-sm text-slate-500">Completa tus datos para ver el siguiente paso.</p></div><button type="button" onClick={() => setShowForm(false)} aria-label="Cerrar" className="rounded-lg px-2 py-1 text-xl text-slate-400 hover:bg-slate-100">×</button></div><div className="mt-5 rounded-xl bg-red-50 p-4 text-sm"><p className="font-semibold">{doctor?.title} {doctor?.name}</p><p className="mt-1 capitalize text-slate-600">{date && format(date, "EEEE d 'de' MMMM", { locale: es })} · {time}</p></div><form className="mt-5 space-y-4" onSubmit={e => { e.preventDefault(); setDone(true); }}><label className="block text-sm font-semibold">Nombre completo<input required placeholder="Tu nombre y apellidos" className="mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-normal outline-none focus:border-red-400" /></label><label className="block text-sm font-semibold">Correo electrónico<input required type="email" placeholder="tu@correo.com" className="mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-normal outline-none focus:border-red-400" /></label><label className="block text-sm font-semibold">Teléfono<input required type="tel" pattern="[0-9]{9}" placeholder="987654321" className="mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-normal outline-none focus:border-red-400" /></label><p className="text-xs leading-5 text-slate-500">Vista previa: no ingreses datos reales. El envío está desactivado.</p><button type="submit" className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#e30613] py-3.5 text-sm font-bold text-white"><UserRound size={16} /> Ver confirmación de ejemplo</button></form></>}</div></div>}
    </div>
  );
}
