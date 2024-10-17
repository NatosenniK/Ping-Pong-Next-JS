import Link from 'next/link';
import NavLinks from '@/app/ui/dashboard/nav-links';
import { PowerIcon } from '@heroicons/react/24/outline';
import { auth, signOut } from '@/auth';
import PingPongLogo from '../ping-pong-logo';
import { ProfileButton } from './profile-link';
import { fetchPlayerByEmail } from '@/app/lib/data';

export default async function SideNav() {
  const session = await auth()

  if(!session?.user?.email) {
    return
  }
  const userObj = await fetchPlayerByEmail(session.user.email)
  return (
    <div className="dark:bg-slate-700 flex h-full flex-col px-3 py-4 md:px-2">
      <Link
        className="mb-2 flex items-end justify-center rounded-md bg-blue-600 p-4"
        href="/"
      >
        <div className="text-white">
          <PingPongLogo isSideBar={true} />
        </div>
      </Link>
      <div className="dark:bg-slate-700 flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="dark:bg-slate-700 hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
        <div className='flex justify-between'>
          <form
            action={async () => {
              'use server';
              await signOut();
            }}
          >
            <button className="flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3 dark:bg-slate-600 dark:text-white dark:hover:bg-slate-500 dark:hover:text-white">
              <PowerIcon className="w-6" />
              <div className="hidden md:block">Sign Out</div>
            </button>
          </form>
          {userObj &&
            <ProfileButton currentUser={userObj} />
          }
        </div>
        
        
      </div>
    </div>
  );
}
