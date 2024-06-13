"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import Playing from "assets/svgs/Playing";
import { useSpotify } from "./context/spotify";

import proton from "assets/images/proton.png";

const Hero = () => {
  const playerRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const playingDetails = useSpotify();

  const handlePlayPause = () => {
    if (playing) {
      playerRef.current?.pause();
      setPlaying(false);
    } else {
      playerRef.current?.play();
      setPlaying(true);
    }
  };

  useEffect(() => {
    if (playingDetails.previewUrl && playerRef.current) {
      playerRef.current.src = playingDetails.previewUrl;
      playerRef.current.load();
    }
  }, [JSON.stringify(playingDetails.previewUrl)]);

  return (
    <>
      <section className="hero">
        <div className="hero__image">
          <Image
            src={proton.src}
            alt="hero"
            width={400}
            height={400}
            loading="eager"
            priority
            blurDataURL={proton.blurDataURL}
          />
          <div className="placeholder" />
        </div>
        <div className="hero__text">
          {playingDetails.previewUrl && (
            <audio
              ref={playerRef}
              src={playingDetails.previewUrl}
              preload="auto"
              onEnded={() => setPlaying(false)}
            />
          )}
          {playingDetails.artistName && playingDetails.songName && (
            <button className="now-playing" onClick={() => handlePlayPause()}>
              <span className="now-playing__status">
                {playing ? <Playing /> : "🔇"}
              </span>
              <span className="scroll-text">
                <span className="bold">NOW PLAYING: </span>
                <span>
                  {playingDetails.songName} BY {playingDetails.artistName}
                </span>
              </span>
            </button>
          )}
          <h1>
            Bolaji <br /> Olajide
          </h1>
        </div>
      </section>

      <section className="hero__about">
        <p>
          I’m a full-stack software engineer based in Lagos, Nigeria and I have
          over 7 years of experience. I’m currently increasing developer
          productivity at{" "}
          <a
            href="https://sourcegraph.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Sourcegraph
          </a>
          . You can check out my{" "}
          <a
            href="http://github.com/BolajiOlajide"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>{" "}
          here.
        </p>

        <p>
          By night, my alter-ego, Proton, entertains people with my DJ sets and
          original music productions. My sound, a fusion of electronic, house,
          and techno, reflects my engineering precision and creative flair.
          Proton has performed at various clubs and music festivals. Listen to
          his tracks on{" "}
          <a target="_blank" href="">
            SoundCloud
          </a>
          .
        </p>
      </section>
    </>
  );
};

export default Hero;
