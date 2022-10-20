/* eslint-disable @next/next/no-img-element */
/* @Components */
import { Button } from '@macpaw/macpaw-ui';

/* @Hooks */
import { useState } from 'react';

export default function Home() {
  const [wallpaper, setWallpaper] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isCanceled, setIsCanceled] = useState(false);

  function handleLoadImages() {
    setIsLoading(true);
    setError(null);
    setIsCanceled(false);
    setWallpaper(null);

    fetch('/api/wallpaper')
      .then((resp) => resp.json())
      .then((response) => {
        if (isCanceled) {
          return;
        }

        if (response.error) {
          throw response;
        }

        setWallpaper(response.wallpaper);
        setIsLoading(false);
      })
      .catch((response) => {
        if (isCanceled) {
          return;
        }

        setError(response.error);
        setIsLoading(false);
      });
  }

  function handleCancelFetching() {
    setIsLoading(false);
    setIsCanceled(true);
  }

  const isInitialState = !isLoading && !error & !wallpaper;
  const isLoadingState = isLoading;
  const isWallpaperState = !isLoading && wallpaper;
  const isError = !isLoading && error;

  return (
    <section className="pt-20 text-center">
      {isInitialState ? (
        <article>
          <h3>Click button ⬇️ below for load your new wallpaper 🌄</h3>
          <p>
            <Button onClick={handleLoadImages}>Get it 🌈</Button>
          </p>
        </article>
      ) : null}
      {isLoadingState ? (
        <article>
          <h3>
            <span className="animate-spin inline-block">🌀</span> Wallpaper is loading...
          </h3>
          <footer className="space-y-2">
            <p>Do not want to wait? Just click ⬇️ button to stop it</p>
            <p>
              <Button onClick={handleCancelFetching}>Stop Loading</Button>
            </p>
          </footer>
        </article>
      ) : null}
      {isWallpaperState ? (
        <article>
          <h3 className="mb-4">The wallpaper that best match for you is ready ☀️</h3>
          <figure className="mb-8">
            <img
              src={wallpaper}
              alt=""
              className="aspect-video object-cover border-[16px] border-black"
            />
          </figure>
          <footer className="space-y-2">
            <p>Do you want new 🌄? Just click</p>
            <p>
              <Button onClick={handleLoadImages}>Get it 🌈</Button>
            </p>
          </footer>
        </article>
      ) : null}
      {isError ? (
        <article>
          <h3 className="mb-4">Looks like you have specific request 🤔</h3>
          <p className="mb-8">
            Our service said, that: <span className="rounded p-1 bg-red-200">`{error}`</span>
          </p>
          <p className="mb-8 text-4xl leading-none space-x-4">
            {['🤖', '🌀', '🤖', '🌀', '🤖', '🌀', '🤖'].map((item, index) => (
              <span
                className={`${index % 2 !== 0 ? 'animate-spin' : 'animate-bounce'}  inline-block`}
                key={item}
              >
                {item}
              </span>
            ))}
          </p>
          <footer className="space-y-2">
            <p>Do you want to try again 🌄? Just click</p>
            <p>
              <Button onClick={handleLoadImages}>Get it 🌈</Button>
            </p>
          </footer>
        </article>
      ) : null}
    </section>
  );
}
