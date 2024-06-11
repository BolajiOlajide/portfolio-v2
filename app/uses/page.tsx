import { USES } from 'misc/data';

import { CustomMDX } from 'app/components/mdx';

export const metadata = {
  title: 'Uses',
  description: 'Things that I use for my day to day work and activities.',
};

export default function Uses() {
  return (
    <section className='page__container'>
      <header className='page__header'>
        <h1>Uses</h1>

        <hr className='page__divider' />
      </header>
      <article className='blog-post'>
        <CustomMDX source={USES} />
      </article>
    </section>
  );
}
