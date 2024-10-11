import {
  ClockIcon,
  UserGroupIcon,
  ArrowTrendingUpIcon,
  PresentationChartBarIcon,
} from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';
import { fetchCardData } from '@/app/lib/data';

const iconMap = {
  players: UserGroupIcon,
  totalPointsScored: PresentationChartBarIcon,
  matchesPlayed: ClockIcon,
  topPlayer: ArrowTrendingUpIcon,
};

export default async function CardWrapper() {
  const {
    numberOfPlayers,
    numberOfMatches,
    numberOfPoints,
    topPlayer,
  } = await fetchCardData();
  
  return (
    <>
      <Card title="Players" value={numberOfPlayers} type="players" />
      <Card title="Matches Played" value={numberOfMatches} type="matchesPlayed" />
      <Card title="Top Player" value={topPlayer.username} type="topPlayer" />
      <Card
        title="Total Points Scored"
        value={numberOfPoints}
        type="totalPointsScored"
      />
    </>
  );
}

export function Card({
  title,
  value,
  type,
}: {
  title: string;
  value: number | string;
  type: 'topPlayer' | 'totalPointsScored' | 'matchesPlayed' | 'players';
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
