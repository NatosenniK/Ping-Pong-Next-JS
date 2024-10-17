import Image from 'next/image';
import { fetchPlayerList } from '@/app/lib/data';
import { ViewPlayer } from './buttons';
import { PingPongImage } from '../ping-pong-image';

export default async function PlayersTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const players = await fetchPlayerList(query, currentPage);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0 dark:bg-slate-700">
          <div className="md:hidden">
            {players?.map((player) => (
              <div
                key={player.id}
                className="mb-2 w-full rounded-md bg-white p-4 dark:bg-slate-600 dark:text-white"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div className='w-full'>
                      <div className='flex justify-between'><p className="text-gray-500 dark:text-white pb-2">{player.username}</p><p>Rating: {player.elo}</p></div>
                      {/* <div className='flex justify-between'><p className="text-gray-500 dark:text-white pb-2">{player.loser_username}</p><p>Score: {player.loser_points}</p></div> */}
                  </div>
                  {/* <InvoiceStatus status={match.status} /> */}
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="text-xl font-medium">
                      {/* {formatCurrency(match.amount)} */}
                    </p>
                    {/* <p>{formatDateToLocal(player.date)}</p> */}
                  </div>
                  <div className="flex justify-end gap-2">
                    
                    <ViewPlayer id={player.id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 dark:text-white md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-3 py-5 font-medium">
                  Username
                </th>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Wins 
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Losses
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Points For
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Points Against
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Skill Rating
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">View</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-slate-700">
              {players?.map((player) => (
                <tr
                  key={player.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap px-3 py-3">
                    
                    <div className="flex items-center gap-3">
                      {player.profile_picture_url ? (
                        <PingPongImage
                          imageUrl={player.profile_picture_url}
                          width={40}
                          height={40}
                          className='bg-center rounded-full'
                        />
                        ) : (
                          <div className="h-10 w-10 rounded-full bg-gray-100 dark:bg-slate-600"></div>
                      )}
                      {player.username}
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {player.wins}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {player.losses}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {player.points_for}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {player.points_against}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {player.elo}
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      {/* <UpdateMatch id={match.id} /> */}
                      <ViewPlayer id={player.id} />
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
