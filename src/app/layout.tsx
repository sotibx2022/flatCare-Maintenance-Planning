import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import './layout.css';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CommonHeader from './ui/header/commonHeader/CommonHeader';
const inter = Inter({ subsets: ['latin'] });
export const metadata: Metadata = {
  title: 'FlatCare Maintenance Planning',
  description: 'Your go-to solution for efficient and effective maintenance planning.',
  // Add more metadata as needed
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="FlatCare Maintenance Planning - Your go-to solution for efficient and effective maintenance planning." />
        <meta name="keywords" content="FlatCare, Maintenance Planning, Maintenance, Planning, Efficiency" />
        <meta name="author" content="Binayaraj Soti" />
        <link rel="icon" href="../../favicon.ico" type="image/icon" />
      </head>
      <body className={inter.className}>
        <div className='children'>{children}</div>
        <ToastContainer />
      </body>
    </html>
  );
}
