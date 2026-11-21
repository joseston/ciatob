import type { Metadata } from 'next';
import Image from 'next/image';
import { Activity, ArrowUpRight, GraduationCap, MapPin, MessageCircle } from 'lucide-react';
import { andreaSiles } from '../services/specialists.service';
import { andreaReceptionUrl } from './campaign';
import BookingLink from './BookingLink';

const site = 'https://clinicaobesidadperu.com';
const url = `${site}${andreaSiles.profilePath}`;
const title = 'Dra. Andrea Siles | Endocrinóloga en Lima';
const description = 'Conoce a la Dra. Andrea Siles de la Portella, endocrinóloga en CIATOB con formación en el Hospital Rebagliati. Consulta sus horarios en Lima.';

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: url },
  robots: { index: false, follow: false },
  openGraph: {
    title,
    description,
    url,
    type: 'website',
    siteName: 'CIATOB',
    locale: 'es_PE',
    images: [{
      url: `${site}/andrea-siles-open-graph.jpg`,
      type: 'image/jpeg',
      width: 1200,
      height: 630,
      alt: 'Dra. Andrea Siles de la Portella, endocrinóloga de CIATOB',
    }],
  },
};

export default function AndreaSilesProfile() {
  return (
    <article className="bg-white text-[#02283b]">
      <section className="bg-[#edf7f7]">
        <div className="mx-auto grid max-w-6xl items-center gap-7 px-5 py-8 sm:px-8 md:grid-cols-[1.25fr_1fr] md:gap-12 md:py-16">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#22616a]">Endocrinología · CIATOB</p>
            <h1 className="max-w-xl text-3xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Dra. Andrea Siles de la Portella
            </h1>
            <p className="mt-3 text-sm font-semibold text-[#22616a]">CMP 085239 · RNE 049083</p>
            <p className="mt-4 max-w-lg leading-relaxed text-slate-700 sm:text-lg">
              Endocrinóloga formada en el Hospital Nacional Edgardo Rebagliati Martins, con especial interés en obesidad, metabolismo y enfermedades de la tiroides.
            </p>
            <div className="mt-6">
              <BookingLink trackView />
            </div>
          </div>
          <Image
            src={andreaSiles.image}
            alt="Dra. Andrea Siles de la Portella"
            width={1122}
            height={1402}
            sizes="(max-width: 767px) 100vw, 420px"
            priority
            unoptimized
            className="mx-auto aspect-[5/4] w-full max-w-[420px] rounded-2xl object-cover object-[center_28%] md:aspect-[4/5]"
          />
        </div>
      </section>

      <div className="mx-auto max-w-6xl space-y-12 px-5 py-10 sm:px-8 md:py-14">
        <section className="grid gap-5 md:grid-cols-2" aria-label="Áreas de atención y trayectoria">
          <div className="rounded-2xl border border-[#cfe4e5] p-6">
            <Activity className="mb-3 size-6 text-[#22616a]" aria-hidden="true" />
            <h2 className="text-xl font-bold">¿En qué puede ayudarte?</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 leading-relaxed text-slate-700 marker:text-[#22616a]">
              <li>Evaluación de obesidad y control de peso</li>
              <li>Alteraciones metabólicas y del colesterol</li>
              <li>Enfermedades de la tiroides y salud hormonal</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-[#cfe4e5] p-6">
            <GraduationCap className="mb-3 size-6 text-[#22616a]" aria-hidden="true" />
            <h2 className="text-xl font-bold">Formación y trayectoria</h2>
            <p className="mt-3 leading-relaxed text-slate-700">
              Especialista en Endocrinología por la Universidad Nacional Federico Villarreal. Hizo su residentado en el Hospital Rebagliati y rotaciones en obesidad y metabolismo de lípidos en el Instituto Nacional de Ciencias Médicas y Nutrición Salvador Zubirán, en México.
            </p>
          </div>
        </section>

        {!!andreaSiles.reviews?.length && (
          <section>
            <h2 className="text-xl font-bold">Opiniones de pacientes</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              {andreaSiles.reviews.slice(0, 3).map((review) => (
                <figure key={review.id} className="rounded-2xl border border-[#cfe4e5] p-5">
                  <blockquote className="text-slate-700">{review.content}</blockquote>
                  <figcaption className="mt-3 text-sm font-semibold">
                    {review.patientInfo} · {review.rating}/5
                  </figcaption>
                </figure>
              ))}
            </div>
          </section>
        )}

        <section className="rounded-2xl bg-[#edf7f7] p-6 sm:p-8">
          <h2 className="text-2xl font-bold">Agenda tu consulta en CIATOB</h2>
          <p className="mt-3 flex items-start gap-2 text-slate-700">
            <MapPin className="mt-0.5 size-5 shrink-0 text-[#22616a]" aria-hidden="true" />
            Av. Alejandro Velasco Astete 1952, Lima
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-4">
            <BookingLink />
            <a href={andreaReceptionUrl} className="inline-flex min-h-12 items-center gap-2 font-semibold text-[#22616a] underline underline-offset-4">
              <MessageCircle className="size-5" aria-hidden="true" />
              Consultar con recepción
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </a>
          </div>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-bold">Preguntas frecuentes</h2>
          <details className="border-b border-[#cfe4e5] py-4">
            <summary className="cursor-pointer font-semibold">¿Cómo reservo con la Dra. Andrea?</summary>
            <p className="mt-2 leading-relaxed text-slate-700">Abre sus horarios, elige un día y completa tus datos para confirmar la cita.</p>
          </details>
          <details className="border-b border-[#cfe4e5] py-4">
            <summary className="cursor-pointer font-semibold">¿Qué debo llevar a la primera consulta?</summary>
            <p className="mt-2 leading-relaxed text-slate-700">Si ya tienes análisis recientes, informes o una lista de los medicamentos que usas, puedes llevarlos a la consulta.</p>
          </details>
        </section>
      </div>
    </article>
  );
}
