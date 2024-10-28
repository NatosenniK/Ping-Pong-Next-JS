import Pagination from '@/app/ui/pagination';
import Search from '@/app/ui/search';
import { roboto } from '@/app/ui/fonts';
import { PlayersTableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
import { fetchPlayersPages } from '@/app/lib/data';
import { Metadata } from 'next';
import PlayersTable from '@/app/ui/players/players-table';

export const metadata: Metadata = {
  title: 'Players',
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
        <h1 className={`${roboto.className} text-2xl dark:text-white`}>Players</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search players..." />
      </div>
       <Suspense key={query + currentPage} fallback={<PlayersTableSkeleton />}>
        <PlayersTable query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}