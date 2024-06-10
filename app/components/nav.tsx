'use client';

import Link from 'next/link';
import { useTheme } from 'next-themes';
import { MoonIcon, SunIcon } from '@radix-ui/react-icons';

import LogoDark from 'assets/LogoDark';
import LogoLight from 'assets/LogoLight';

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
        <Link href='/' className='logo'>
          <LogoLight data-hide-on-theme='light' />
          <LogoDark data-hide-on-theme='dark' />
        </Link>
        <ul className='links link-underline link-underline--accent'>
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
