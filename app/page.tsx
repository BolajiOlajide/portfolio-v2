import Image from 'next/image';

import { BlogPosts } from 'app/components/posts';

export default function Page() {
  return (
    <div className='container'>
      <section className='hero'>
        <div className='hero__image'>
          <Image src='/proton.png' alt='hero' objectFit='cover' layout='fill' />
        </div>
        <div className='hero__text'>
          <div className='status'>
            <span className='bold'>NOW PLAYING:</span>{' '}
            <span> FORTRESS - MOOJO REMIX BY DIPLO</span>
          </div>
          <h1>
            Bolaji <br /> Olajide
          </h1>
        </div>
      </section>

      <section>
        <div className='hero__about'>
          <p>
            I’m a full-stack software engineer based in Lagos, Nigeria and I
            have over 7 years of experience. I’m currently increasing developer
            productivity at{' '}
            <a
              href='https://sourcegraph.com/'
              target='_blank'
              rel='noopener noreferrer'
            >
              Sourcegraph
            </a>
            . You can check out my{' '}
            <a
              href='http://github.com/BolajiOlajide'
              target='_blank'
              rel='noopener noreferrer'
            >
              GitHub
            </a>{' '}
            here.
          </p>

          <p>
            By night, my alter-ego, Proton, entertains people with my DJ sets
            and original music productions. My sound, a fusion of electronic,
            house, and techno, reflects my engineering precision and creative
            flair. Proton has performed at various clubs and music festivals.
            Listen to his tracks on{' '}
            <a target='_blank' href=''>
              SoundCloud
            </a>
            .
          </p>
        </div>
        {/* <BlogPosts /> */}
      </section>
    </div>
  );
}
