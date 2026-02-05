# App3 — YouTube Playlist Builder (React + YouTube Data API)

A small React application that lets you search YouTube and build a playlist using the YouTube Data API. Built with Vite + React.

## Features
- Search YouTube videos by keyword
- Add/remove videos to a local playlist
- Persist playlist in localStorage
- Simple responsive UI using React

## Snap-shot
<img width="1710" height="1073" alt="Image" src="https://github.com/user-attachments/assets/88fb0b79-91bf-49ae-97d1-c55c1c3da48a" />

## Prerequisites
- Node.js (16+ recommended)
- npm or yarn
- A YouTube Data API key (v3)

## Environment
This project is built with Vite. Store your API key in an environment variable named `VITE_YOUTUBE_API_KEY`.

Create a `.env` file in the project root (app3) with:

VITE_YOUTUBE_API_KEY=your_api_key_here

Note: Vite exposes variables prefixed with `VITE_` to the client. Keep your API key restricted (HTTP referrers or server-side proxy recommended for production).

## Install

Install dependencies:

```bash
cd app3
npm install
# or
yarn
```

## Run (development)

```bash
npm run dev
# or
yarn dev
```

Open the app in the URL printed by Vite (usually http://localhost:5173).

## Build

```bash
npm run build
# or
yarn build
```

Preview production build locally:

```bash
npm run preview
# or
yarn preview
```

## Usage
- Enter a search term in the search box to fetch videos from the YouTube Data API.
- Click "Add" on a video to include it in your local playlist.
- Reorder or remove items from the playlist as needed (if implemented).

## Implementation notes
- API: uses `search.list` (YouTube Data API v3) to fetch videos. Ensure you follow quota limits.
- For production, consider using a small server-side proxy to keep the API key secret and handle quota/billing securely.

## Folder structure

- `src/` — React source files
- `public/` — Static assets and `index.html`

## Troubleshooting
- If API requests fail with CORS or 403 errors, check that your API key is valid and the key's restrictions (HTTP referrers) are configured correctly.
- If you hit quota limits, enable billing or use a server-side proxy.

## Next steps (suggested)
- Add server-side endpoint to keep the API key secret
- Add playlist export/import
- Add OAuth flow for authenticated YouTube playlist creation

## License
MIT

