import { PlayerStandingsTable } from "@/app/lib/definitions"
import { PingPongImage } from "../ping-pong-image"
import { roboto } from "../fonts";
import CardWrapper, { Card } from "../dashboard/cards";
import { ArrowTrendingUpIcon, ClockIcon, PresentationChartBarIcon, UserGroupIcon } from "@heroicons/react/24/outline";
import { Suspense } from "react";
import { CardSkeleton } from "../skeletons";
import PlayerCardWrapper from "./player-cards";

interface PlayerProfileProps {
    player: PlayerStandingsTable
}

export function PlayerProfile({player}: PlayerProfileProps) {


    return (
        <> 
            <div className="mb-8">
                <div className="flex w-full dark:bg-slate-600 rounded-xl items-center sm:grid-cols-2">
                    <div className="flex grow flex-col justify-between rounded-xl bg-gray-50 p-4 dark:bg-slate-600">
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
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