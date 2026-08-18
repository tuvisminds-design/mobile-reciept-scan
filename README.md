# Madhwaraj Kulkarni — Portfolio

Business Analyst portfolio website showcasing experience in AI automation, workflow analysis, product thinking, and BA case studies.

**Target live URL:** [tuvisminds-design.github.io/madhwaraj-portfolio](https://tuvisminds-design.github.io/madhwaraj-portfolio/)

## Deploy to madhwaraj-portfolio repo

This code lives on branch `cursor/portfolio-bb45`. To push to the portfolio repo:

```bash
git clone https://github.com/tuvisminds-design/madhwaraj-portfolio.git
cd madhwaraj-portfolio
git pull https://github.com/tuvisminds-design/mobile-reciept-scan.git cursor/portfolio-bb45
git push origin main
```

Then enable GitHub Pages: Settings → Pages → Source: GitHub Actions.

## Stack

- React + TypeScript + Vite
- Tailwind CSS
- GitHub Pages (auto-deploy on push to `main`)

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Portfolio Assets

Case study documents are hosted on [Google Drive](https://drive.google.com/drive/folders/1XtlCmWl_YmXhqNf6ZkKpoZXRm5OqUls9).

## Profile Photo

Add your headshot at `public/profile.jpg` and it will appear automatically in the
hero. Until that file exists, the hero gracefully falls back to an `MK` monogram —
no code changes required. For best results use a square image (e.g. 600×600).
