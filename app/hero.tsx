"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import Playing from "assets/svgs/Playing";
import { useSpotify } from "./context/spotify";

import proton from "assets/images/proton.png";

const Hero = () => {
  const playingDetails = useSpotify();
  const [playing, setPlaying] = useState(false);
  const playerRef = useRef<HTMLAudioElement>(null);

  const statusText = playingDetails.isPlaying ? "NOW PLAYING" : "LAST PLAYED";

  const handlePlayPause = () => {
    if (!playingDetails.previewUrl) {
      return;
    }

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
      setPlaying(false);
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
          <button className="now-playing" onClick={() => handlePlayPause()}>
            <span className="now-playing__status">
              {playing ? <Playing /> : "🔇"}
            </span>
            {playingDetails.artistName && playingDetails.songName ? (
              <>
                <span className="sr-only">
                  {statusText}: {playingDetails.songName} BY{" "}
                  {playingDetails.artistName}
                </span>
                <span className="scroll-text__container" aria-hidden="true">
                  <span className="scroll-text">
                    <span className="bold">{statusText}:</span>
                    <span>
                      {playingDetails.songName} BY {playingDetails.artistName}.
                    </span>
                    <span className="bold">{statusText}:</span>
                    <span>
                      {playingDetails.songName} BY {playingDetails.artistName}.
                    </span>
                    <span className="bold">{statusText}:</span>
                    <span>
                      {playingDetails.songName} BY {playingDetails.artistName}.
                    </span>
                    <span className="bold">{statusText}:</span>
                    <span>
                      {playingDetails.songName} BY {playingDetails.artistName}.
                    </span>
                    <span className="bold">{statusText}:</span>
                    <span>
                      {playingDetails.songName} BY {playingDetails.artistName}.
                    </span>
                    <span className="bold">{statusText}:</span>
                    <span>
                      {playingDetails.songName} BY {playingDetails.artistName}.
                    </span>
                  </span>
                </span>
              </>
            ) : (
              <span>CURRENTLY OFFLINE.</span>
            )}
          </button>
          <h1>
            Bolaji <br /> Olajide
          </h1>
        </div>
      </section>

      <section className="hero__about">
        <p>
          By day, I'm a full-stack software engineer with over 5 years of
          experience, currently boosting developer productivity at{" "}
          <a
            href="https://sourcegraph.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Sourcegraph
          </a>
          . My{" "}
          <a
            href="http://github.com/BolajiOlajide"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>{" "}
          is where innovation meets functionality.
        </p>

        <p>
          By night, I transform into <strong>PROTON</strong>, an electrifying DJ
          and music producer. My sound is a dynamic fusion of electronic, house,
          and techno, embodying both the precision of an engineer and the
          creativity of an artist.
          <br />
        </p>
        <p>
          <strong>PROTON</strong> has captivated audiences at clubs and music
          events with pulsating beats and immersive performances. Dive into my
          world of music on{" "}
          <a
            target="_blank"
            href="https://soundcloud.com/protonmakesmusic"
            rel="noopener noreferrer"
          >
            SoundCloud
          </a>{" "}
          and experience the rhythm of my dual passions.
        </p>
      </section>
    </>
  );
};

export default Hero;
