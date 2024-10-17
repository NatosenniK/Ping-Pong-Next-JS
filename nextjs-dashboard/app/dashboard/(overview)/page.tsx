import CardWrapper from '@/app/ui/dashboard/cards';
import { lusitana } from '@/app/ui/fonts';
// import { fetchCardData } from '@/app/lib/data';
import { Suspense } from 'react';
import { CardSkeleton, LatestMatchesSkeleton, MatchChartSkeleton } from '@/app/ui/skeletons';
import { Metadata } from 'next';
import WelcomeMessage from '@/app/ui/dashboard/welcome-message';
import LatestMatches from '@/app/ui/dashboard/latest-matches';
import MatchChart from '@/app/ui/dashboard/matches-chart';

export const metadata: Metadata = {
  title: 'Home',
};
 
export default async function Page() {

  // const {
  //   numberOfInvoices,
  //   numberOfCustomers,
  //   totalPaidInvoices,
  //   totalPendingInvoices,
  // } = await fetchCardData();

  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl dark:text-white`}>
        <Suspense fallback={'Testing'}>
          <WelcomeMessage />
        </Suspense>
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Suspense fallback={<CardSkeleton />}>
          <CardWrapper />
        </Suspense>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <Suspense fallback={<MatchChartSkeleton />}>
          <MatchChart />
        </Suspense>
        <Suspense fallback={<LatestMatchesSkeleton />}>
          <LatestMatches />
        </Suspense>
      </div>
    </main>
  );
}