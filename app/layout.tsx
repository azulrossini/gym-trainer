import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Provider } from 'jotai';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Gym Trainer - Your Personal Workout Manager",
  description: "Create and manage your exercises, routines, and workouts",
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32', type: 'image/x-icon' },
      { url: '/favicon.png', sizes: '32x32', type: 'image/png' },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
          {children}
        </Provider>
      </body>
    </html>
  );
}
