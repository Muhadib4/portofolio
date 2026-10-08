import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Muhadiib — Informatics Student',
  description: 'The personal portfolio of Muhadiib Dwi Taajuddiin Trisno.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
