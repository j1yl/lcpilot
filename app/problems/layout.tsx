import type { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'LC-Pilot | Problems',
  description: 'Live AI assistant to streamline the growth of your algorithmic skill.'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Suspense>
      {children}
      {/* Footer */}
    </Suspense>
  );
}
