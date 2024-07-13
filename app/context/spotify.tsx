"use client";

import { createContext, useState, useEffect, useContext } from "react";

export type SpotifyPlayingDetails = {
  url: string;
  artistName: string;
  songName: string;
  previewUrl: string;
  coverImageUrl: string;
  isPlaying: boolean;

  loading: boolean;
};

const SpotifyContext = createContext({
  url: "",
  artistName: "",
  songName: "",
  previewUrl: "",
  isPlaying: false,
  coverImageUrl: "",
  loading: false,
});

export const useSpotify = () =>
  useContext<SpotifyPlayingDetails>(SpotifyContext);

export const SpotifyProvider = ({ children }) => {
  const [playingDetails, setPlayingDetails] = useState<SpotifyPlayingDetails>({
    url: "",
    artistName: "",
    songName: "",
    previewUrl: "",
    isPlaying: false,
    coverImageUrl: "",
    loading: true
  });

  useEffect(() => {
    const fetchPlayingDetails = () => {
      fetch("/api/spotify")
        .then((res) => res.json())
        .then((data) => {
          setPlayingDetails({
            url: data.url,
            artistName: data.artiste,
            songName: data.title,
            previewUrl: data.preview_url,
            coverImageUrl: data.image_url,
            isPlaying: data.is_playing,
            loading: false,
          });
        })
        .catch((error) => {
          setPlayingDetails((prev) => ({...prev, loading: false }));
          console.error("Error fetching playing details:", error);
        });
    };

    setPlayingDetails((prev) => ({...prev, loading: true }));
    fetchPlayingDetails();
    const intervalId = setInterval(fetchPlayingDetails, 30000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <SpotifyContext.Provider value={playingDetails}>
      {children}
    </SpotifyContext.Provider>
  );
};
