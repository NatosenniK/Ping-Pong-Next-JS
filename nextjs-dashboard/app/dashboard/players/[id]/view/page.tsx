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
        </main>
    );
}