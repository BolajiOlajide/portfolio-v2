'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

const Hero = () => {
  const [playingDetails, setPlayingDetails] = useState({
    url: '',
    artist: '',
    songName: '',
    coverImageUrl: '',
  });

  useEffect(() => {
    const fetchPlayingDetails = () => {
      fetch('/api/spotify')
        .then((res) => res.json())
        .then((data) => {
          setPlayingDetails({
            url: data.url,
            artist: data.artistName,
            songName: data.songName,
            coverImageUrl: data.coverImageUrl,
          });
        })
        .catch((error) => {
          console.error('Error fetching playing details:', error);
        });
    };

    fetchPlayingDetails();

    const intervalId = setInterval(fetchPlayingDetails, 5000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <section className='hero'>
        <div className='hero__image'>
          <Image src='/proton.png' alt='hero' width={400} height={400} />
          <div className='placeholder' />
        </div>
        <div className='hero__text'>
          {playingDetails.artist &&
            playingDetails.songName &&
            playingDetails.url &&
            playingDetails.coverImageUrl && (
              <a
                target='_blank'
                href={playingDetails.url}
                className='now-playing auto-scroll-container'
              >
                <div className='auto-scroll-content'>
                  <span className='bold'>NOW PLAYING: </span>
                  <span>
                    {playingDetails.songName} BY {playingDetails.artist}
                  </span>
                </div>
              </a>
            )}
          <h1>
            Bolaji <br /> Olajide
          </h1>
        </div>
      </section>

      <section className='hero__about'>
        <p>
          I’m a full-stack software engineer based in Lagos, Nigeria and I have
          over 7 years of experience. I’m currently increasing developer
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
          By night, my alter-ego, Proton, entertains people with my DJ sets and
          original music productions. My sound, a fusion of electronic, house,
          and techno, reflects my engineering precision and creative flair.
          Proton has performed at various clubs and music festivals. Listen to
          his tracks on{' '}
          <a target='_blank' href=''>
            SoundCloud
          </a>
          .
        </p>
      </section>
    </>
  );
};

export default Hero;
