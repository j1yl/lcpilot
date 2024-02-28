import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Image from 'next/image';
import SessionWrapper from '@/components/SessionWrapper';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'LC-Pilot',
  description: 'Live AI assistant to streamline the growth of your algorithmic skill.'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionWrapper>
      <html lang="en">
        <body
          className={`${inter.className} flex min-h-screen flex-col bg-neutral-950 text-xs text-white`}
        >
          <Image
            src={'/background.jpg'}
            alt={'cool laptop'}
            fill
            className="absolute left-0 top-0 z-0 aspect-video w-full object-center opacity-20"
          />
          <Navbar />
          <div className="z-20 mx-auto flex h-full w-full flex-grow">{children}</div>
        </body>
      </html>
    </SessionWrapper>
  );
}
