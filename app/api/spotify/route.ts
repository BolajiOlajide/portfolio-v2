import { NowPlaying, Providers } from "@bolajiolajide/now-playing";

export const dynamic = "force-dynamic";

export const GET = async () => {
  try {
    if (process.env.NODE_ENV !== "production") {
      return new Response(
        JSON.stringify({
          title: "Test Song (Non-production env)",
          artiste: "Chronixx",
          image_url:
            "https://i.scdn.co/image/ab67616d0000b273fb3d081418a02919fb1bb58f",
          is_playing: true,
          preview_url: null,
          url: "https://open.spotify.com/track/0IFwcLA3vdeS9IxypgiQ8N",
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const nowPlaying = new NowPlaying(Providers.SPOTIFY, {
      streamerArgs: {
        clientId: process.env.SPOTIFY_CLIENT_ID!,
        clientSecret: process.env.SPOTIFY_CLIENT_SECRET!,
        refreshToken: process.env.SPOTIFY_REFRESH_TOKEN!,
      },
    });

    const playingDetails = await nowPlaying.fetchCurrentlyPlayingOrLastPlayed();

    return new Response(JSON.stringify(playingDetails), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
