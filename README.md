# Room for Two

A cozy shared 3D room for two people: decorate it together, raise a pet from an egg, and leave each other notes. Built as one self-contained mobile web page (`index.html`) with no build step or dependencies.

## Hosting

The site is served with GitHub Pages at https://garrettgivre.github.io/Room-For-Two/ and redeployed on every push by `.github/workflows/pages.yml`.

One-time setup: in the repo's **Settings → Pages**, set **Source** to **GitHub Actions**.

## Shared rooms

Two people see each other's changes through a free Firebase Firestore database. Until `firebase-config.js` has a config, the room saves only to each browser ("Solo on this device").

- Each device gets its own private room code. **Room → Share invite link** sends a `?room=` link that puts the other person in the same room.
- `firestore.rules` holds the database rules: rooms are readable and writable by anyone who knows the code, and nothing else in the database can be read or written.
- The Firebase web SDK is included in `vendor/` (v10.14.1 compat build), so the page loads no outside scripts.
