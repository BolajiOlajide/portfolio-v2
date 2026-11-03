export const cx = (...classes) => classes.filter(Boolean).join(' ');

// Where a music link lives, for the tile caption.
export const platformFor = (link: string) => {
  const host = new URL(link).hostname;
  if (host.includes('soundcloud')) return 'SoundCloud';
  if (host.includes('youtu')) return 'YouTube';
  if (host.includes('protonradio')) return 'Proton';
  if (host.includes('spotify')) return 'Spotify';
  return undefined;
};
