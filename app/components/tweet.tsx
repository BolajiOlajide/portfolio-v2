import { ArrowTopRightIcon, TwitterLogoIcon } from "@radix-ui/react-icons";

import { formatListDate } from "app/blog/utils";
import styles from "./tweet.module.scss";

// A paragraph that is only a tweet URL ("https://twitter.com/user/status/123?s=20").
export const TWEET_URL = /^https?:\/\/(?:www\.|mobile\.)?(?:twitter|x)\.com\/\w+\/status\/(\d+)\S*$/;

type Entity = { indices: [number, number] };
type TweetData = {
  __typename: "Tweet";
  id_str: string;
  text: string;
  created_at: string;
  display_text_range: [number, number];
  favorite_count?: number;
  conversation_count?: number;
  user: { name: string; screen_name: string; profile_image_url_https: string };
  entities: {
    urls?: Array<Entity & { expanded_url: string; display_url: string }>;
    user_mentions?: Array<Entity & { screen_name: string }>;
    hashtags?: Array<Entity & { text: string }>;
    media?: Entity[];
  };
  mediaDetails?: Array<{
    type: "photo" | "video" | "animated_gif";
    media_url_https: string;
    original_info: { width: number; height: number };
  }>;
};

// The token the public embed endpoint expects, derived from the tweet id (same as X's own embed code).
const tokenFor = (id: string) => ((Number(id) / 1e15) * Math.PI).toString(6 ** 2).replace(/(0+|\.)/g, "");

// Fetched on the server and cached for a day, so readers' browsers never load X's scripts.
// Deleted or unreachable tweets come back as null and render the fallback card.
async function getTweet(id: string): Promise<TweetData | null> {
  try {
    const res = await fetch(
      `https://cdn.syndication.twimg.com/tweet-result?id=${id}&lang=en&token=${tokenFor(id)}`,
      { next: { revalidate: 86400 }, signal: AbortSignal.timeout(5000) }
    );
    if (!res.ok) return null;
    const data = await res.json();
    return data?.__typename === "Tweet" ? data : null;
  } catch {
    return null;
  }
}

const decode = (s: string) => s.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">");

// Tweet text with links, mentions and hashtags restored. Entity indices count code points.
function Body({ tweet }: { tweet: TweetData }) {
  const chars = Array.from(tweet.text);
  const [start, end] = tweet.display_text_range;
  const { urls = [], user_mentions = [], hashtags = [] } = tweet.entities;

  const links = [
    ...urls.map((u) => ({ indices: u.indices, href: u.expanded_url, label: u.display_url })),
    ...user_mentions.map((m) => ({ indices: m.indices, href: `https://x.com/${m.screen_name}`, label: `@${m.screen_name}` })),
    ...hashtags.map((h) => ({ indices: h.indices, href: `https://x.com/hashtag/${h.text}`, label: `#${h.text}` })),
  ]
    .filter((l) => l.indices[0] >= start && l.indices[1] <= end)
    .sort((a, b) => a.indices[0] - b.indices[0]);

  const parts: React.ReactNode[] = [];
  let at = start;
  links.forEach((l, i) => {
    parts.push(decode(chars.slice(at, l.indices[0]).join("")));
    parts.push(
      <a key={i} href={l.href} target="_blank" rel="noopener noreferrer">
        {l.label}
      </a>
    );
    at = l.indices[1];
  });
  parts.push(decode(chars.slice(at, end).join("")));

  return <p className={styles.text}>{parts}</p>;
}

// Leading @mentions that X hides from a reply's text.
function replyingTo(tweet: TweetData) {
  const [start] = tweet.display_text_range;
  return (tweet.entities.user_mentions || []).filter((m) => m.indices[1] <= start).map((m) => m.screen_name);
}

export default async function Tweet({ id, url }: { id: string; url: string }) {
  const tweet = await getTweet(id);

  if (!tweet) {
    return (
      <a href={url} target="_blank" rel="noopener noreferrer" className={`${styles.tweet} ${styles.missing}`} data-embed>
        <TwitterLogoIcon width={16} height={16} aria-hidden="true" />
        <span>This post is no longer available on X.</span>
        <span className={styles.view}>
          Open link <ArrowTopRightIcon width={14} height={14} aria-hidden="true" />
        </span>
      </a>
    );
  }

  const { user } = tweet;
  const profile = `https://x.com/${user.screen_name}`;
  const permalink = `${profile}/status/${tweet.id_str}`;
  const replies = replyingTo(tweet);
  const media = tweet.mediaDetails || [];

  return (
    <figure className={styles.tweet} data-embed aria-label={`Post by ${user.name} on X`}>
      <header className={styles.head}>
        <a href={profile} target="_blank" rel="noopener noreferrer" className={styles.author}>
          <img
            src={user.profile_image_url_https.replace("_normal", "_bigger")}
            alt=""
            width={40}
            height={40}
            className={styles.avatar}
          />
          <span className={styles.names}>
            <span className={styles.name}>{user.name}</span>
            <span className={styles.handle}>@{user.screen_name}</span>
          </span>
        </a>
        <TwitterLogoIcon width={18} height={18} aria-hidden="true" className={styles.logo} />
      </header>

      {replies.length > 0 && (
        <p className={styles.reply}>
          Replying to{" "}
          {replies.map((name, i) => (
            <span key={name}>
              {i > 0 && " "}
              <a href={`https://x.com/${name}`} target="_blank" rel="noopener noreferrer">
                @{name}
              </a>
            </span>
          ))}
        </p>
      )}

      <Body tweet={tweet} />

      {media.length > 0 && (
        <a
          href={permalink}
          target="_blank"
          rel="noopener noreferrer"
          className={media.length > 1 ? `${styles.media} ${styles.mediaGrid}` : styles.media}
        >
          {media.slice(0, 4).map((m) => (
            <span key={m.media_url_https} className={styles.mediaItem}>
              <img
                src={m.media_url_https}
                alt={m.type === "photo" ? `Image attached to ${user.name}'s post` : `Video thumbnail from ${user.name}'s post`}
                width={m.original_info.width}
                height={m.original_info.height}
                loading="lazy"
              />
              {m.type !== "photo" && <span className={styles.play}>Watch on X</span>}
            </span>
          ))}
        </a>
      )}

      <footer className={styles.foot}>
        <time dateTime={tweet.created_at}>{formatListDate(tweet.created_at)}</time>
        {typeof tweet.favorite_count === "number" && tweet.favorite_count > 0 && (
          <span>
            {tweet.favorite_count} {tweet.favorite_count === 1 ? "like" : "likes"}
          </span>
        )}
        {typeof tweet.conversation_count === "number" && tweet.conversation_count > 0 && (
          <span>
            {tweet.conversation_count} {tweet.conversation_count === 1 ? "reply" : "replies"}
          </span>
        )}
        <a href={permalink} target="_blank" rel="noopener noreferrer" className={styles.view}>
          View on X <ArrowTopRightIcon width={14} height={14} aria-hidden="true" />
        </a>
      </footer>
    </figure>
  );
}
