import Image from 'next/image';
import { DeleteMatch } from '@/app/ui/invoices/buttons';
import InvoiceStatus from '@/app/ui/invoices/status';
import { formatDateToLocal, formatCurrency } from '@/app/lib/utils';
import { fetchFilteredMatches } from '@/app/lib/data';

export default async function InvoicesTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const matches = await fetchFilteredMatches(query, currentPage);

  console.log(matches)
  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0 dark:bg-slate-700">
          <div className="md:hidden">
            {matches?.map((match) => (
              <div
                key={match.id}
                className="mb-2 w-full rounded-md bg-white p-4 dark:bg-slate-600 dark:text-white"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div className='w-full'>
                      <div className='flex justify-between'><p className="text-gray-500 dark:text-white pb-2">{match.winner_username}</p><p>Score: {match.winner_points}</p></div>
                      <div className='flex justify-between'><p className="text-gray-500 dark:text-white pb-2">{match.loser_username}</p><p>Score: {match.loser_points}</p></div>
                  </div>
                  {/* <InvoiceStatus status={match.status} /> */}
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="text-xl font-medium">
                      {/* {formatCurrency(match.amount)} */}
                    </p>
                    <p>{formatDateToLocal(match.date)}</p>
                  </div>
                  <div className="flex justify-end gap-2">
                    
                    <DeleteMatch id={match.id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 dark:text-white md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-3 py-5 font-medium">
                  Date
                </th>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Winner 
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Winner Points For
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Winner Rank
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Loser
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Loser Points For
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Loser Rank
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-slate-700">
              {matches?.map((match) => (
                <tr
                  key={match.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap px-3 py-3">
                    <div className="flex items-center gap-3">
                      {formatDateToLocal(match.date)}
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {match.winner_username}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {match.winner_points}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {match.winner_elo}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {match.loser_username}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {match.loser_points}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {match.loser_elo}
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      {/* <UpdateMatch id={match.id} /> */}
                      <DeleteMatch id={match.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
