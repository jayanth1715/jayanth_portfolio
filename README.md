# Jayanth S — Interactive Engineering Portfolio

An editorial, interactive portfolio website inspired by high-end design engineering portfolios (e.g. [portfolio-beta-gray-9ei2am6d1z.vercel.app](https://portfolio-beta-gray-9ei2am6d1z.vercel.app/)), built with:
- **React 18 + Vite**
- **Lenis** silky smooth scrolling (60/120fps)
- **3D Procedural Jigsaw Puzzle Canvas Engine**: Smoothly morphs and shatters the art boards in 3D perspective during section transitions
- **Ambient Dynamic Background**: Cross-fading pastel tints corresponding to each section
- **Tactile Jigsaw Cards**: Interlocking `.knob` tabs with spring hover physics
- **Custom Precision Cursor**: Smooth trailing ring and interactive dot
- **Interactive Subsystem Architecture Explorer**: Deep-dive modal exploring the Underwater ROV/AUV electronics stack, 400V tether power, CAN thruster bus, sensors, and IECEx safety.

---

## 🚀 Quick Start

Ensure Node.js is in your PATH (e.g. using `export PATH="/home/jayanths/node-lts/bin:$PATH"`):

```bash
# Navigate to the portfolio folder
cd /home/jayanths/portfolio

# Start the development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📦 Production Build & Preview

```bash
# Build the production bundle
npm run build

# Preview the production build locally
npm run preview
```

---

## 🌐 Deploy to Vercel

To deploy your portfolio live with a URL like `https://jayanth-portfolio.vercel.app`:

```bash
# In the portfolio directory:
npx vercel
```

Follow the prompts (accept default settings) and your site will be live on Vercel in seconds!

---

## ✏️ Customization

- **Content & Sections**: Edit [src/App.jsx](file:///home/jayanths/portfolio/src/App.jsx) to update your roles, projects, metrics, or contact info.
- **Your Resume**: The resume is located at [public/Jayanth_S_Resume.pdf](file:///home/jayanths/portfolio/public/Jayanth_S_Resume.pdf). Replace this file whenever you have an updated resume.
- **Styling & Colors**: Customize design tokens in [src/index.css](file:///home/jayanths/portfolio/src/index.css).
