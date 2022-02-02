# Hydra bridge ui app

This is hydra bridge frontend app that uses hydra-bridge-backend api as source of data and hydra bridge smart contract to approve token spending.

## Current state of app

This is POC/beta version with basic functionalities for bridging.
Features that are covered:

- Connecting metamask wallet
- Approving hydra bridge smart contract to use tokens
- Showing available routes through hop and polygon bridges
- Bridging founds L1-L2 from ethereum mainnet to polygon, arbitrum, optimism and from goerli testnet to polygon mumbai testnet

## Setup

Install NodeJS and Yarn node version 16.13.2.

## Environment Variables

Copy `env.example` in `.env` and populate missing variables.
`REACT_APP_API_URL` is api that project uses, if you use localhost use `http://localhost:3001/api` to get backend api, if not put here dev environment api
`REACT_APP_ETH_INFURA_ID` got to https://infura.io/ and setup project, put here project ID
`REACT_APP_NETWORK_ID` here use 1 for mainnet and 5 for goerli testnet, witch are official ids of those networks, long term this will be removed and moved to some other config
`REACT_APP_HYDRA_BRIDGE_CONTRACT` this is smart contract address for current network app is running, ask main dev to provide addreses, long term this will be removed and moved to some other config

## Folder Structure

### /

Root folder contains:

- `.env.example` which is file example of `.env` file
- `.gitignore` contains all files and folders to ignore
- `.nvmrc` file that contains nvm version of node that's used in project
- `package.json` npm configuration file
- `tsconfig.json` file that configures typescript for project
- `window.d.ts` typescript definitions for window object
- `yarn.lock` file is main source of information about the current versions of dependencies in project

### /public

- `index.html` app entry point
- `manifest.json` is a simple JSON file in our website that tells the browser about your website on user's mobile device or desktop.
- `robots.txt` tells search engine crawlers which URLs the crawler can access on our site

### /src

- `App.tsx` that's component that contains main routes of app
- `index.css` that's basic css file for app entry point `index.tsx`
- `index.tsx` it's app entry point
- `react-app-env.d.ts` typescipt definition for react-scripts
- `reportWebVitals.ts` web vitals performance function
- `routes.ts` file that contains app routes
- `setupTests.ts` file where tests can be written

### /src/api

- folder contains helpers for calling backend services

### /src/assets

- folder contains all app assets

### /src/common

- folder contains common components and files that can be reused

### /src/helpers/

- folder that contains all helpers that app uses like `fetchWrapper.ts`, `requestHelper.ts` etc.

### /src/modules/

- folder that contains app modules like `Home` and `Page404`

### /src/shell/

- folder that contains `theme` folder, `Fallback.tsx` file and `Shell.tsx` where all routes are initialised and child components are passed to `Layout` component along with `Suspense` component for fallback
