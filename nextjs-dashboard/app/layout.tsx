import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';
import { Metadata } from 'next';
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import { Providers } from './providers';
import ThemeSwitch from './ui/theme-switch';
config.autoAddCss = false;

export const metadata: Metadata = {
  title: {
    template: '%s | Ping Pong Ranking',
    default: 'Ping Pong Ranking',
  },
  description: 'Log and track ping pong matches with your friends. View recent matches and rankings.',
  metadataBase: new URL('https://next-learn-dashboard.vercel.sh'),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
