"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { NowPlaying, Providers } from "@bolajiolajide/now-playing";

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

  const np = new NowPlaying(Providers.SPOTIFY, {
    streamerArgs: {
      clientId: "clientId",
      clientSecret: "clientSecret",
      refreshToken: "refreshToken",
    },
  });

  console.log(np.fetchCurrentlyPlayingOrLastPlayed());

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
          By day, I'm a full-stack software engineer with over 5 years of experience, currently boosting developer productivity at{" "}
          <a
            href="https://sourcegraph.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Sourcegraph
          </a>.
          My{" "}
          <a
            href="http://github.com/BolajiOlajide"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>{" "} is where innovation meets functionality.
        </p>

        <p>
          By night, I transform into <strong>PROTON</strong>, an electrifying DJ and music producer. My sound is a dynamic fusion of electronic, house, and techno,
          embodying both the precision of an engineer and the creativity of an artist.<br />
          <strong>PROTON</strong> has captivated audiences at clubs and music events with pulsating beats and immersive performances.
          Dive into my world of music on <a target="_blank" href="https://soundcloud.com/protonmakesmusic" rel="noopener noreferrer">
            SoundCloud
          </a> and experience the rhythm of my dual passions.
        </p>
      </section>
    </>
  );
};

export default Hero;
