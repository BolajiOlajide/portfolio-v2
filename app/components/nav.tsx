import Image from 'next/image';
import Link from 'next/link';

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
  return (
    <aside className=' nav__wrapper'>
      <nav className='nav'>
        <Link href='/'>
          <Image src='/logo.svg' width={32} height={32} alt='' />
        </Link>
        <ul className='links'>
          {Object.entries(navItems).map(([path, { name }]) => {
            return (
              <li key={path}>
                <Link href={path}>{name}</Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
