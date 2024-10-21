'use client'

import { PencilSquareIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Button } from '../button';
import { useState } from 'react';
import EditProfileSideSheet from '../side-sheet/edit-profile_side-sheet';
import { UserProfileObject } from '@/app/lib/definitions';

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