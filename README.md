# Speech to Text — Frontend (React + Vite)

Welcome to the Speech to Text web app — a modern and responsive React frontend that allows users to transcribe audio files into readable text using Google Speech-to-Text API (via a connected backend).

This frontend is built with Vite + React, styled using Tailwind CSS, and powered by Supabase Auth for secure login/signup/password reset workflows.

## Features

- Clean and responsive UI (mobile-first)
- Login & Signup authentication via Supabase
- Forgot password and reset flow
- Upload audio files (WAV/MP3/M4A)
- Transcribe via backend endpoint
- View previous transcription history
- Protected dashboard (redirects if not logged in)
- Fully styled with Tailwind CSS
- Deployed-ready for Vercel


## Folder Structure

```

src/
├── components/
│   ├── authform.jsx              # Reusable login/signup form
│   └── transcription\_panel.jsx   # Handles file upload & history
├── pages/
│   ├── login.jsx                 # Login/Signup interface
│   ├── dashboard.jsx             # Protected main panel after login
│   └── reset\_password.jsx        # Password reset form
├── App.jsx                       # Routes and session logic
├── config.js                     # API base URL logic
├── supabaseClient.js             # Supabase initialization
├── index.css                     # Tailwind styles
└── main.jsx                      # Entry point

````


## Tech Stack

| Stack         | Tool / Library               |
|---------------|------------------------------|
| Frontend      | React (with Vite)            |
| Auth          | Supabase (email-based login) |
| Styling       | Tailwind CSS                 |
| HTTP Requests | Axios                        |
| Routing       | React Router DOM             |
| Hosting       | Vercel                       |

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/speech-to-text-frontend.git
cd speech-to-text-frontend
````

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Setup

Create a `.env` file at the root:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_KEY=your-anon-key
VITE_API_URL=http://localhost:5000   # or your backend render URL
```

### 4. Start Local Dev Server

```bash
npm run dev
```

Now open `http://localhost:5173` in your browser.


## Authentication via Supabase

* Uses email + password for login/signup
* Includes password reset with redirectTo=/reset-password
* Session is protected — unauthenticated users are redirected to /login


## Backend Requirements

This frontend expects the following backend endpoints:

| Endpoint                   | Method | Description                   |
| -------------------------- | ------ | ----------------------------- |
| `/transcribe`              | POST   | Accepts audio file + user ID  |
| `/transcriptions/:user_id` | GET    | Returns transcription history |

Make sure your backend handles CORS and file uploads.


## Deployment

### Recommended: [Vercel](https://vercel.com)

1. Push this project to GitHub
2. Connect to Vercel → Import project
3. Set the following environment variables in Vercel Dashboard:

```
VITE_SUPABASE_URL
VITE_SUPABASE_KEY
VITE_API_URL
```

4. Click Deploy


## Optional Enhancements

* Add toast notifications (react-hot-toast)
* Add audio recording feature (Mic → Upload)
* Password strength meter
* Dark mode toggle
* Transcription download/export (PDF / .txt)
