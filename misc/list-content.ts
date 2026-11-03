import fs from 'fs';
import path from 'path';

// Reads the grouped link lists in app/uses/content.mdx and app/recognitions/content.mdx.
// The MDX stays the source of truth; this turns its "## Group / ### Subgroup /
// - **[name](href)** — note, date" shape into data for ListGroup.

export type ListItem = { name: string; href: string; note?: string; meta?: string };
export type ListGroupData = { title: string; parent?: string; items: ListItem[] };
export type ListContent = { intro: string[]; groups: ListGroupData[]; outro: string[] };

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

// Matches a trailing date: "2nd February, 2026", "15th August, 2025" or just "2025".
const DATE = new RegExp(`(?:(?:\\d{1,2}(?:st|nd|rd|th)\\s+)?(${MONTHS.join('|')}),?\\s+)?(\\d{4})$`);

const stripEmphasis = (s: string) => s.replace(/\*\*?([^*]+)\*\*?/g, '$1').trim();

function parseItem(line: string): ListItem | null {
  const m = /^-\s+\*\*\[(.+?)\]\((.+?)\)\*\*\s*(.*)$/.exec(line);
  if (!m) return null;
  const [, name, href, raw] = m;

  // Drop the separator between the name and its note ("—", "-").
  let rest = raw.replace(/^[—–-]\s*/, '').trim();
  let meta: string | undefined;

  const date = DATE.exec(rest);
  if (date) {
    const [match, month, year] = date;
    meta = month ? `${month.slice(0, 3)} ${year}` : year;
    rest = rest.slice(0, rest.length - match.length).replace(/[\s,—–-]+$/, '');
  }

  const note = stripEmphasis(rest).replace(/\s+-\s+/g, ' — ');
  return { name: name.replace(/\s+-\s+/g, ' — '), href, note: note || undefined, meta };
}

export function getListContent(...segments: string[]): ListContent {
  const file = fs.readFileSync(path.join(process.cwd(), ...segments), 'utf-8');
  const intro: string[] = [];
  const outro: string[] = [];
  const groups: ListGroupData[] = [];
  let h2: string | undefined;
  let current: ListGroupData | undefined;

  for (const raw of file.split('\n')) {
    const line = raw.trim();
    if (!line || line === '---') continue;

    if (line.startsWith('### ')) {
      current = { title: line.slice(4).trim(), parent: h2, items: [] };
      groups.push(current);
    } else if (line.startsWith('## ')) {
      h2 = line.slice(3).trim();
      current = { title: h2, items: [] };
      groups.push(current);
    } else if (line.startsWith('- ')) {
      const item = parseItem(line);
      if (item && current) current.items.push(item);
    } else {
      (groups.length ? outro : intro).push(stripEmphasis(line));
    }
  }

  // An h2 used only as a heading for h3 subgroups carries no items of its own.
  return { intro, outro, groups: groups.filter((g) => g.items.length > 0) };
}
