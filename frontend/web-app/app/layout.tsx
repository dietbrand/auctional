import type { Metadata } from 'next';
import './globals.css';
import Navbar from './nav/Navbar';
import ToasterProvider from './providers/ToasterProvider';

export const metadata: Metadata = {
  title: '2delands.be',
  description: 'Website for selling my stuff before I move',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body>
        <ToasterProvider />
        <Navbar />
        <main className='container mx-auto px-5 pt-10'>{children}</main>
      </body>
    </html>
  );
}
