export default function Footer() {
  return (
    <footer className='footer__wrapper'>
      <div className='footer'>
        <div className='footer__content link-underline'>
          <div className='footer__left'>
            <h3>Bolaji Olajide</h3>
            <p>Full-stack Engineer & Music Producer</p>
          </div>
          <div className='footer__right'>
            <div>
              <h4>Engineering </h4>
              <a target='_blank' href='https://github.com/BolajiOlajide'>
                GitHub
              </a>
              <a target='_blank' href=''>
                Resumé
              </a>
              <a
                target='_blank'
                href='https://www.linkedin.com/in/bolaji-olajide-95b08777/'
              >
                LinkedIn
              </a>
            </div>
            <div>
              <h4>Music</h4>
              <a target='_blank' href=''>
                SoundCloud
              </a>
              <a target='_blank' href=''>
                Spotify
              </a>
            </div>
          </div>
        </div>
        <div className='footer__license'>© {new Date().getFullYear()}</div>
      </div>
    </footer>
  );
}
