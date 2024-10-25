// Loading animation
const shimmer =
  'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent';

export function ThemeSwitcherSkeleton() {
    return (
      <div
        className={`${shimmer} relative overflow-hidden rounded-full bg-gray-100 p-2 shadow-sm dark:bg-slate-700 w-8 h-8`}
      >
      </div>
    );
  }

export function CardSkeleton() {
  return (
    <div
      className={`${shimmer} relative overflow-hidden rounded-xl bg-gray-100 p-2 shadow-sm dark:bg-slate-700`}
    >
      <div className="flex p-4">
        <div className="h-5 w-5 rounded-md bg-gray-200 dark:bg-slate-600" />
        <div className="ml-2 h-6 w-16 rounded-md bg-gray-200 text-sm font-medium dark:bg-slate-600" />
      </div>
      <div className="flex items-center justify-center truncate rounded-xl bg-white px-4 py-8 dark:bg-slate-700">
        <div className="h-7 w-20 rounded-md bg-gray-200 dark:bg-slate-600" />
      </div>
    </div>
  );
}

export function CardsSkeleton() {
  return (
    <>
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
    </>
  );
}

export function MatchChartSkeleton() {
  return (
    <div className={`${shimmer} relative w-full overflow-hidden md:col-span-4`}>
      <div className="mb-4 h-8 w-36 rounded-md bg-gray-100 dark:bg-slate-700" />
      <div className="rounded-xl bg-gray-100 p-4 dark:bg-slate-700">
        <div className="mt-0 grid h-[435px] grid-cols-12 items-end gap-2 rounded-md bg-white p-4 sm:grid-cols-13 md:gap-4 dark:bg-slate-600" />
        <div className="flex items-center pb-2 pt-6">
          <div className="h-5 w-5 rounded-full bg-gray-200 dark:bg-slate-600" />
          <div className="ml-2 h-4 w-20 rounded-md bg-gray-200 dark:bg-slate-600" />
        </div>
      </div>
    </div>
  );
}

export function MatchSkeleton() {
  return (
    <div className="flex flex-row items-center justify-between border-b border-gray-100 py-4 dark:bg-slate-700">
      <div className="flex items-center">
          <div className="mr-2 h-10 w-10 rounded-full bg-gray-200 mr-4 dark:bg-slate-600" />
          <div className="h-5 w-40 rounded-md bg-gray-200 dark:bg-slate-600" />
      </div>
      <div className="flex items-center">
        <div className="h-5 w-20 rounded-md bg-gray-200 dark:bg-slate-600" />
      </div>
      <div className="flex items-center">
          <div className="h-5 w-40 rounded-md bg-gray-200 dark:bg-slate-600" />
          <div className="mr-2 h-10 w-10 rounded-full bg-gray-200 ml-4 dark:bg-slate-600" />
      </div>
    </div>
  );
}

export function LatestMatchesSkeleton() {
  return (
    <div
      className={`${shimmer} relative flex w-full flex-col overflow-hidden md:col-span-4`}
    >
      <div className="mb-4 h-8 w-36 rounded-md bg-gray-100  dark:bg-slate-700" />
      <div className="flex grow flex-col justify-between rounded-xl bg-gray-100 p-4  dark:bg-slate-700">
        <div className="bg-white px-6 dark:bg-slate-700">
          <div className="border-b py-4">
            <div className="flex justify-between ">
              <div className="ml-2 h-8 w-20 rounded-md bg-gray-200 dark:bg-slate-600" />
              <div className="ml-2 h-8 w-20 rounded-md bg-gray-200 dark:bg-slate-600" />
              <div className="ml-2 h-8 w-20 rounded-md bg-gray-200 dark:bg-slate-600" />
            </div>
          </div>
          
          <MatchSkeleton />
          <MatchSkeleton />
          <MatchSkeleton />
          <MatchSkeleton />
          <MatchSkeleton />
        </div>
        <div className="flex items-center pb-2 pt-6">
          <div className="h-5 w-5 rounded-full bg-gray-200 dark:bg-slate-600" />
          <div className="ml-2 h-4 w-20 rounded-md bg-gray-200 dark:bg-slate-600" />
        </div>
      </div>
    </div>
  );
}

export default function DashboardSkeleton() {
  return (
    <>
      <div
        className={`${shimmer} relative mb-4 h-8 w-36 overflow-hidden rounded-md bg-gray-100`}
      />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <MatchChartSkeleton />
        <LatestMatchesSkeleton />
      </div>
    </>
  );
}

export function TableRowSkeleton() {
  return (
    <tr className="w-full border-b border-gray-100 last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg">
      {/* Customer Name and Image */}
      <td className="relative overflow-hidden whitespace-nowrap py-3 pl-6 pr-3">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-gray-100"></div>
          <div className="h-6 w-24 rounded bg-gray-100"></div>
        </div>
      </td>
      {/* Email */}
      <td className="whitespace-nowrap px-3 py-3">
        <div className="h-6 w-32 rounded bg-gray-100"></div>
      </td>
      {/* Amount */}
      <td className="whitespace-nowrap px-3 py-3">
        <div className="h-6 w-16 rounded bg-gray-100"></div>
      </td>
      {/* Date */}
      <td className="whitespace-nowrap px-3 py-3">
        <div className="h-6 w-16 rounded bg-gray-100"></div>
      </td>
      {/* Status */}
      <td className="whitespace-nowrap px-3 py-3">
        <div className="h-6 w-16 rounded bg-gray-100"></div>
      </td>
      {/* Actions */}
      <td className="whitespace-nowrap py-3 pl-6 pr-3">
        <div className="flex justify-end gap-3">
          <div className="h-[38px] w-[38px] rounded bg-gray-100"></div>
          <div className="h-[38px] w-[38px] rounded bg-gray-100"></div>
        </div>
      </td>
    </tr>
  );
}

export function PlayerRowSkeleton() {
  return (
    <tr className="w-full border-b border-gray-100 last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg dark:bg-slate-700">
      {/* Customer Name and Image */}
      <td className="relative overflow-hidden whitespace-nowrap py-3 pl-3 pr-3">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-gray-100 dark:bg-slate-600"></div>
          <div className="h-6 w-32 rounded bg-gray-100 dark:bg-slate-600"></div>
        </div>
      </td>
      {/* Email */}
      <td className="whitespace-nowrap px-3 py-3">
        <div className="h-6 w-16 rounded bg-gray-100 dark:bg-slate-600"></div>
      </td>
      {/* Amount */}
      <td className="whitespace-nowrap px-3 py-3">
        <div className="h-6 w-16 rounded bg-gray-100 dark:bg-slate-600"></div>
      </td>
      {/* Date */}
      <td className="whitespace-nowrap px-3 py-3">
        <div className="h-6 w-16 rounded bg-gray-100 dark:bg-slate-600"></div>
      </td>
      {/* Status */}
      <td className="whitespace-nowrap px-3 py-3">
        <div className="h-6 w-16 rounded bg-gray-100 dark:bg-slate-600"></div>
      </td>
      {/* Skill rating */}
      <td className="whitespace-nowrap px-3 py-3">
        <div className="h-6 w-20 rounded bg-gray-100 dark:bg-slate-600"></div>
      </td>
      {/* Actions */}
      <td className="whitespace-nowrap py-3 pl-6 pr-3">
        <div className="flex justify-end gap-3">
          <div className="h-[38px] w-[38px] rounded bg-gray-100 dark:bg-slate-600"></div>
        </div>
      </td>
    </tr>
  );
}

export function StandingRowSkeleton() {
  return (
    <tr className="w-full border-b border-gray-100 last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg dark:bg-slate-700">
      
      {/* Position */}
      <td className="whitespace-nowrap px-3 py-3">
        <div className="h-6 w-12 rounded bg-gray-100 dark:bg-slate-600"></div>
      </td>
      {/* Player Name and Image */}
      <td className="relative overflow-hidden whitespace-nowrap py-3 pl-3 pr-3">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-gray-100 dark:bg-slate-600"></div>
          <div className="h-6 w-32 rounded bg-gray-100 dark:bg-slate-600"></div>
        </div>
      </td>
      {/* Wins */}
      <td className="whitespace-nowrap px-3 py-3">
        <div className="h-6 w-16 rounded bg-gray-100 dark:bg-slate-600"></div>
      </td>
      {/* Losses */}
      <td className="whitespace-nowrap px-3 py-3">
        <div className="h-6 w-16 rounded bg-gray-100 dark:bg-slate-600"></div>
      </td>
      {/* Points For */}
      <td className="whitespace-nowrap px-3 py-3">
        <div className="h-6 w-16 rounded bg-gray-100 dark:bg-slate-600"></div>
      </td>
      {/* Points Against */}
      <td className="whitespace-nowrap px-3 py-3">
        <div className="h-6 w-16 rounded bg-gray-100 dark:bg-slate-600"></div>
      </td>
      {/* Rating */}
      <td className="whitespace-nowrap px-3 py-3">
        <div className="h-6 w-20 rounded bg-gray-100 dark:bg-slate-600"></div>
      </td>
    </tr>
  );
}

export function MatchRowSkeleton() {
  return (
    <tr className="w-full border-b border-gray-100 last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg dark:bg-slate-700">
      
      {/* Date */}
      <td className="whitespace-nowrap px-3 py-3">
        <div className="h-6 w-20 rounded bg-gray-100 dark:bg-slate-600"></div>
      </td>
      {/* Winner Name */}
      <td className="relative overflow-hidden whitespace-nowrap py-3 pl-3 pr-3">
        <div className="h-6 w-28 rounded bg-gray-100 dark:bg-slate-600"></div>
      </td>
      {/* Winner Points For */}
      <td className="whitespace-nowrap px-3 py-3">
        <div className="h-6 w-8 rounded bg-gray-100 dark:bg-slate-600"></div>
      </td>
      {/* Winner Rank */}
      <td className="whitespace-nowrap px-3 py-3">
        <div className="h-6 w-16 rounded bg-gray-100 dark:bg-slate-600"></div>
      </td>
      {/* Loser */}
      <td className="whitespace-nowrap px-3 py-3">
        <div className="h-6 w-28 rounded bg-gray-100 dark:bg-slate-600"></div>
      </td>
      {/* Loser Points For */}
      <td className="whitespace-nowrap px-3 py-3">
        <div className="h-6 w-8 rounded bg-gray-100 dark:bg-slate-600"></div>
      </td>
      {/* Loser Rank */}
      <td className="whitespace-nowrap px-3 py-3">
        <div className="h-6 w-20 rounded bg-gray-100 dark:bg-slate-600"></div>
      </td>
    </tr>
  );
}


export function GenericMobileSkeleton() {
  return (
    <div className="mb-2 w-full rounded-md bg-white p-4 dark:bg-slate-700">
      <div className="flex items-center justify-between border-b border-gray-100 pb-8">
        <div className="flex items-center">
          <div className="mr-2 h-8 w-8 rounded-full bg-gray-100 dark:bg-slate-600"></div>
          <div className="h-6 w-16 rounded bg-gray-100 dark:bg-slate-600"></div>
        </div>
        <div className="h-6 w-16 rounded bg-gray-100 dark:bg-slate-600"></div>
      </div>
      <div className="flex w-full items-center justify-between pt-4">
        <div>
          <div className="h-6 w-16 rounded bg-gray-100 dark:bg-slate-600"></div>
          <div className="mt-2 h-6 w-24 rounded bg-gray-100 dark:bg-slate-600"></div>
        </div>
        <div className="flex justify-end gap-2">
          <div className="h-10 w-10 rounded bg-gray-100 dark:bg-slate-600"></div>
        </div>
      </div>
    </div>
  );
}

export function StandingsTableSkeleton() {
  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0 dark:bg-slate-700">
          <div className="md:hidden">
            <GenericMobileSkeleton />
            <GenericMobileSkeleton />
            <GenericMobileSkeleton />
            <GenericMobileSkeleton />
            <GenericMobileSkeleton />
            <GenericMobileSkeleton />
          </div>
          <table className="hidden min-w-full text-gray-900 md:table ">
            <thead className="rounded-lg text-left text-sm font-normal dark:text-white">
            <tr>
              <th scope="col" className="px-3 py-5 font-medium">
                  Rank
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Player
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
                  Rating
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              <StandingRowSkeleton />
              <StandingRowSkeleton />
              <StandingRowSkeleton />
              <StandingRowSkeleton />
              <StandingRowSkeleton />
              <StandingRowSkeleton />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export function MatchesTableSkeleton() {
  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0 dark:bg-slate-700">
          <div className="md:hidden">
            <GenericMobileSkeleton />
            <GenericMobileSkeleton />
            <GenericMobileSkeleton />
            <GenericMobileSkeleton />
            <GenericMobileSkeleton />
            <GenericMobileSkeleton />
          </div>
          <table className="hidden min-w-full text-gray-900 md:table ">
            <thead className="rounded-lg text-left text-sm font-normal dark:text-white">
            <tr>
              <th scope="col" className="px-3 py-5 font-medium">
                  Date
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Winner
                </th>
                <th scope="col" className="px-4 py-5 font-medium">
                  Winner Points For 
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Winner Rank
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Loser
                </th>
                <th scope="col" className="px-4 py-5 font-medium">
                  Loser Points For 
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Loser Rank
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              <MatchRowSkeleton />
              <MatchRowSkeleton />
              <MatchRowSkeleton />
              <MatchRowSkeleton />
              <MatchRowSkeleton />
              <MatchRowSkeleton />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export function PlayersTableSkeleton() {
  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0 dark:bg-slate-700">
          <div className="md:hidden">
            <GenericMobileSkeleton />
            <GenericMobileSkeleton />
            <GenericMobileSkeleton />
            <GenericMobileSkeleton />
            <GenericMobileSkeleton />
            <GenericMobileSkeleton />
          </div>
          <table className="hidden min-w-full text-gray-900 md:table ">
            <thead className="rounded-lg text-left text-sm font-normal dark:text-white">
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
            <tbody className="bg-white">
              <PlayerRowSkeleton />
              <PlayerRowSkeleton />
              <PlayerRowSkeleton />
              <PlayerRowSkeleton />
              <PlayerRowSkeleton />
              <PlayerRowSkeleton />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}