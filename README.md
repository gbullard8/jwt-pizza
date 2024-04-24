# NFT Pizza

A non-fungible token (NFT) is a unique digital identifier that is backed by a digital signature and recorded on a blockchain. This guarantees its ownership and authenticity.

`NFT Pizza` takes the next stage of blockchain evolution by allowing you to buy pizzas that you can never actually eat. Not only does NFT exchange bitcoin and give you nothing in return, it also allows for you to be come a franchisee and turn the whole vapor company into an MLM.

## Running locally

1. Clone this repository
   ```sh
   git clone https://github.com/devops329/nft-pizza.git
   ```
2. Install the dependencies
   ```sh
   npm install
   ```
3. Run vite
   ```sh
   npm run dev
   ```

## Development notes

NFT Pizza uses Vite, React, and Tailwind.

### Vite

Create the basic Vite app.

```sh
npm init -y
npm install vite@latest -D
```

Modify `package.json`

```json
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
```

### React

React works out of the box with Vite, but we do need to install the desired React packages. The `index.html` file loads `index.jsx` which then loads the app component (`src/app.jsx`).

```sh
npm install react react-dom react-router-dom
```

### Tailwind

To process the Tailwind css we are going to use `postcss` and `autoprefixer`.

```sh
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init
```

Modify `tailwind.config.js`

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['index.html', './src/**/*.{html,js,jsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

Create a `main.css` and add the basic Tailwind directives.

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Modify `index.html` to include tailwind output.css.

```html
<head>
  ...
  <link href="./main.css" rel="stylesheet" />
</head>
```

Now when you run with `npm run dev` the css will automatically be generated.

## Preline

Added the Tailwind [Preline component library](https://preline.co/) so that I can use all of their nifty nav, slideshow, containers, and cards.

```sh
npm i preline
```

Updated the tailwind config to use preline.

```js
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['index.html', './src/**/*.{html,js,jsx}', './node_modules/preline/preline.js'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [require('preline/plugin')],
};
```

Import preline into app.jsx.

```js
import 'preline/preline';
```

Initialize components whenever the page location changes.

```js
import { useLocation, Routes, Route, NavLink } from 'react-router-dom';

export default function App() {
  const location = useLocation();

  useEffect(() => {
    window.HSStaticMethods.autoInit();
  }, [location.pathname]);
  //...
```

## Icons

[HeroIcons](https://heroicons.com/) - MIT license
