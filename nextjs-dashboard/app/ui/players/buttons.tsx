import { UserCircleIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export function ViewPlayer({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/players/${id}/view`}
      className="rounded-md border p-2 hover:bg-gray-100 dark:bg-slate-600 dark:hover:bg-slate-500"
    >
      <UserCircleIcon className="w-5" />
    </Link>
  );
}

export function ViewPlayerMobileButton({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/players/${id}/view`}
      className="rounded-md border p-2 hover:bg-gray-100 dark:bg-slate-600 dark:hover:bg-slate-500 flex"
    >
      
      <UserCircleIcon className="w-5 mr-2" />
      <span>View Profile</span>
    </Link>
  );
}
