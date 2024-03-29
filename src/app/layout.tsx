import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'YoruLive',
    description: 'La plataforma de streaming y multimedia de Yoru',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang='en'>
            <body className={`bg-zinc-950 ${inter.className}`}>{children}</body>
        </html>
    );
}
