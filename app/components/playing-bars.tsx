const BARS = [
  { x: 8.5, y1: "2;0;2", y2: "5;7;5", dur: ".8s" },
  { x: 6.5, y1: "0;2;0", y2: "7;5;7", dur: ".5s" },
  { x: 4.5, y1: "1;3;1", y2: "6;4;6", dur: ".6s" },
  { x: 2.5, y1: "2;1;2", y2: "5;6;5", dur: ".7s" },
  { x: 0.5, y1: "3;0;3", y2: "4;7;4", dur: ".9s" },
];

// Animated equaliser bars shown while audio is live.
export default function PlayingBars({ size = 14, className }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 10 8" aria-hidden="true" className={className}>
      <g transform="translate(0, 0.5)" stroke="currentColor" strokeWidth="1" strokeLinecap="round">
        {BARS.map((b) => (
          <line key={b.x} x1={b.x} x2={b.x} y1="1" y2="6">
            <animate attributeName="y1" values={b.y1} keyTimes="0;0.5;1" dur={b.dur} repeatCount="indefinite" />
            <animate attributeName="y2" values={b.y2} keyTimes="0;0.5;1" dur={b.dur} repeatCount="indefinite" />
          </line>
        ))}
      </g>
    </svg>
  );
}
