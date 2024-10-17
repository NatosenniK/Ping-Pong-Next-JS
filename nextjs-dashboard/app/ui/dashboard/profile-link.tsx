import { PlayerStandingsTable } from "@/app/lib/definitions";
import { UserIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import Link from "next/link";

interface ProfileButtonProps {
    currentUser: PlayerStandingsTable
}

export function ProfileButton(props: ProfileButtonProps) {

    return (
        <>
            {props.currentUser &&
            
            <Link
                key={props.currentUser.id}
                href={`/dashboard/players/${props.currentUser.id}/view`}
                className={clsx(
                    'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3 dark:bg-slate-600 dark:text-white dark:hover:bg-slate-500 dark:hover:text-white',

                )}
                >
                <UserIcon className="w-6" />
                <p className="hidden md:block">Account</p>
            </Link>
            }
        </>
        
      );
}