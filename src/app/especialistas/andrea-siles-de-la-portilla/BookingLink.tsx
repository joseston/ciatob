'use client';

import Link from 'next/link';
import { ArrowRight, CalendarDays } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { andreaSiles } from '../services/specialists.service';
import { andreaCampaign, trackAndreaEvent } from './campaign';

export default function BookingLink({ trackView = false }: { trackView?: boolean }) {
  const [fromWhatsApp, setFromWhatsApp] = useState(false);
  const viewTracked = useRef(false);

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const attributed = Object.entries(andreaCampaign).every(([key, value]) => query.get(key) === value);
    setFromWhatsApp(attributed);
    if (trackView && !viewTracked.current) {
      trackAndreaEvent('profile_view', attributed);
      viewTracked.current = true;
    }
  }, [trackView]);

  const query = { doctor: String(andreaSiles.id), ...(fromWhatsApp ? andreaCampaign : {}) };

  return (
    <Link
      href={{ pathname: '/agendar-cita', query }}
      onClick={() => trackAndreaEvent('booking_click', fromWhatsApp)}
      className="inline-flex min-h-12 w-full max-w-sm items-center justify-center gap-2 rounded-xl bg-[#22616a] px-4 py-3 text-center font-semibold text-white transition-colors hover:bg-[#174950] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#22616a] sm:w-fit sm:px-6"
    >
      <CalendarDays className="size-5 shrink-0" aria-hidden="true" />
      Ver horarios con la Dra. Andrea
      <ArrowRight className="size-4 shrink-0" aria-hidden="true" />
    </Link>
  );
}
