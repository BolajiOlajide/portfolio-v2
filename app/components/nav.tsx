'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { MoonIcon, SunIcon } from '@radix-ui/react-icons';

const navItems = {
  '/blog': {
    name: 'blog',
  },
  '/uses': {
    name: 'uses',
  },
  '/music': {
    name: 'music',
  },
};

export function Navbar() {
  const { setTheme } = useTheme();

  return (
    <aside className=' nav__wrapper'>
      <nav className='nav'>
        <Link href='/'>
          <Image
            data-hide-on-theme='light'
            src='/logo-light.svg'
            width={32}
            height={32}
            alt=''
          />
          <Image
            data-hide-on-theme='dark'
            src='/logo-dark.svg'
            width={32}
            height={32}
            alt=''
          />
        </Link>
        <ul className='links'>
          {Object.entries(navItems).map(([path, { name }]) => {
            return (
              <li key={path}>
                <Link href={path}>{name}</Link>
              </li>
            );
          })}
          <li>
            <button
              onClick={() => setTheme('dark')}
              data-hide-on-theme='dark'
              className='theme-toggle'
            >
              <SunIcon />
            </button>
            <button
              onClick={() => setTheme('light')}
              className='theme-toggle'
              data-hide-on-theme='light'
            >
              <MoonIcon />
            </button>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
