import { ArrowPathIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import Image from 'next/image';
import { roboto } from '@/app/ui/fonts';
import { fetchLatestMatches } from '@/app/lib/data';
import { PingPongImage } from '../ping-pong-image';
export default async function LatestMatches() {

  const latestMatches = await fetchLatestMatches();

  if (!latestMatches || latestMatches.length === 0) {
    return <p className="mt-4 text-gray-400">No data available.</p>;
  }


  return (
    <div className="flex w-full flex-col md:col-span-4">
      <h2 className={`${roboto.className} mb-4 text-xl md:text-2xl dark:text-white`}>
        Latest Matches
      </h2>

      <div className='md:hidden'>
        <div className="flex grow flex-col justify-between rounded-xl bg-gray-50 p-4 dark:bg-slate-700">
          <div className="bg-white px-6 dark:bg-slate-700">
            {latestMatches.map((latestMatch, index) => {
              return (
                <div
                  key={index}
                  className={clsx(
                    ' py-4 ',
                    {
                      'border-t': index !== 0,
                    },
                  )}
                >
                      <div className="text-sm font-semibold md:text-base dark:text-white flex items-center w-40 mb-4">
                        <div className='mr-4 w-4 flex-shrink-0'>W</div>
                        <div>
                          <PingPongImage 
                              imageUrl={latestMatch.winner_profile_picture_url} 
                              width={40} 
                              height={40}
                              className='bg-center rounded-full mr-4'
                          />
                        </div>
                        <div>
                        {latestMatch.winner_username}
                          <span className='px-4'>-</span>
                        {latestMatch.winner_points}
                        </div>
                      </div>
                      <div className="text-sm font-semibold md:text-base dark:text-white flex items-center w-40 mb-4">
                        <div className='mr-4 w-4 flex-shrink-0'>L</div>
                        <div>
                          <PingPongImage 
                              imageUrl={latestMatch.loser_profile_picture_url} 
                              width={40} 
                              height={40}
                              className='bg-center rounded-full mr-4'
                          />
                        </div>
                        <div>
                        {latestMatch.loser_username}
                          <span className='px-4'>-</span>
                        {latestMatch.loser_points}
                        </div>
                      </div>
                </div>
              );
            })}
          </div>
          <div className="flex items-center pb-2 pt-6">
            <ArrowPathIcon className="h-5 w-5 text-gray-500 dark:text-white" />
            <h3 className="ml-2 text-sm text-gray-500 dark:text-white">Updated just now</h3>
          </div>
        </div>
      </div>
      
      <div className='hidden md:block'>
        <div className="flex grow flex-col justify-between rounded-xl bg-gray-50 p-4 dark:bg-slate-700">
          <div className='px-6 dark:text-white text-xl '>
            <div className='flex justify-between border-b py-4'>
              <div>Winner</div>
              <div>Score</div>
              <div>Loser</div>
            </div>
          </div>
          <div className="bg-white px-6 dark:bg-slate-700">
            {latestMatches.map((latestMatch, index) => {
              return (
                <div
                  key={index}
                  className={clsx(
                    'flex flex-row items-center justify-between py-4 ',
                    {
                      'border-t': index !== 0,
                    },
                  )}
                >
                      <div className="truncate text-sm font-semibold md:text-base dark:text-white flex items-center w-44">
                        <PingPongImage 
                            imageUrl={latestMatch.winner_profile_picture_url} 
                            width={40} 
                            height={40}
                            className='bg-center rounded-full mr-4'
                        />
                        {latestMatch.winner_username}
                      </div>
                      <div className='dark:text-white text-center w-20'>
                        {latestMatch.winner_points} - {latestMatch.loser_points}
                      </div>
                      <div className="truncate text-sm font-semibold md:text-base dark:text-white flex items-center w-44 flex justify-end">
                        {latestMatch.loser_username}
                        <PingPongImage 
                            imageUrl={latestMatch.loser_profile_picture_url} 
                            width={40} 
                            height={40}
                            className='bg-center rounded-full ml-4'
                        />
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex items-center pb-2 pt-6">
            <ArrowPathIcon className="h-5 w-5 text-gray-500 dark:text-white" />
            <h3 className="ml-2 text-sm text-gray-500 dark:text-white">Updated just now</h3>
          </div>
        </div>
      </div>
    </div>
  );
}
