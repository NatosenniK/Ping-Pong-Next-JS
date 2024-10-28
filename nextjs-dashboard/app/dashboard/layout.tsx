import SideNav from '@/app/ui/dashboard/sidenav';
import ToastProvider from '../ui/toast-provider';
import ThemeSwitch from '../ui/theme-switch';

export const experimental_ppr = true;
 
export default function Layout({ children }: { children: React.ReactNode }) {

  return (
    <div className="bg-white dark:bg-slate-800 flex h-screen flex-col md:flex-row md:overflow-hidden">
      
      <div className="w-full flex-none md:w-64">
        <SideNav />
      </div>
      <div className="flex-grow dark:bg-slate-800 p-6 md:overflow-y-auto md:p-12">
        <ToastProvider>
          {children}
        </ToastProvider>
        
      </div>
      <div className='fixed bottom-3 right-3'>
          <ThemeSwitch />
      </div>
    </div>
  );
}