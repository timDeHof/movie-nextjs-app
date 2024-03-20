<h1 align="center">Welcome to Reelwatch 🎬</h1>
<p align="center">
  <img alt="Version" src="https://img.shields.io/badge/version-0.1.0-blue.svg?cacheSeconds=2592000" />
  <img src="https://img.shields.io/badge/npm-%3E%3D5.5.0-blue.svg" />
  <img src="https://img.shields.io/badge/node-%3E%3D9.3.0-blue.svg" />
  <img src="https://img.shields.io/badge/yarn-%3E%3D3.6.0-blue.svg" />
  <a href="https://github.com/timDeHof/movie-nextjs-app#readme" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <a href="https://github.com/timDeHof/movie-nextjs-app/graphs/commit-activity" target="_blank">
    <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" />
  </a>
  <a href="https://github.com/timDeHof/movie-nextjs-app/blob/main/LICENSE" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/github/license/timDeHof/movie-nextjs-app" />
  </a>
</p>

**Reelwatch** is where your movie watchlist dreams come to life! Built with love using Next.js, TypeScript, Tailwind CSS, and powered by Appwrite Cloud, we're here to bring you an enthralling experience tailored for movie buffs. Dive into a world where your favorite films are just a search away and creating a personal watchlist is easier than ever.


## 🌟 Features

- **Endless Movie Search**: Powered by the TMDB API, find your next movie gem in a snap.
- **Your Watchlist**: Curate a personal list of must-watch movies.
- **Flawless on Any Screen**: Designed to look and work perfectly on any device.
- **Secure User Experience**: Log in confidently with top-notch security.

  
![Homepage](https://cdn.hashnode.com/res/hashnode/image/upload/v1686532494367/d09e48f2-4028-4ca9-849d-89e00edfa175.gif)

### 🏠 [Embark on Your Movie Journey](https://reelwatch.vercel.app/)

## 🚀 Getting Started

### Prerequisites

- npm >=5.5.0
- node >=12.0.0 (Recommended: Use the Latest LTS Version)
- yarn >= 3.6.0
- An account on [Appwrite.io](https://appwrite.io/) for backend services

### 🛠 Installation

1. **Clone the project to get started**:
   Get the code on your local machine and install its dependencies.
    ```bash
    git clone https://github.com/timDeHof/movie-nextjs-app.git
    cd movie-nextjs-app
    ```
2. **Install dependencies**:
    ```bash
    npm install
    # or if you use yarn
    yarn
    ```

3. **Set up your environment**:
    Duplicate `.env.local.template` to `.env.local` and fill it with your keys.
   ```bash
   NEXT_PUBLIC_APPWRITE_ENDPOINT="[APPWRITE_ENDPOINT]"
   NEXT_PUBLIC_APPWRITE_PROJECT_ID="[APPWRITE_PROJECT_ID]"
   NEXT_PUBLIC_APPWRITE_SERVER_API_KEY="[APPWRITE_SERVER_API_KEY]"
   NEXT_PUBLIC_APPWRITE_DATABASE_ID="[APPWRITE_DATABASE_ID]"
   NEXT_PUBLIC_APPWRITE_COLLECTION_ID="[APPWRITE_COLLECTION_ID]"
   NEXT_PUBLIC_TMDB_MOVIE_KEY="[TMDB_MOVIE_KEY]"
   ```
4. **Fire up the development server**:
    Launch the app and explore it on your local machine.
    ```bash
    npm run dev
    # or with yarn
    yarn dev
    ```

Visit [http://localhost:3000](http://localhost:3000) to see your application running.

## 🧪 Testing

Run the test suite to ensure everything is set up correctly:

```bash
npm test
# or
yarn test
```

## 💡 Contributing

Got ideas on how to make Reelwatch even better? We're all ears! Check out our
[contributing guide](https://github.com/timDeHof/movie-nextjs-app/blob/master/CONTRIBUTING.md) for more info on submitting pull requests.

## ✨ Show your support

Loved Reelwatch? Give it a ⭐️! If you need help or want to suggest features, feel free to open an issue on the
[issues page](https://github.com/timDeHof/movie-nextjs-app/issues)

## 🙌 Meet the Creator

👤 **Tim DeHof**

- Website: https://www.timdehof.dev/
- Github: [@timDeHof](https://github.com/timDeHof)

## 📝 License

Copyright © 2023 [Tim DeHof](https://github.com/timDeHof).<br /> This project is
[MIT](https://github.com/timDeHof/movie-nextjs-app/blob/main/LICENSE) licensed.

---

_This README was generated with ❤️ by
[readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
