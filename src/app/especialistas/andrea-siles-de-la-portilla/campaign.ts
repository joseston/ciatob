export const andreaCampaign = {
  utm_source: 'whatsapp',
  utm_medium: 'chat',
  utm_campaign: 'andrea_siles',
};

export const andreaReceptionUrl = `https://wa.me/51948213270?text=${encodeURIComponent(
  'Hola, quisiera consultar los horarios de la Dra. Andrea Siles de la Portella en CIATOB.'
)}`;

export function trackAndreaEvent(
  event: 'profile_view' | 'booking_click' | 'booking_started' | 'booking_completed',
  fromWhatsApp: boolean
) {
  const analytics = window as Window & { dataLayer?: Record<string, string>[] };
  (analytics.dataLayer ??= []).push({
    event,
    specialist: 'andrea_siles',
    ...Object.fromEntries(
      Object.entries(andreaCampaign).map(([key, value]) => [key, fromWhatsApp ? value : ''])
    ),
  });
}
