import { PlayerStandingsTable } from "@/app/lib/definitions"
import { PingPongImage } from "../ping-pong-image"
import { lusitana } from "../fonts";
import CardWrapper, { Card } from "../dashboard/cards";
import { ArrowTrendingUpIcon, ClockIcon, PresentationChartBarIcon, UserGroupIcon } from "@heroicons/react/24/outline";
import { Suspense } from "react";
import { CardSkeleton } from "../skeletons";
import PlayerCardWrapper from "./player-cards";

interface PlayerProfileProps {
    player: PlayerStandingsTable
}

const iconMap = {
    players: UserGroupIcon,
    totalPointsScored: PresentationChartBarIcon,
    matchesPlayed: ClockIcon,
    topPlayer: ArrowTrendingUpIcon,
  };

export function PlayerProfile({player}: PlayerProfileProps) {


    return (
        <> 
            <div>
                <div className="flex w-full dark:bg-slate-600 p-4 rounded-xl items-center mb-6">
                    <div className="mr-4">
                        {player.profile_picture_url ? (
                            <PingPongImage 
                                imageUrl={player.profile_picture_url} 
                                width={240} 
                                height={240}
                                className='bg-center rounded-full'
                            />
                            ) : (
                                <div className="h-64 w-64 rounded-full bg-gray-100 dark:bg-slate-600"></div>
                        )}
                    </div>
                    <div className="flex grow flex-col justify-between rounded-xl bg-gray-50 p-4 dark:bg-slate-600">
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            <Suspense fallback={<CardSkeleton />}>
                                <PlayerCardWrapper player={player} />
                            </Suspense>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}