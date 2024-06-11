import Airtable from 'airtable';

export const GET = async (request) => {
  try {
    // Configure Airtable
    Airtable.configure({
      endpointUrl: 'https://api.airtable.com',
      apiKey: process.env.AIRTABLE_API_KEY,
    });
    const base = Airtable.base(process.env.AIRTABLE_BASE_ID!);

    // Get token data from Airtable
    const records = await base('token').select().firstPage();
    let token = records[0].fields;

    const now = Date.now();
    // @ts-ignore
    const tokenValid = token.created + token.expiry > now;

    const updateToken = async (base, token) => {
      await base('token').update([
        {
          id: process.env.AIRTABLE_RECORD_ID,
          fields: token,
        },
      ]);
    };

    if (!tokenValid) {
      token = await getAccessToken(token.refresh_token);
      await updateToken(base, token);
    }

    const playingDetails = await getNowPlaying(token.token);

    return new Response(JSON.stringify(playingDetails), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

async function getAccessToken(refreshToken) {
  const basic = Buffer.from(
    process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET
  ).toString('base64');

  const headers = {
    Authorization: `Basic ${basic}`,
    'Content-Type': 'application/x-www-form-urlencoded',
  };

  const params = new URLSearchParams();
  params.append('grant_type', 'refresh_token');
  params.append('refresh_token', refreshToken);

  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers,
    body: params,
  });

  const data = await response.json();
  return transformToken(data);
}

function transformToken(token) {
  return {
    token: token.access_token,
    expiry: (token.expires_in - 300) * 1000,
    created: Date.now(),
  };
}

async function getNowPlaying(accessToken) {
  const headers = {
    Authorization: `Bearer ${accessToken}`,
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };

  let songName = '';
  let isPlaying = false;
  let artistName = '';
  let url = '';
  let coverImageUrl = '';

  try {
    const res = await fetch(
      'https://api.spotify.com/v1/me/player/currently-playing',
      {
        headers,
      }
    );

    const data = await res.json();

    if (!data.is_playing || data.currently_playing_type !== 'track') {
      const res = await fetch(
        'https://api.spotify.com/v1/me/player/recently-played?limit=1',
        {
          headers,
        }
      );

      const recentData = await res.json();
      const recentTrack = recentData.items[0].track;
      songName = recentTrack.name;
      isPlaying = false;
      artistName = recentTrack.artists[0].name;
      url = recentTrack.external_urls.spotify;
      coverImageUrl = recentTrack.album.images[0].url;
    } else {
      const track = data.item;
      songName = track.name;
      isPlaying = data.is_playing;
      artistName = track.artists[0].name;
      url = track.external_urls.spotify;
      coverImageUrl = track.album.images[0].url;
    }

    return { artistName, isPlaying, songName, url, coverImageUrl };
  } catch (error) {
    console.log('error', error);
    throw new Error('Failed to fetch now playing details');
  }
}
