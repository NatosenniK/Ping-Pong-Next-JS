import SideNav from '@/app/ui/dashboard/sidenav';
import ToastProvider from '../ui/toast-provider';
import ThemeSwitch from '../ui/theme-switch';
import { HeaderElement } from '../ui/header/header';

export const experimental_ppr = true;
 
export default function Layout({ children }: { children: React.ReactNode }) {

  return (
    <div>
      <div>
        <HeaderElement />
      </div>
     
      <div className="bg-white dark:bg-slate-800 flex h-screen flex-col md:flex-row md:overflow-hidden">
      

      <div className='w-full flex justify-center'>
            <div className="flex-grow dark:bg-slate-800 p-6 md:overflow-y-auto md:p-12 max-w-7xl">
              <ToastProvider>
                {children}
              </ToastProvider>
              
            </div>
      </div>
    </div>
    </div>
    
  );
}