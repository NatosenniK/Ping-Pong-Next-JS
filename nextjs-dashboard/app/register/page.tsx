import { Metadata } from 'next';
import RegisterForm from '../ui/register-form';
import PingPongLogo from '../ui/ping-pong-logo';

export const metadata: Metadata = {
    title: 'Register',
  };
 
export default function LoginPage() {
  return (
    <main className="bg-white dark:bg-slate-800 flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[600px] flex-col space-y-2.5 p-4 md:-mt-32">
        <div className="flex h-20 w-full items-end rounded-lg bg-blue-500 p-3 md:h-36">
          <div className="text-white">
            <PingPongLogo />
          </div>
        </div>
        <RegisterForm />
      </div>
    </main>
  );
}