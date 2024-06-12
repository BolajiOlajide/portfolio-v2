"use client";

import { createContext, useState, useEffect, useContext } from "react";

type SpotifyPlayingDetails = {
  url: string;
  artistName: string;
  songName: string;
  previewUrl: string;
  coverImageUrl: string;
};

const SpotifyContext = createContext({
  url: "",
  artistName: "",
  songName: "",
  previewUrl: "",
  coverImageUrl: "",
});

export const useSpotify = () =>
  useContext<SpotifyPlayingDetails>(SpotifyContext);

export const SpotifyProvider = ({ children }) => {
  const [playingDetails, setPlayingDetails] = useState<SpotifyPlayingDetails>({
    url: "",
    artistName: "",
    songName: "",
    previewUrl: "",
    coverImageUrl: "",
  });

  useEffect(() => {
    const fetchPlayingDetails = () => {
      fetch("/api/spotify")
        .then((res) => res.json())
        .then((data) => {
          setPlayingDetails(data);
        })
        .catch((error) => {
          console.error("Error fetching playing details:", error);
        });
    };

    fetchPlayingDetails();
    const intervalId = setInterval(fetchPlayingDetails, 5000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <SpotifyContext.Provider value={playingDetails}>
      {children}
    </SpotifyContext.Provider>
  );
};
