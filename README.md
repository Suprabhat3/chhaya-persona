<p align="center">
  <img src="public/android-chrome-512x512.png" alt="Chhaya Persona Logo" width="150" height="150">
</p>

<h1 align="center">🌟 Chhaya Persona</h1>

<p align="center">
  <strong>Chat with AI-powered personalities of your favorite celebrities, tech leaders, and influencers!</strong>
</p>

<p align="center">
  <a href="https://chhayapersona.suprabhat.site/">
    <img src="https://img.shields.io/badge/🚀_Live_Demo-Visit_Site-purple?style=for-the-badge" alt="Live Demo">
  </a>
  <img src="https://img.shields.io/badge/Version-2.1-blue?style=for-the-badge" alt="Version">
  <img src="https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js" alt="Next.js">
  <img src="https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript" alt="TypeScript">
</p>

<p align="center">
  <a href="#features">Features</a> •
  <a href="#personas">Personas</a> •
  <a href="#tech-stack">Tech Stack</a> •
  <a href="#getting-started">Getting Started</a> •
  <a href="#contributing">Contributing</a>
</p>

---

## 📖 About

**Chhaya Persona** is an AI-powered conversation platform that lets you chat with digital representations of famous personalities. Whether you want coding advice from Hitesh Choudhary, business insights from Elon Musk, or life wisdom from Mahatma Gandhi – Chhaya makes it possible!

> 🎓 **Part of GenAI Cohort** by [Hitesh Choudhary](https://github.com/hiteshchoudhary) & [Piyush Garg](https://github.com/piyushgarg-dev)

---

## ✨ Features

### 🤖 AI-Powered Conversations

- Real-time streaming responses
- Multiple AI model support (Gemini, GPT, Groq, Mistral)
- Context-aware conversations that remember your chat history

### 👤 Personalized Experience

- **User authentication** with Supabase
- **Name personalization** – AI addresses you by name when logged in
- **Chat history** – Save and revisit previous conversations

### 🎨 Beautiful Neo-Brutalism UI

- Bold, modern design with hard shadows and vibrant colors
- Fully responsive for mobile and desktop
- Smooth animations and micro-interactions

### 📂 Organized Persona Categories

- 💕 **AI Companions** – Virtual friends for casual chats
- 👨‍💻 **Tech Educators** – Learn coding from the best
- 💼 **Sales Mentors** – Business and sales wisdom
- 🎬 **Bollywood Stars** – Chat with your favorite actors
- 🌟 **Inspiring Leaders** – Wisdom from historical figures
- 💼 **Tech CEOs** – Insights from industry leaders
- 🤖 **AI Visionaries** – Discuss the future of AI

---

## 🎭 Personas

| Category           | Personalities                                                     |
| ------------------ | ----------------------------------------------------------------- |
| **AI Companions**  | Suprabhat (Creator), Aarohi (AI Girlfriend), Arjun (AI Boyfriend) |
| **Tech Educators** | Hitesh Choudhary, Piyush Garg, Code With Harry, Manu Arora        |
| **Sales Mentors**  | Vikram (Sales Guru), Ashneer (Business Shark)                     |
| **Bollywood**      | Shah Rukh Khan, Amitabh Bachchan                                  |
| **Leaders**        | Mahatma Gandhi, Dr. B.R. Ambedkar, Dr. APJ Abdul Kalam            |
| **Tech CEOs**      | Elon Musk, Jeff Bezos, Tim Cook, Sundar Pichai                    |
| **AI Visionaries** | Sam Altman, Andrew Ng                                             |

---

## 🛠️ Tech Stack

| Technology        | Purpose                         |
| ----------------- | ------------------------------- |
| **Next.js 16**    | React framework with App Router |
| **TypeScript**    | Type-safe development           |
| **Tailwind CSS**  | Utility-first styling           |
| **Supabase**      | Authentication & Database       |
| **Vercel AI SDK** | Streaming AI responses          |
| **Google Gemini** | Primary AI model                |
| **OpenRouter**    | Multi-model AI access           |
| **Groq**          | Fast inference                  |
| **Mistral**       | Alternative AI model            |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18 or higher
- **pnpm** (recommended) or npm/yarn
- API keys for AI providers

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Suprabhat3/chhaya-persona.git
   cd chhaya-persona
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env.local
   ```

   Add your API keys:

   ```env
   # Supabase
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

   # AI Providers
   GOOGLE_GENERATIVE_AI_API_KEY=your_gemini_key
   OPENROUTER_API_KEY=your_openrouter_key
   GROQ_API_KEY=your_groq_key
   ```

4. **Start development server**

   ```bash
   pnpm dev
   ```

5. **Open in browser**
   ```
   http://localhost:3000
   ```

---

## 📁 Project Structure

```
chhaya-persona/
├── app/                    # Next.js App Router
│   ├── api/               # API routes (Gemini, GPT, Groq, Mistral)
│   ├── chat/              # Chat page
│   ├── persona/           # Persona selection page
│   ├── profile/           # User profile page
│   └── page.tsx           # Homepage
├── component/             # React components
│   ├── cardPersona.tsx    # Persona cards with categories
│   ├── FeaturedPersonas.tsx # Homepage featured personas
│   ├── navbar.tsx         # Navigation bar
│   └── ...
├── lib/                   # Utilities
│   ├── personaData.ts     # Full persona database (backend)
│   └── supabase.ts        # Supabase client
├── type/                  # TypeScript types
│   └── personaInfo.ts     # Persona types & categories (frontend)
└── public/                # Static assets (persona images)
```

---

## 🔧 Environment Variables

| Variable                        | Description            | Required |
| ------------------------------- | ---------------------- | -------- |
| `NEXT_PUBLIC_SUPABASE_URL`      | Supabase project URL   | ✅       |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key | ✅       |
| `GOOGLE_GENERATIVE_AI_API_KEY`  | Google Gemini API key  | ✅       |
| `OPENROUTER_API_KEY`            | OpenRouter API key     | Optional |
| `GROQ_API_KEY`                  | Groq API key           | Optional |

---

## 🌐 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add environment variables
4. Deploy!

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Suprabhat3/chhaya-persona)

---

## 🤝 Contributing

Contributions are welcome! Here's how:

1. **Fork** this repository
2. **Create** a feature branch: `git checkout -b feature/amazing-feature`
3. **Commit** your changes: `git commit -m 'Add amazing feature'`
4. **Push** to the branch: `git push origin feature/amazing-feature`
5. **Open** a Pull Request

### Ideas for Contribution

- Add new personas
- Improve AI prompts
- Add new themes
- Fix bugs
- Improve documentation

---

## 📜 License

This project is licensed under the **MIT License**.

---

## 🙏 Acknowledgments

- **[Hitesh Choudhary](https://www.youtube.com/@chaiaurcode)** & **[Piyush Garg](https://www.youtube.com/@piyushgargdev)** for the GenAI Cohort
- **Next.js** team for the amazing framework
- All the amazing personalities who inspire millions

---

## 📬 Connect

<p align="center">
  <a href="https://twitter.com/Suprabhat_3">
    <img src="https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white" alt="Twitter">
  </a>
  <a href="https://linkedin.com/in/suprabhatt">
    <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn">
  </a>
  <a href="https://github.com/Suprabhat3">
    <img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" alt="GitHub">
  </a>
  <a href="https://www.youtube.com/@suprabhat_yt">
    <img src="https://img.shields.io/badge/YouTube-FF0000?style=for-the-badge&logo=youtube&logoColor=white" alt="YouTube">
  </a>
</p>

---

<p align="center">
  Made with ❤️ by <a href="https://github.com/Suprabhat3">Suprabhat</a>
</p>

<p align="center">
  ⭐ Star this repo if you find it helpful!
</p>
