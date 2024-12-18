"use client";

import { PlayerField, UserObject } from "@/app/lib/definitions";
import Link from "next/link";
import {
  AdjustmentsVerticalIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { Button } from "@/app/ui/button";
import { createMatch, State } from "@/app/lib/actions";
import { useActionState, useEffect, useState } from "react";
import { User } from "next-auth";

interface FormProps {
  players: PlayerField[];
  currentUser: User;
}
export default function Form({ players, currentUser }: FormProps) {
  const initialState: State = { message: null, errors: {} };
  const [state, formAction] = useActionState<State, FormData>(
    createMatch,
    initialState
  );
  const [filteredPlayers, setFilteredPlayers] = useState<PlayerField[] | null>(
    null
  );
  const [modifiedUser, setModifiedUser] = useState<PlayerField | null>(null);
  const [loserCurrentRank, setLoserCurrentRank] = useState<number | null>(null);

  useEffect(() => {
    const playersExceptCurrentUser = players.filter(
      (player) => player.email !== currentUser.email
    );
    const currentUserObj = players.filter(
      (player) => player.email == currentUser.email
    );

    setFilteredPlayers(playersExceptCurrentUser);
    setModifiedUser(currentUserObj[0]);
  }, [currentUser, players]);
  return (
    <form action={formAction}>
      <h2 className="ml-2 mb-2 dark:text-white">
        How did your match go, {currentUser.name}?
      </h2>
      <div className="rounded-md bg-gray-50 p-4 md:p-6 dark:bg-slate-700">
        {modifiedUser && (
          <div className="mb-4">
            <label
              htmlFor="winningPlayer"
              className="mb-2 block text-sm font-medium dark:text-white"
            >
              Winning Player
            </label>
            <div className="relative">
              <select
                id="winningPlayer"
                name="winningPlayerId"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 dark:bg-slate-800 dark:text-white"
                defaultValue={modifiedUser.id ?? ""}
                aria-describedby="winningPlayer-error"
                onChange={(e) => {
                  e.target.value = modifiedUser.id ?? "";
                  setLoserCurrentRank(modifiedUser.elo);
                }}
              >
                <option value="" disabled>
                  Select a winning player
                </option>
                {players.map((player) => (
                  <option key={player.id} value={player.id}>
                    {player.username}
                  </option>
                ))}
              </select>
              <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 dark:text-white" />
            </div>
            <div id="winningPlayer-error" aria-live="polite" aria-atomic="true">
              {state.errors?.winnerId &&
                state.errors.winnerId.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
        )}

        <div className="mb-4">
          <label
            htmlFor="winnerPoints"
            className="mb-2 block text-sm font-medium dark:text-white"
          >
            Winner Score
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="winnerPoints"
                name="winnerPoints"
                type="number"
                step="0.01"
                placeholder="Enter Winner Score"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 dark:bg-slate-800 dark:text-white"
                aria-describedby="winnerPoints-error"
              />
              <AdjustmentsVerticalIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900 dark:text-white" />
            </div>
            <div id="winnerPoints" aria-live="polite" aria-atomic="true">
              {state.errors?.winnerPoints &&
                state.errors.winnerPoints.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
        </div>

        <div className="mb-4">
          <label
            htmlFor="winnerRank"
            className="mb-2 block text-sm font-medium dark:text-white"
          >
            Winner Current Rank
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="winnerRank"
                name="winnerRank"
                type="number"
                step="0.01"
                placeholder="Enter Winner Score"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 dark:bg-slate-800 dark:text-white"
                aria-describedby="winnerRank-error"
                value={modifiedUser?.elo ?? 0}
                readOnly
              />
              <AdjustmentsVerticalIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900 dark:text-white" />
            </div>
          </div>
        </div>

        <div className="mb-4">
          <label
            htmlFor="losingPlayer"
            className="mb-2 block text-sm font-medium dark:text-white"
          >
            Losing Player
          </label>
          <div className="relative">
            <select
              id="losingPlayer"
              name="losingPlayerId"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 dark:bg-slate-800 dark:text-white"
              defaultValue=""
              aria-describedby="losingPlayer-error"
              onChange={(e) => {
                const losingPlayerObj = players.filter(
                  (player) => player.id == e.target.value
                );
                setLoserCurrentRank(losingPlayerObj[0].elo);
              }}
            >
              <option value="" disabled>
                Select a losing player
              </option>
              {filteredPlayers &&
                filteredPlayers.map((filteredPlayer) => (
                  <option key={filteredPlayer.id} value={filteredPlayer.id}>
                    {filteredPlayer.username}
                  </option>
                ))}
            </select>
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 dark:text-white" />
          </div>
          <div id="customer-error" aria-live="polite" aria-atomic="true">
            {state.errors?.loserId &&
              state.errors.loserId.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        <div className="mb-4">
          <label
            htmlFor="loserPoints"
            className="mb-2 block text-sm font-medium dark:text-white"
          >
            Loser Score
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="loserPoints"
                name="loserPoints"
                type="number"
                step="0.01"
                placeholder="Enter Loser Score"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 dark:bg-slate-800 dark:text-white"
                aria-describedby="loserPoints-error"
              />
              <AdjustmentsVerticalIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900 dark:text-white" />
            </div>
            <div id="loserPoints" aria-live="polite" aria-atomic="true">
              {state.errors?.loserPoints &&
                state.errors.loserPoints.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
        </div>

        <div className="mb-4">
          <label
            htmlFor="loserRank"
            className="mb-2 block text-sm font-medium dark:text-white"
          >
            Loser Current Rank
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="loserRank"
                name="loserRank"
                type="number"
                step="0.01"
                placeholder="Enter Winner Score"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 dark:bg-slate-800 dark:text-white"
                aria-describedby="loserRank-error"
                value={loserCurrentRank ?? 0}
                readOnly
              />
              <AdjustmentsVerticalIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900 dark:text-white" />
            </div>
          </div>
        </div>

        {/* Invoice Amount */}
        {/* <div className="mb-4">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
            Choose an amount
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="amount"
                name="amount"
                type="number"
                step="0.01"
                placeholder="Enter USD amount"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="amount-error"
              />
              <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            <div id="amount-error" aria-live="polite" aria-atomic="true">
              {state.errors?.amount &&
                state.errors.amount.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
        </div> */}

        {/* Invoice Status */}
        {/* <fieldset>
          <legend className="mb-2 block text-sm font-medium">
            Set the invoice status
          </legend>
          <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
            <div className="flex gap-4">
              <div className="flex items-center">
                <input
                  id="pending"
                  name="status"
                  type="radio"
                  value="pending"
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="pending"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
                >
                  Pending <ClockIcon className="h-4 w-4" />
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="paid"
                  name="status"
                  type="radio"
                  value="paid"
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                  aria-describedby="status-error"
                />
                <label
                  htmlFor="paid"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white"
                >
                  Paid <CheckIcon className="h-4 w-4" />
                </label>
              </div>

            </div>
          </div>
          <div id="status-error" aria-live="polite" aria-atomic="true">
            {state.errors?.status &&
              state.errors.status.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </fieldset> */}
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/matches"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Log Match</Button>
      </div>
    </form>
  );
}
