# Room for Two

A cozy shared 3D room for two people: decorate it together, raise a pet from an egg, and leave each other notes. Built as one self-contained mobile web page (`index.html`) with no build step or dependencies.

## Hosting

The site is served with GitHub Pages at https://garrettgivre.github.io/Room-For-Two/ and redeployed on every push by `.github/workflows/pages.yml`.

One-time setup: in the repo's **Settings → Pages**, set **Source** to **GitHub Actions**.

## Saving

Outside Claude, the room saves to the browser's local storage ("Solo on this device"). The live two-person sync used Claude's artifact database, so it only works in the Claude-hosted version.
