import Image from 'next/image';
import Breadcrumbs from '@/app/ui/matches/breadcrumbs';
import { fetchPlayerById } from '@/app/lib/data';
import { notFound } from 'next/navigation';
 
export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id
    const [player] = await Promise.all([
        fetchPlayerById(id),
    ]);
    if (!player) {
        notFound();
    }
    return (
        <main>
        <Breadcrumbs
            breadcrumbs={[
            { label: 'Players', href: '/dashboard/players' },
            {
                label: `${player.username}`,
                href: `/dashboard/players/${id}/view`,
                active: true,
            },
            ]}
        />
        {/* <Form invoice={invoice} customers={customers} /> */}
        {player.profile_picture_url ? (
            <Image
                src={player.profile_picture_url}
                className="rounded-full"
                alt={`${player.username}'s profile picture`}
                width={256}
                height={256}
                />
            ) : (
                <div className="h-64 w-64 rounded-full bg-gray-100 dark:bg-slate-600"></div>
        )}
        </main>
    );
}