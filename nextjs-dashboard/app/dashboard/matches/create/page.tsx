import Form from '@/app/ui/matches/create-form';
import Breadcrumbs from '@/app/ui/matches/breadcrumbs';
import { fetchPlayers } from '@/app/lib/data';
import { auth } from '@/auth';
 
export default async function Page() {
  const players = await fetchPlayers();
  const session = await auth()
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
      {!session && 
        <></>
      }
      {session && session.user && 
        <Form players={players} currentUser={session.user}/>
      }
    </main>
  );
}