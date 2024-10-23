import Breadcrumbs from '@/app/ui/matches/breadcrumbs';
import { fetchPlayerByUsername, fetchPlayersMatchesPages } from '@/app/lib/data';
import { notFound } from 'next/navigation';
import { PingPongImage } from '@/app/ui/ping-pong-image';
import { PlayerProfile } from '@/app/ui/players/player-profile';
import { Suspense } from 'react';
import { MatchesTableSkeleton } from '@/app/ui/skeletons';
import MatchesTable from '@/app/ui/matches/matches-table';
import Pagination from '@/app/ui/pagination';
import { EditProfile } from '@/app/ui/players/buttons';
import { auth } from '@/auth';
 
export default async function Page({ params, searchParams }: { params: { id: string }, searchParams?: {
    query?: string;
    page?: string;
  } }) {
    const session = await auth()
    const username = decodeURIComponent(params.id);
    
    const [player] = await Promise.all([
        fetchPlayerByUsername(username),
    ]);
    if (!player) {
        notFound();
    }

    const editProfile = session?.user?.email === player.email

    const query = searchParams?.query || '';
    const currentPage = Number(searchParams?.page) || 1;
    const totalPages = await fetchPlayersMatchesPages(player.id);

    const handleClick = () => {
        console.log('Click received')
    };
    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                { label: 'Players', href: '/dashboard/players' },
                {
                    label: `${player.username}`,
                    href: `/dashboard/players/${player.username}/view`,
                    active: true,
                },
                ]}
                button={editProfile ? <EditProfile playerToEdit={player} /> : ''}
            />
            
            <PlayerProfile player={player} />
            <div>
                <h2 className="ml-2 mb-2 dark:text-white text-xl">Match History</h2>
            </div>
            <Suspense key={query + currentPage} fallback={<MatchesTableSkeleton />}>
                <MatchesTable query={player.username} currentPage={currentPage} />
            </Suspense>
            <div className="mt-5 flex w-full justify-center">
                <Pagination totalPages={totalPages} />
            </div>
        </main>
    );
}