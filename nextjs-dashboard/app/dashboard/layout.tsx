import SideNav from '@/app/ui/dashboard/sidenav';

export const experimental_ppr = true;
 
export default function Layout({ children }: { children: React.ReactNode }) {
  console.log("Bucket Name:", process.env.AWS_ACCESS_KEY_ID)
  console.log("Bucket Name:", process.env.AWS_SECRET_ACCESS_KEY)
  console.log("Bucket Name:", process.env.AWS_REGION)
  console.log("Bucket Name:", process.env.AWS_BUCKET_NAME)
  console.log("Bucket Name:", process.env.NEXT_PUBLIC_BASE_URL)
  return (
    <div className="bg-white dark:bg-slate-800 flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64">
        <SideNav />
      </div>
      <div className="flex-grow dark:bg-slate-800 p-6 md:overflow-y-auto md:p-12">{children}</div>
    </div>
  );
}