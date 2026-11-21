import { andreaSiles } from '../especialistas/services/specialists.service';
import { andreaCampaign } from '../especialistas/andrea-siles-de-la-portilla/campaign';
import AppointmentPage from './components/appointment/AppointmentPage';

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const query = await searchParams;
  const forAndrea = query.doctor === String(andreaSiles.id);
  const fromWhatsApp = forAndrea && Object.entries(andreaCampaign).every(([key, value]) => query[key] === value);

  return (
    <AppointmentPage
      key={forAndrea ? andreaSiles.id : 'general'}
      andreaDoctorId={forAndrea ? andreaSiles.id : undefined}
      fromWhatsApp={fromWhatsApp}
    />
  );
}
