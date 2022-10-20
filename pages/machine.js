/* eslint-disable @next/next/no-img-element */
/* @Services */
import { createMachine, assign } from 'xstate';

/* @Components */
import { Button } from '@macpaw/macpaw-ui';

/* @Hooks */
import { useMachine } from '@xstate/react';

const wallpaperFetcherMachine = createMachine({
  initial: 'idle',
  context: {
    error: null,
    wallpaper: null,
  },
  states: {
    idle: {
      on: {
        LOAD_WALLPAPER: {
          target: 'loading',
        },
      },
    },
    loading: {
      invoke: {
        src: 'getWallpaper',
        onDone: {
          target: 'loaded',
          actions: ['setWallpaper'],
        },
        onError: {
          target: 'failed',
          actions: ['setError'],
        },
      },
      on: {
        CANCEL: {
          target: 'idle',
        },
      },
    },
    loaded: {
      on: {
        LOAD_WALLPAPER: {
          target: 'loading',
        },
      },
    },
    failed: {
      on: {
        LOAD_WALLPAPER: {
          target: 'loading',
        },
      },
    },
  },
});

export default function Machine() {
  const [state, send] = useMachine(wallpaperFetcherMachine, {
    actions: {
      setWallpaper: assign((_, event) => ({
        wallpaper: event.data.wallpaper,
        error: null,
      })),
      setError: assign((_, event) => ({
        error: event.data.error,
        wallpaper: null,
      })),
    },
    services: {
      getWallpaper() {
        return fetch('/api/wallpaper')
          .then((resp) => resp.json())
          .then((response) => {
            if (response.error) {
              throw response;
            }
            return response;
          });
      },
    },
  });

  function handleLoadImages() {
    send({ type: 'LOAD_WALLPAPER' });
  }

  function handleCancelFetching() {
    send({ type: 'CANCEL' });
  }

  return (
    <section className="pt-20 text-center">
      {state.matches('idle') ? (
        <article>
          <h3>Click button ⬇️ below for load your new wallpaper 🌄</h3>
          <p>
            <Button onClick={handleLoadImages}>Get it 🌈</Button>
          </p>
        </article>
      ) : null}
      {state.matches('loading') ? (
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
      {state.matches('loaded') ? (
        <article>
          <h3 className="mb-4">The wallpaper that best match for you is ready ☀️</h3>
          <figure className="mb-8">
            <img
              src={state.context.wallpaper}
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
      {state.matches('failed') ? (
        <article>
          <h3 className="mb-4">Looks like you have specific request 🤔</h3>
          <p className="mb-8">
            Our service said, that:{' '}
            <span className="rounded p-1 bg-red-200">`{state.context.error}`</span>
          </p>
          <p className="mb-8 text-4xl leading-none space-x-4">
            {['🤖', '🌀', '🤖', '🌀', '🤖', '🌀', '🤖'].map((item, index) => (
              <span
                className={`${index % 2 !== 0 ? 'animate-spin' : 'animate-bounce'}  inline-block`}
                key={item + index}
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

// {
//   initial: 'idle',
//   context: {
//     error: null,
//     wallpaper: null,
//   },
//   states: {
//     idle: {
//       on: {
//         LOAD_WALLPAPER: {
//           target: 'loading',
//         },
//       },
//     },
//     loading: {
//       invoke: {
//         src: 'getWallpaper',
//         onDone: {
//           target: 'loaded',
//           actions: ['setWallpaper'],
//         },
//         onError: {
//           target: 'failed',
//           actions: ['setError'],
//         },
//       },
//       on: {
//         CANCEL: {
//           target: 'idle',
//         },
//       },
//     },
//     loaded: {
//       on: {
//         LOAD_WALLPAPER: {
//           target: 'loading',
//         },
//       },
//     },
//     failed: {
//       on: {
//         LOAD_WALLPAPER: {
//           target: 'loading',
//         },
//       },
//     },
//   },
// }
