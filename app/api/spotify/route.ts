import { NowPlaying, Providers } from "@bolajiolajide/now-playing";

export const dynamic = 'force-dynamic'

export const GET = async () => {
  try {
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
