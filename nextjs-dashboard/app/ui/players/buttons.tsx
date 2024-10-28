'use client'

import { PencilSquareIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Button } from '../button';
import { useState } from 'react';
import EditProfileSideSheet from '../side-sheet/edit-profile_side-sheet';
import { UserProfileObject } from '@/app/lib/definitions';
import MobileMenuSideSheet from '../header/side-sheet/mobile-menu_side-sheet';
import ThemeSwitch from '../theme-switch';

export function ViewPlayer({ username }: { username: string }) {
  return (
    <Link
      href={`/dashboard/players/${username}/view`}
      className="rounded-md border p-2 hover:bg-gray-100 dark:bg-slate-600 dark:hover:bg-slate-500"
    >
      <UserCircleIcon className="w-5" />
    </Link>
  );
}

export function ViewPlayerMobileButton({ username }: { username: string }) {
  return (
    <Link
      href={`/dashboard/players/${username}/view`}
      className="rounded-md border p-2 hover:bg-gray-100 dark:bg-slate-600 dark:hover:bg-slate-500 flex"
    >
      
      <UserCircleIcon className="w-5 mr-2" />
      <span>View Profile</span>
    </Link>
  );
}

export function EditProfile({playerToEdit}: {playerToEdit: UserProfileObject}) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSideSheet = () => {
    setIsOpen(!isOpen);
  };

  return (
  <>
      <Button
        onClick={toggleSideSheet}
        className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
      >
        <span className="hidden md:block">Edit Profile</span>{' '}
        <PencilSquareIcon className="h-5 md:ml-4" />
      </Button>
      <EditProfileSideSheet isOpen={isOpen} onClose={() => setIsOpen(false)} playerToEdit={playerToEdit} />
  </>
  );
}

export function MobileMenuButton() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSideSheet = () => {
    console.log('click')
    setIsOpen(!isOpen);
  };
  return (
    <>
      <div className='flex items-center'>
          <ThemeSwitch />
          <button data-collapse-toggle="mobile-menu-2" onClick={toggleSideSheet} type="button" className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg xl:hidden hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="mobile-menu-2" aria-expanded="false">
            <span className="sr-only">Open main menu</span>
            <div className='text-white'>
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
            </div>
            <svg className="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
        </button>
      </div>
      <MobileMenuSideSheet isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  )
}