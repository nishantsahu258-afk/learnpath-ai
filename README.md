<div align="center">

# 🌌 LearnPath AI
### Intelligent, Personalized Learning Roadmaps & AI Tutor

[![React](https://img.shields.io/badge/React-19-61dafb?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Google Gemini](https://img.shields.io/badge/Google_Gemini-2.5_Flash-8E75B2?style=for-the-badge&logo=google&logoColor=white)](https://ai.google.dev/)
[![Phosphor Icons](https://img.shields.io/badge/Icons-Phosphor-f472b6?style=for-the-badge)](https://phosphoricons.com/)

<p align="center">
  <b>LearnPath AI</b> is a state-of-the-art, interactive Learning Management System (LMS) powered by <b>Google Gemini</b>. It crafts bespoke, structured learning curriculums tailored to your exact career goals, skill level, and schedule — complete with interactive bite-sized lessons, real-time progress tracking, and a 24/7 intelligent AI tutor.
</p>

[Explore Features](#-key-features) • [Tech Stack](#-tech-stack) • [Getting Started](#-getting-started) • [Project Architecture](#-project-architecture) • [Responsive System](#-responsive-system)

---

</div>

## ✨ Key Features

### 1. 🎯 5-Step Interactive Onboarding Journey
- **One Question at a Time**: Seamless step-by-step navigation with sleek progress tracking.
- **Tailored Personalization**: Configures primary goals (Full Stack, Mobile, AI/ML, Frontend, Backend, or Custom), motivations, experience level, daily time commitment, and preferred learning format.
- **Card Micro-Interactions**: Interactive 3D tilt effects, mouse spotlight glow, and border reveals.

### 2. ⚡ AI-Powered Curriculum Engine
- **Powered by Google Gemini**: Uses `@google/genai` to dynamically research and generate a comprehensive modular roadmap.
- **Strict JSON Schema Validation**: Generates verified, valid curriculums with modules, lessons, objectives, key takeaways, and practice exercises.
- **Graceful Fallbacks & Normalization**: Guarantees zero runtime crashes with automated payload validation and schema normalization.

### 3. 🗺️ Visual Learning Path Timeline
- **Interactive Node Graph**: High-resolution timeline with glowing orbital milestones and completion statuses (*Not Started*, *In Progress*, *Completed*).
- **Direct Module Launching**: Jump into any module or resume right where you left off with a single click.

### 4. 📚 Comprehensive Modules & Lesson Reader
- **Module Catalog**: Clean, multi-line title wrapping, module numbers (`01`, `02`), duration estimates, and progress badges.
- **Focused Lesson Reader**: Distraction-free reading view with structured concepts, key objectives, and completion toggles.
- **Mobile Lesson Switcher**: Collapsible module lesson selector for smooth on-the-go lesson switching.

### 5. 🤖 24/7 AI Tutor & Assistant
- **Context-Aware Assistance**: Instant explanations, code reviews, and tailored practice challenges for any lesson or topic.
- **Quick Action Pills**: Pre-configured prompt templates (*Explain a concept*, *Help me practice*, *Quiz my knowledge*, *Review code*).
- **Hero Cosmic Mascot**: Lively animated robot companion with dynamic typing indicator and clean conversation stream.

### 6. 📊 Analytics & Progress Dashboard
- **Dynamic Circular Completion Gauge**: Live SVG progress ring calculating global path completion percentage.
- **Bite-Sized Metrics**: Quick stats for completed modules, lessons finished, and total study hours logged.
- **"Next Up" Smart Card**: Automatically surfaces your next unfinished lesson with an isometric 3D laptop graphic.

### 7. 🌌 Cosmic Luxury Visual Identity
- **Curated Palette**: Deep space foundation (`#060713`, `#0c0a1d`) accented with vibrant neon magenta, purple, and pink (`#d946ef`, `#8b5cf6`, `#f472b6`).
- **Glassmorphism & Glow**: Multi-layered backdrop blurs, soft radial ambient lights, and stardust particles.
- **Modern Typography**: Clean typography powered by Google Fonts (*Plus Jakarta Sans*).

---

## 📱 Responsive System

LearnPath AI features a complete responsive architecture engineered for all viewports:

| Device Viewport | Width Range | Navigation Pattern | Layout Behavior |
|---|---|---|---|
| **Mobile** | `< 768px` | Fixed `MobileTopBar` (44px hamburger + centered logo + profile menu) + slide-in `MobileDrawer` | Single-column cards, sticky bottom controls, natural document scroll |
| **Tablet / iPad** | `768px – 1023px` | Collapsible sidebar + top profile header | Adaptive 2-column grids, optimized card padding |
| **Desktop** | `1024px+` | Permanent left `Sidebar` + floating profile menu | Full 3-column reference view, interactive 3D illustrations |

- **Safe-Area Inset Support**: Full compatibility with iOS notch and Android gesture indicators via `.pt-safe` and `.pb-safe`.
- **Zero Horizontal Overflow**: `max-width: 100%` and `overflow-x: hidden` protect every viewport against rogue scrollbars.
- **44px Touch Targets**: Every button, pill, link, and card complies with mobile accessibility standards.

---

## 🛠️ Tech Stack

- **Core Framework**: [React 19](https://react.dev/) + [Vite 8](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) + Custom CSS Design Tokens
- **Icons**: [Phosphor Icons React](https://phosphoricons.com/) (`@phosphor-icons/react`)
- **AI Intelligence**: [Google GenAI SDK](https://www.npmjs.com/package/@google/genai) (`@google/genai`)
- **Routing**: [React Router DOM v7](https://reactrouter.com/)
- **State Management**: React Context API (`LearningContext`) + `localStorage` persistence
- **Code Linter**: [Oxlint](https://oxc.rs/) (Next-gen Rust-based linter)

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm** or **yarn** / **pnpm**
- **Google Gemini API Key**: Obtain a free API key from [Google AI Studio](https://aistudio.google.com/).

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/nishantsahu258-afk/learnpath-ai.git
   cd learnpath-ai
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env` file in the project root:
   ```bash
   cp .env.example .env
   ```
   Add your Gemini API credentials:
   ```env
   VITE_GEMINI_API_KEY=your_actual_gemini_api_key_here
   VITE_GEMINI_MODEL=gemini-2.5-flash
   ```

4. **Start the local development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📦 Available Scripts

| Script | Command | Purpose |
|---|---|---|
| `dev` | `npm run dev` | Runs the Vite local development server with HMR |
| `build` | `npm run build` | Compiles and optimizes production assets into `dist/` |
| `lint` | `npm run lint` | Runs Oxlint across all files (zero warnings, zero errors) |
| `preview` | `npm run preview` | Previews the production bundle locally |

---

## 📂 Project Architecture

```
learnpath-ai/
├── public/                     # Static assets & favicon
├── src/
│   ├── components/
│   │   ├── assistant/          # AI Robot mascots, avatar badges & speech bubbles
│   │   ├── dashboard/          # Dashboard 3D isometric laptop & metrics graphics
│   │   ├── layout/             # MainLayout, Sidebar, MobileTopBar, MobileDrawer
│   │   ├── modules/            # Module topic mascots & level badge icons
│   │   ├── onboarding/         # SelectableCard, StepProgress, 3D Step illustrations
│   │   ├── settings/           # Profile target & danger zone graphics
│   │   └── ui/                 # Reusable Button, Card, SpotlightCard, CosmicParticles
│   ├── context/
│   │   └── LearningContext.jsx # Global learning state & localStorage sync
│   ├── hooks/
│   │   └── useLocalStorage.js  # Reactive browser storage synchronization
│   ├── pages/
│   │   ├── AIAssistant.jsx     # Real-time intelligent Gemini chat tutor
│   │   ├── AIGenerating.jsx    # Cosmic orbit loader with fact carousel
│   │   ├── Dashboard.jsx       # Main overview, progress ring & next up task
│   │   ├── Landing.jsx         # Hero landing page with feature showcases
│   │   ├── LearnerProfile.jsx  # 5-step onboarding customization flow
│   │   ├── LearningPath.jsx    # Visual milestone roadmap timeline
│   │   ├── Lesson.jsx          # Interactive lesson reader & progress toggle
│   │   ├── Modules.jsx         # Full module & lesson breakdown catalog
│   │   ├── Progress.jsx        # Detailed learning metrics & analytics
│   │   └── Settings.jsx        # User profile inspection & danger zone controls
│   ├── services/
│   │   ├── geminiService.js    # Google GenAI client, path generation & assistant chat
│   │   └── promptBuilder.js    # Contextual system prompt constructors
│   ├── utils/
│   │   ├── pathNormalizer.js   # Payload sanitization & validation safety
│   │   └── progressUtils.js    # Metric calculation helpers
│   ├── validation/
│   │   └── learningPathSchema.js # Structural validation schema
│   ├── App.jsx                 # Route definitions & router configuration
│   ├── index.css               # Global CSS design tokens, scrollbars & keyframes
│   └── main.jsx                # Application root entry point
├── .env.example                # Environment variable configuration template
├── package.json                # Project dependencies and script definitions
├── vercel.json                 # Single-page application routing rules for Vercel
└── vite.config.js              # Vite configuration & React plugin setup
```

---

## 🔒 Security & Client-Side Architecture

> [!NOTE]
> LearnPath AI is built as a zero-latency client-side application. The Google Gemini API key is loaded in the browser via `VITE_GEMINI_API_KEY`.
> For enterprise-scale public deployments, it is recommended to route Gemini calls through an authenticated backend proxy or utilize user-supplied API keys (BYOK).

---

## 🚢 Deployment

The repository includes a ready-to-use [`vercel.json`](./vercel.json) configured for seamless single-page application routing on **Vercel** or **Netlify**.

1. Connect your GitHub repository to Vercel.
2. Under **Environment Variables**, add:
   - `VITE_GEMINI_API_KEY`: Your Google Gemini API Key
   - `VITE_GEMINI_MODEL`: `gemini-2.5-flash`
3. Click **Deploy**.

---

## 📄 License

This project is licensed under the **MIT License** — feel free to customize and expand it for your own learning platforms!

<div align="center">
  <sub>Built with ❤️ and ☕ using React, Tailwind CSS, and Google Gemini AI.</sub>
</div>
