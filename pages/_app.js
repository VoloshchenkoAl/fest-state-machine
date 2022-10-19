/* @Styles */
import '../styles/base.css';
import '@macpaw/macpaw-ui/lib/ui.css';
import '../styles/globals.css';

/* @Components */
import Link from 'next/link'

/* @Hooks */
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }) {
  const { pathname } = useRouter();
  const version = pathname === '/' ? 'common' : 'state machine';
  const oppositeVersion = pathname === '/' ? 'state machine' : 'common';
  const oppositePath = pathname === '/' ? '/machine' : '/';

  return (
    <div className="max-w-4xl mx-auto px-4 flex flex-col justify-between min-h-screen">
      <header className="flex justify-between py-4 items-center">
        <p className='flex flex-col'>
          <strong className="text-xl leading-none">Unsplash photos fetcher</strong>
          <span>{version} version</span>
        </p>
        <Link href={oppositePath}><a>to {oppositeVersion} version ➡️</a></Link>
      </header>
      <main className='flex-1'>
        <Component {...pageProps} />
      </main>
      <footer className='text-sm py-4 text-center'>Made with ❤️ for FEST</footer>
    </div>
  );
}

export default MyApp;
