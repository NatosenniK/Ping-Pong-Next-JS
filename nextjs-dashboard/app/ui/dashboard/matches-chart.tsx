import { generateYAxis } from '@/app/lib/utils';
import { CalendarIcon } from '@heroicons/react/24/outline';
import { roboto } from '@/app/ui/fonts';
import { fetchMatches } from '@/app/lib/data';
import { GroupedMatch, MatchesTable } from '@/app/lib/definitions';

export default async function MatchChart() {
  const matches = await fetchMatches();
  const chartHeight = 380;

  // Define the type for matchesByDate
  const matchesByDate = matches.reduce<Record<string, GroupedMatch>>((acc, match) => {
    const date = new Date(match.date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  
    if (!acc[date]) {
      acc[date] = { ...match, totalGames: 1 }; 
    } else {
      acc[date].totalGames += 1;
    }
  
    return acc;
  }, {});
  

  const uniqueDates = Object.keys(matchesByDate);

  const { yAxisLabels, topLabel } = generateYAxis(Object.values(matchesByDate));

  if (!matches || matches.length === 0) {
    return <p className="mt-4 text-gray-400">No data available.</p>;
  }

  return (
    <div className="w-full md:col-span-4">
      <h2 className={`${roboto.className} mb-4 text-xl md:text-2xl dark:text-white`}>
        Matches Played
      </h2>
      <div className="rounded-xl bg-gray-50 p-4 dark:bg-slate-700">
        <div className="sm:grid-cols-8 mt-0 grid grid-cols-8 items-end gap-2 rounded-md bg-white p-4 md:gap-4 dark:bg-slate-700">
          <div
            className="mb-6 hidden flex-col justify-between text-sm text-gray-400 dark:text-white sm:flex"
            style={{ height: `${chartHeight}px` }}
          >
            {yAxisLabels.map((label) => (
              <p key={label}>{label}</p>
            ))}
          </div>
          
          {uniqueDates.map((date, index) => (
            <div key={index} className="flex flex-col items-center gap-2">
              <div
                className="w-full rounded-md bg-blue-300"
                style={{
                  height: `${(chartHeight / topLabel) * matchesByDate[date].totalGames}px`,
                }}
              ></div>
              <p className="-rotate-90 text-sm text-gray-400 dark:text-white sm:rotate-0">
                {date}
              </p>
            </div>
          ))}
        </div>
        <div className="flex items-center pb-2 pt-6">
          <CalendarIcon className="h-5 w-5 text-gray-500 dark:text-white" />
          <h3 className="ml-2 text-sm text-gray-500 dark:text-white">Last 12 months</h3>
        </div>
      </div>
    </div>
  );
}
