import { USES } from 'misc/data';

import { CustomMDX } from 'app/components/mdx';

export const metadata = {
  title: 'Uses',
  description: 'Things that I use for my day to day work and activities.',
};

export default function Uses() {
  return (
    <section className='blog-post__container'>
      <header className='blog-post__header'>
        <h1 className='blog-post__title'>Uses</h1>

        <hr className='blog-post__divider' />
      </header>
      <article className='blog-post'>
        <CustomMDX source={USES} />
      </article>
    </section>
  );
}
