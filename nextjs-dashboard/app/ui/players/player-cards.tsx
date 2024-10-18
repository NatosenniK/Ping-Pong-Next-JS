import {
    ClockIcon,
    UserGroupIcon,
    ArrowTrendingUpIcon,
    PresentationChartBarIcon,
  } from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';
import { fetchCardData } from '@/app/lib/data';
import { PlayerStandingsTable } from '@/app/lib/definitions';
import { PingPongImage } from '../ping-pong-image';

interface PlayerCardWrapperProps {
    player: PlayerStandingsTable
}
const iconMap = {
    players: UserGroupIcon,
    totalPointsScored: PresentationChartBarIcon,
    skillRating: ArrowTrendingUpIcon,
};
  
export default async function PlayerCardWrapper({player}: PlayerCardWrapperProps) {

    return (
        <>
            <div className='flex justify-center lg:block'>
                {player.profile_picture_url ? (
                    <PingPongImage 
                        imageUrl={player.profile_picture_url} 
                        width={200} 
                        height={200}
                        className='bg-center rounded-full'
                    />
                    ) : (
                        <div className="h-64 w-64 rounded-full bg-gray-100 dark:bg-slate-600"></div>
                )}
            </div>
            <PlayerCards title="Username" value={player.username} type="players" />
            <PlayerCards title="Record" value={`${player.wins} - ${player.losses}`} type="totalPointsScored" />
            <PlayerCards title="Skill Rating" value={player.elo} type="skillRating" />
        </>
    );
}
  
export function PlayerCards({
    title,
    value,
    type,
  }: {
    title: string;
    value: number | string;
    type: 'skillRating' | 'totalPointsScored' | 'players';
  }) {
    const Icon = iconMap[type];
  
    return (
      <div className="rounded-xl bg-gray-50 p-2 shadow-sm dark:bg-slate-700">
        <div className="flex p-4">
          {Icon ? <Icon className="h-5 w-5 text-gray-700 dark:text-white" /> : null}
          <h3 className="ml-2 text-sm font-medium dark:text-white">{title}</h3>
        </div>
        <p
          className={`${lusitana.className}
            truncate rounded-xl bg-white dark:bg-slate-700 px-4 py-8 text-center text-2xl dark:text-white`}
        >
          {value}
        </p>
      </div>
    );
  }
  