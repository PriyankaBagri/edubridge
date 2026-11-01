# EduBridge 🎓
### Making quality learning more accessible, interactive, and inclusive.

EduBridge is an interactive educational learning platform designed to make digital learning more engaging and accessible for students. It combines multilingual learning interfaces, interactive assessments, AI-assisted explanations, and gamification in a unified student learning experience.

**[Live Demo](https://edubridge-dusky-phi.vercel.app/) · [GitHub Repository](https://github.com/PriyankaBagri/edubridge)**

---

## ✨ Key Features

### 📚 Interactive Learning Workspace
- Structured learning modules with lesson selection.
- Educational content with transcripts and visual learning resources.
- Interactive MCQ assessments with instant answer feedback and explanations.

### 🌍 Multilingual Learning
- Interface and educational content support for English, Hindi, Marathi, Tamil, and Telugu.
- Text-to-speech support for listening to lesson transcripts.
- Speech input for interacting with the AI tutor where browser support is available.

### 🤖 AI-Powered Science Tutor
- Gemini-powered explanations through a server-side API endpoint.
- Designed to provide concise, age-appropriate science explanations.
- Includes fallback responses when the AI service is unavailable.

### 🎮 Gamified Learning Experience
- Experience points (XP) for correct quiz answers.
- Daily learning quests and achievement badges.
- Learning streak indicators to encourage consistency.

### 👩‍🏫 Teacher Dashboard
- Cohort-level student analytics interface.
- Student progress overview.
- Remedial learning interface for identifying students who may need additional support.

### 📶 Offline Learning Interface
- Offline-mode interface and synchronization queue.
- Demonstration of pending and completed synchronization states.

> **Implementation note:** EduBridge currently uses sample/mock data for lessons, cohorts, badges, and synchronization workflows. These interfaces demonstrate the intended learning experience and are not yet connected to a persistent learning database or a production offline synchronization system.

---

## 🛠️ Technology Stack

| Category | Technologies |
|---|---|
| Frontend | React 19, TypeScript |
| Build Tool | Vite |
| Styling | Tailwind CSS 4 |
| Animations | Motion |
| Icons | Lucide React, Material Symbols |
| Backend | Node.js, Express.js |
| AI Integration | Google Gemini API, `@google/genai` |
| Browser APIs | Web Speech API, Speech Synthesis API |

---

## 📂 Project Structure

```text
edubridge/
├── src/
│   ├── components/
│   │   ├── StudentWorkspace.tsx
│   │   ├── TeacherAnalytics.tsx
│   │   ├── AITutorModal.tsx
│   │   ├── SyncCenter.tsx
│   │   ├── WelcomeHub.tsx
│   │   └── ...
│   ├── data/
│   │   └── mockData.ts
│   ├── i18n/
│   │   └── translations.ts
│   ├── App.tsx
│   └── types.ts
├── server.ts
├── index.html
├── package.json
├── vite.config.ts
└── README.md
```

---

## ⚙️ Getting Started

### Prerequisites
- Node.js
- npm

### 1. Clone the repository

```bash
git clone https://github.com/PriyankaBagri/edubridge.git
cd edubridge
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root:

```env
GEMINI_API_KEY=your_gemini_api_key
```

The AI endpoint includes a fallback response if the API key is not configured.

### 4. Start the development server

```bash
npm run dev
```

Open the local URL displayed in your terminal.

### 5. Build for production

```bash
npm run build
```

---

## 🚧 Current Development Status

EduBridge is an interactive learning prototype. Its core learning experience, multilingual interfaces, quiz interactions, gamification UI, teacher dashboard, and AI tutor integration are implemented.

Persistent user accounts, database-backed learning progress, and production-grade offline synchronization remain areas for further development.

---

## 👩‍💻 Developer

**Priyanka Bagri**

- GitHub: [@PriyankaBagri](https://github.com/PriyankaBagri)
- Portfolio: [Visit Portfolio](https://priyanka-portfolio-owgy.vercel.app/)

*Built with a focus on accessible education and student-centred design.*
