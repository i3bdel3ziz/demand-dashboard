# Demand Dashboard

A CxO-level Demand Realtime Dashboard built with React + Recharts.

---

## 🚀 Deploy to GitHub Pages

### Step 1 — Create a GitHub repository

1. Go to [github.com/new](https://github.com/new)
2. Name it `demand-dashboard` (or any name you like)
3. Leave it public, click **Create repository**

### Step 2 — Update the repo name in vite.config.js

Open `vite.config.js` and change the `base` value to match your repo name:

```js
base: '/your-repo-name/',
```

### Step 3 — Install dependencies

Make sure you have Node.js installed, then run:

```bash
npm install
```

### Step 4 — Test locally (optional)

```bash
npm run dev
```

Open http://localhost:5173 in your browser.

### Step 5 — Push to GitHub

```bash
git init
git add .
git commit -m "initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/demand-dashboard.git
git push -u origin main
```

### Step 6 — Deploy

```bash
npm run deploy
```

This builds the app and pushes it to a `gh-pages` branch automatically.

### Step 7 — Enable GitHub Pages

1. Go to your repo on GitHub
2. Click **Settings** → **Pages**
3. Under **Source**, select branch: `gh-pages`, folder: `/ (root)`
4. Click **Save**

Your dashboard will be live at:

```
https://YOUR_USERNAME.github.io/demand-dashboard/
```

---

## 🛠 Local Development

| Command | Description |
|---|---|
| `npm run dev` | Start local dev server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |
| `npm run deploy` | Build + deploy to GitHub Pages |

---

## 📦 Tech Stack

- [React 18](https://react.dev)
- [Recharts](https://recharts.org)
- [Vite](https://vitejs.dev)
- [gh-pages](https://github.com/tschaub/gh-pages)
