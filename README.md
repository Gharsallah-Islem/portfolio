# Windows 11 Portfolio — Islem Gharsallah

A pixel-perfect Windows 11 desktop clone built as an interactive portfolio.

![React 18](https://img.shields.io/badge/React-18-61dafb) ![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178c6) ![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8)

## ✨ Features

- **🖥️ Authentic Windows 11 Desktop** — Wallpaper, icon selection, right-click context menu
- **📌 Centered Taskbar** — Fluent icons, active indicators, system tray with live clock
- **🚀 Animated Start Menu** — GSAP-powered, pinned apps, recommended items
- **🪟 Window Management** — Draggable, minimize/maximize/close, focus Z-index
- **🎨 Glassmorphism Design** — Blur effects and Win11 color tokens

## 📱 Interactive Apps

| App | Style | Content |
|-----|-------|---------|
| **About Me** | File Explorer | Bio, education, certifications, languages |
| **Projects** | Gallery | Hyperion AI, AutoParts, AI Trading, UpToHire |
| **Experience** | VS Code | OACA & ONAS internships |
| **Skills** | Settings | Full tech stack with progress bars |
| **Contact** | Outlook Mail | Working email form → islemgharsallah86@gmail.com |
| **Resume** | PDF Viewer | Full CV with download |
| **Terminal** | PowerShell | Interactive CLI with commands |

## 🚀 Quick Start

```bash
npm install
npm run dev
# Open http://localhost:5173/portfolio/
```

## 🌐 Deploy to GitHub Pages

1. Push to `main` branch
2. Add GitHub Actions workflow (see below)
3. Set Pages source to `gh-pages` branch

<details>
<summary>GitHub Actions Workflow</summary>

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```
</details>

## 🛠️ Tech Stack

React 18 • TypeScript • Vite • Tailwind CSS • GSAP • Zustand • react-draggable

## 👨‍💻 Author

**Islem Gharsallah** — Full Stack Developer | AI Enthusiast

📧 islemgharsallah86@gmail.com  
📱 +216 26 598 197  
🔗 [LinkedIn](https://linkedin.com/in/islem-gharsallah) • [GitHub](https://github.com/Gharsallah-Islem)
