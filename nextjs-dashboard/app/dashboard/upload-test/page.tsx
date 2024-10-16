import Form from '@/app/ui/matches/create-form';
import Breadcrumbs from '@/app/ui/matches/breadcrumbs';
import { fetchPlayers } from '@/app/lib/data';
import { auth } from '@/auth';
import FileUpload from '@/app/ui/file-upload';
 
export default async function Page() {
  const session = await auth()
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Upload Photo', href: '/dashboard/upload-test' },
          {
            label: 'Log Match',
            href: '/dashboard/upload-test',
            active: true,
          },
        ]}
      />
      {!session && 
        <></>
      }
      {session && session.user && 
        <FileUpload currentUser={session.user}/>
      }
    </main>
  );
}