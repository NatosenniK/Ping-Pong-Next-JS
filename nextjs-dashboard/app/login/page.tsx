
import LoginForm from '@/app/ui/login-form';
import { Metadata } from 'next';
import PingPongLogo from '../ui/ping-pong-logo';

export const metadata: Metadata = {
    title: 'Login',
  };
 
export default function LoginPage() {
  return (
    <main className="bg-white dark:bg-slate-800 flex items-center justify-center h-screen">
      <div className="relative mx-auto flex w-full max-w-[500px] flex-col space-y-2.5 p-4 md:-mt-32">
        <div className="flex h-50 md:h-20 w-full items-end rounded-lg bg-blue-500 p-3 md:h-36 flex justify-center items-center">
          <div className="w-100 text-white">
            <PingPongLogo />
          </div>
        </div>
        <LoginForm />
      </div>
    </main>
  );
}