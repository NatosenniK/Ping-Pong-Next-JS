"use client";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

interface ToastProviderProps {
  children: React.ReactNode;
}

export default function ToastProvider({ children }: ToastProviderProps) {
  const contextClass = {
    success: 'bg-blue-600 dark:bg-blue-400',
    error: 'bg-red-600 dark:bg-red-400',
    info: 'bg-gray-600 dark:bg-gray-400',
    warning: 'bg-orange-400 dark:bg-orange-300',
    default: 'bg-indigo-600 dark:bg-indigo-400',
    dark: 'bg-white-600 dark:bg-slate-900 font-gray-300',
  };

  return (
    <>
      {children}
      <ToastContainer
        toastClassName={(context) =>
          contextClass[context?.type || 'default'] +
          ' relative flex p-1 min-h-10 rounded-md justify-between overflow-hidden cursor-pointer dark:bg-slate-500'
        }
        bodyClassName={() => 'text-sm font-white font-med block p-3 flex '}
        position="top-center"
        autoClose={5000}
      />
    </>
  );
}