<h1 align="center">Welcome to Reelwatch 👋</h1>
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

> Welcome to Reelwatch, a web app where users can search for their favorite movies and add them to their personal watchlist. Built with Next.js, TypeScript, Tailwind CSS, and Appwrite Cloud, this app offers a seamless and engaging experience for movie enthusiasts.


## Features
- **Movie Search**: Easily search for movies using the TMDB API.
- **Personal Watchlist**: Add movies to a personalized watchlist.
- **Responsive Design**: Enjoy a seamless experience on any device.
- **User Authentication**: Securely log in and manage your watchlist.

### 🏠 [Homepage](https://reelwatch.vercel.app/)

## Getting Started

### Prerequisites

- npm >=5.5.0
- node >=12.0.0 (Recommended: Latest LTS Version)
- yarn >= 3.6.0
- an account to [appwrite.io](https://appwrite.io/)

### Installation

1. **Clone the repository:**

This project is built with Next.js, TypeScript, tailwind & appwrite cloud among
others. To start working on the project, first clone the repository on your
local machine and install the dependencies.

```bash
   git clone https://github.com/timDeHof/movie-nextjs-app.git
   cd movie-nextjs-app
```
2. **Install dependencies:
```bash
npm install
# or
yarn
```

### 2. Create .env File

**copy the `.env.local.template` file to a new file called `.env.local`.** This
file contains the required environment variables that are injected by Next.js
via the `dotenv` package.

```bash
NEXT_PUBLIC_APPWRITE_ENDPOINT="[APPWRITE_ENDPOINT]"
NEXT_PUBLIC_APPWRITE_PROJECT_ID="[APPWRITE_PROJECT_ID]"
NEXT_PUBLIC_APPWRITE_SERVER_API_KEY="[APPWRITE_SERVER_API_KEY]"
NEXT_PUBLIC_APPWRITE_DATABASE_ID="[APPWRITE_DATABASE_ID]"
NEXT_PUBLIC_APPWRITE_COLLECTION_ID="[APPWRITE_COLLECTION_ID]"
NEXT_PUBLIC_TMDB_MOVIE_KEY="[TMDB_MOVIE_KEY]"
```

### 3. Run Development Server

Finally, run the development server:

```bash
npm run dev
# or
yarn dev
```

Now you can open [http://localhost:3000](http://localhost:3000) with your
browser to see the application.

## Testing
To run the test suite, use the following command:
```bash
npm test
# or
yarn test
```
## Contributing

We welcome contributions to Reelwatch! Please read our Contributing Guide for details on our code of conduct and the process for submitting pull requests.

## Support
Give a ⭐️ if this project helped you! For support, feel free to open an issue here.

## Author

👤 **Tim DeHof**

- Website: https://www.timdehof.dev/
- Github: [@timDeHof](https://github.com/timDeHof)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check
[issues page](https://github.com/timDeHof/movie-nextjs-app/issues). You can also
take a look at the
[contributing guide](https://github.com/timDeHof/movie-nextjs-app/blob/master/CONTRIBUTING.md).

## Show your support

Give a ⭐️ if this project helped you!

## 📝 License

Copyright © 2023 [Tim DeHof](https://github.com/timDeHof).<br /> This project is
[MIT](https://github.com/timDeHof/movie-nextjs-app/blob/main/LICENSE) licensed.

---

_This README was generated with ❤️ by
[readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
