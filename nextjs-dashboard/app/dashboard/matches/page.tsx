import Pagination from '@/app/ui/pagination';
import Search from '@/app/ui/search';
import { CreateMatch } from '@/app/ui/matches/buttons';
import { roboto } from '@/app/ui/fonts';
import { MatchesTableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
import { fetchMatchesPages } from '@/app/lib/data';
import { Metadata } from 'next';
import MatchesTable from '@/app/ui/matches/matches-table';

export const metadata: Metadata = {
  title: 'Matches',
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
  const totalPages = await fetchMatchesPages(query);
  
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${roboto.className} text-2xl dark:text-white`}>Matches</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search matches..." />
        <CreateMatch />
      </div>
       <Suspense key={query + currentPage} fallback={<MatchesTableSkeleton />}>
        <MatchesTable query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}