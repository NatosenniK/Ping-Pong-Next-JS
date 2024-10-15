import Form from '@/app/ui/matches/edit-form';
import Breadcrumbs from '@/app/ui/matches/breadcrumbs';
import { fetchPlayers, fetchInvoiceById } from '@/app/lib/data';
import { notFound } from 'next/navigation';
 
export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id
    const [invoice, customers] = await Promise.all([
        fetchInvoiceById(id),
        fetchPlayers(),
    ]);

    if (!invoice) {
        notFound();
    }
    return (
        <main>
        <Breadcrumbs
            breadcrumbs={[
            { label: 'Invoices', href: '/dashboard/invoices' },
            {
                label: 'Edit Invoice',
                href: `/dashboard/invoices/${id}/edit`,
                active: true,
            },
            ]}
        />
        {/* <Form invoice={invoice} customers={customers} /> */}
        </main>
    );
}