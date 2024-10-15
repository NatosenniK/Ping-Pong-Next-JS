// 'use client';

// import { PlayerField, InvoiceForm } from '@/app/lib/definitions';
// import {
//   CheckIcon,
//   ClockIcon,
//   CurrencyDollarIcon,
//   UserCircleIcon,
// } from '@heroicons/react/24/outline';
// import Link from 'next/link';
// import { Button } from '@/app/ui/button';
// import { State, updateInvoice } from '@/app/lib/actions';
// import { useActionState } from 'react';

// export default function EditInvoiceForm({
//   invoice,
//   players,
// }: {
//   invoice: InvoiceForm;
//   players: PlayerField[];
// }) {

//   const initialState: State = { message: null, errors: {} };
//   const updateInvoiceWithId = updateInvoice.bind(null, invoice.id);
//   const [state, formAction] = useActionState(updateInvoiceWithId, initialState);
  
//   return (
//     <form action={formAction}>
//       <div className="rounded-md bg-gray-50 p-4 md:p-6 dark:bg-slate-700">
//         {/* Winning Player */}
//         <div className="mb-4">
//           <label htmlFor="customer" className="mb-2 block text-sm font-medium dark:text-white">
//             Winning Player
//           </label>
//           <div className="relative">
//             <select
//               id="customer"
//               name="customerId"
//               className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 dark:bg-slate-800 dark:text-white"
//               defaultValue={invoice.customer_id}
//             >
//               <option value="" disabled>
//                 Select a player
//               </option>
//               {players.map((player) => (
//                 <option key={player.id} value={player.id}>
//                   {player.username}
//                 </option>
//               ))}
//             </select>
//             <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
//           </div>
//         </div>

//         {/* Losing Player */}
//         <div className="mb-4">
//           <label htmlFor="loserPlayer" className="mb-2 block text-sm font-medium dark:text-white">
//             Choosing Losing Player
//           </label>
//           <div className="relative">
//             <select
//               id="loserPlayer"
//               name="loserPlayerId"
//               className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 dark:bg-slate-800 dark:text-white"
//               defaultValue={invoice.customer_id}
//             >
//               <option value="" disabled>
//                 Select a player
//               </option>
//               {players.map((player) => (
//                 <option key={player.id} value={player.id}>
//                   {player.username}
//                 </option>
//               ))}
//             </select>
//             <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
//           </div>
//         </div>

//         {/* Invoice Amount */}
//         <div className="mb-4">
//           <label htmlFor="amount" className="mb-2 block text-sm font-medium dark:text-white">
//             Choose an amount
//           </label>
//           <div className="relative mt-2 rounded-md">
//             <div className="relative">
//               <input
//                 id="amount"
//                 name="amount"
//                 type="number"
//                 step="0.01"
//                 defaultValue={invoice.amount}
//                 placeholder="Enter USD amount"
//                 className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 dark:bg-slate-800 dark:text-white"
//                 aria-describedby="amount-error"
//               />
//               <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
//             </div>
//             <div id="amount-error" aria-live="polite" aria-atomic="true">
//               {state.errors?.amount &&
//                 state.errors.amount.map((error: string) => (
//                   <p className="mt-2 text-sm text-red-500" key={error}>
//                     {error}
//                   </p>
//                 ))}
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="mt-6 flex justify-end gap-4">
//         <Link
//           href="/dashboard/invoices"
//           className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
//         >
//           Cancel
//         </Link>
//         <Button type="submit">Edit Invoice</Button>
//       </div>
//     </form>
//   );
// }
