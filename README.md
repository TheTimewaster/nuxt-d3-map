# Nuxt 3 D3 Map Demo

Demo here: https://stackblitz.com/edit/nuxt-d3-map

This is a demo of integrating a D3 map in Nuxt 3 with locations, current geo location and connecting locations with current location via line. The map is completely Client-Only due the complex nature of D3. In a real world scenario, rendering D3 content should only be limited to client only, ideally combining Nuxt [delayed or lazy hydration features](https://nuxt.com/docs/4.x/directory-structure/app/components#delayed-or-lazy-hydration).

## Setup

Make sure to install the dependencies:

```bash
# yarn
yarn install

# npm
npm install

# pnpm
pnpm install
```

## Development Server

Start the development server on http://localhost:3000

```bash
yarn run dev
```

## Production

Build the application for production:

```bash
yarn run build
```

Locally preview production build:

```bash
yarn run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
