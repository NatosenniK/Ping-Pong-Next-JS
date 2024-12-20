
import Image from 'next/image';
import { fetchPlayerStandings } from '@/app/lib/data';
import { PingPongImage } from '../ping-pong-image';
import Link from 'next/link';

export default async function StandingsTable({
  currentPage,
}: {
  currentPage: number;
}) {
  const playerStandings = await fetchPlayerStandings(currentPage);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0 dark:bg-slate-700">
          <div className="md:hidden">
            {playerStandings?.map((player, index) => (
              <div
                key={index}
                className="mb-2 w-full rounded-md bg-white p-4 dark:bg-slate-600 dark:text-white"
              >
                <div className="flex items-center justify-between">
                  <div className='mr-4'>{index + 1}</div>
                  <div className='w-full'>
                      <div className='flex justify-between items-center'><p className="text-gray-500 dark:text-white pb-2 font-bold">{player.username}</p><p className='text-sm'>Rating: {player.elo}</p></div>
                      <div className='flex justify-between items-center'><p className="text-gray-500 dark:text-white pb-2">Record: </p><p>{player.wins} - {player.losses}</p></div>
                  </div>
         
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 dark:text-white md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-3 py-5 font-medium">
                  Rank
                </th>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Player 
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
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
                  Rating
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-slate-700">
              {playerStandings?.map((player, index) => (
                <tr
                  key={index}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap px-3 py-3">
                    {index + 1}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <div>
                      <Link href={`/dashboard/players/${player.username}/view`} className='flex items-center gap-3'>
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
                      </Link>
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
