'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ThemeToggle from '@/components/ThemeToggle';

export default function Navigation() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === '/') return pathname === '/';
    return pathname.startsWith(path);
  };

  const links = [
    { href: '/', label: 'Home' },
    { href: '/exercises', label: 'Exercises' },
    { href: '/routines', label: 'Routines' },
    { href: '/workouts', label: 'Workouts' },
  ];

  return (
    <nav className="bg-gradient-to-r from-primary-600 to-accent-600 dark:from-primary-800 dark:to-accent-800 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-2xl font-bold">
            💪 Gym Trainer
          </Link>
          <div className="flex items-center gap-3">
            <div className="flex gap-1">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    isActive(link.href)
                      ? 'bg-white/20 shadow-md'
                      : 'hover:bg-white/10'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}
