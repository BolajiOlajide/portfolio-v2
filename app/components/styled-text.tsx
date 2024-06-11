'use client';

import { useAnimate } from 'framer-motion';

type Props = {
  text: string;
  href?: string;
  className?: string;
};

const StyledText = ({ text, href, className }: Props) => {
  const [scope, animate] = useAnimate();

  const TAG = href ? 'a' : 'div';

  const hoverEffect = () => {
    animate([
      [
        '.styled-text__char',
        { y: -16 },
        { duration: 0.5, type: 'tween', ease: [0.76, 0, 0.24, 1] },
      ],
      ['.styled-text__char', { y: 0 }, { duration: 0.000001 }],
    ]);
  };

  return (
    <TAG
      ref={scope}
      className={'styled-text ' + className}
      onMouseEnter={() => hoverEffect()}
      {...(href && { href })}
      {...(href && { target: '_blank' })}
    >
      <span className='sr-only'>{text}</span>
      <span className='styled-text__word' data-letter={text} aria-hidden='true'>
        <span data-letter={text} className='styled-text__char'>
          {text}
        </span>
      </span>
    </TAG>
  );
};

export default StyledText;
