# Best tic-tac-toe with multiplayer

The "Best tic-tac-toe" project is an interactive web game that combines three exciting game modes for a diverse gaming experience.

![best tic-tac-toe banner](/assets/Banner.png)

1. **Online Mode:** Play Tic-Tac-Toe in real-time with opponents from around the world. Create or join games, interact with other players, and test your skills in battles over the internet.
2. **Bot Mode:** The artificial intelligence, based on the miniMax algorithm, provides an intelligent and challenging opponent for single-player mode. The bot adapts to the player's style and offers high-level difficulty strategies.
3. **Two-Player Mode:** Allows playing Tic-Tac-Toe with a friend or family member. Optimized for interactive interaction between two players, creating a competitive and engaging gaming space.

## Installation and local launch

1. Clone this repo: `git clone https://github.com/rozhkoy/best-tic-tac-toe.git`
2. Run `npm ci` in the client root folder
3. Fill all the fields in `.env` using your firebase data and etc.
4. Run `npm run dev`  in the client root folder
5. Run `npm ci` in the server root folder
6. Fill all the fields in `.env` using your firebase data and etc.
7. Run `npm run dev` in the server root folder

### .env tamplates

#### .env template for client

```
VITE_API_KEY=
VITE_AUTH_DOMAIN=
VITE_PROJECT_ID=
VITE_STORAGE_BUCKET=
VITE_MESSAGING_SENDER_ID=
VITE_APP_ID=
VITE_MEASUREMENT_ID=
VITE_BASE_URL=
VITE_WS_URL=
```

#### .env template for server

```
PORT=8888
DB_NAME=
DB_USER=
DB_PASSWORD=
DB_HOST=
DB_PORT=
TYPE=
PROJECT_ID=
PRIVATE_KEY_ID=
PRIVATE_KEY=
CLIENT_EMAIL=
CLIENT_ID=
AUTH_URI=
TOKEN_URI=
AUTH_PROVIDER_X509_CERT_URL=
CLIENT_X509_CERT_URL=
UNIVERSE_DOMAIN=
CORS_URL=
```

## [](https://github.com/rozhkoy/best-tic-tac-toe/blob/develop/LICENSE)License

MIT — use for any purpose. Would be great if you could leave a note about the original developers. Thanks!
