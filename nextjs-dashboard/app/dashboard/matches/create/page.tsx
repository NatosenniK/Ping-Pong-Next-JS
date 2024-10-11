import Form from '@/app/ui/invoices/create-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchPlayers } from '@/app/lib/data';
 
export default async function Page() {
  const players = await fetchPlayers();
 
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Matches', href: '/dashboard/matches' },
          {
            label: 'Log Match',
            href: '/dashboard/matches/create',
            active: true,
          },
        ]}
      />
      <Form players={players} />
    </main>
  );
}