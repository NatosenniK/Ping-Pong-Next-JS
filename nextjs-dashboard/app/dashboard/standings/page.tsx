
import Search from '@/app/ui/search';
import Table from '@/app/ui/standings/standings-table';
import { CreateMatch } from '@/app/ui/matches/buttons';
import { lusitana } from '@/app/ui/fonts';
import { StandingsTableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
import { fetchPlayersPages } from '@/app/lib/data';
import { Metadata } from 'next';
import Pagination from '@/app/ui/pagination';

export const metadata: Metadata = {
  title: 'Standings',
};
 
export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchPlayersPages(query);
  
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl dark:text-white`}>Standings</h1>
      </div>
       <Suspense key={query + currentPage} fallback={<StandingsTableSkeleton />}>
        <Table query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}