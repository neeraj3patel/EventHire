import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Header } from '@/components/layout/Header';
import './globals.css';

export const metadata: Metadata = {
  title: { default: 'GoPratle – Post your event requirement', template: '%s | GoPratle' },
  description: 'Post a requirement for event planners, performers or crew in a few simple steps.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased">
        <Header />
        <main className="mx-auto max-w-5xl px-4 py-10">{children}</main>
      </body>
    </html>
  );
}
