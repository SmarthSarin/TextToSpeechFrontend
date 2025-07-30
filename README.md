# Speech to Text Frontend (React + Vite)

A sleek and modern frontend for transcribing audio files into readable text using Google Cloud Speech-to-Text API via a connected backend. This project uses **React + Vite**, **Supabase Auth**, **Tailwind CSS**, and is fully deployable to **Vercel**.

## Features

* Login, Signup & Password Reset with Supabase Auth
* Upload `.mp3`, `.wav`, `.m4a` audio files
* Live transcription from backend using Google Speech-to-Text
* View and scroll through past transcriptions
* Password reset flow with email redirect
* Toast notifications for success/errors (via `react-toastify`)
* Responsive UI with a purple-gold gradient theme
* Protected Dashboard with auto-redirect for unauthenticated users
* Deploy-ready on Vercel


## Folder Structure

```
src/
├── components/
│   ├── authform.jsx            # Reusable login/signup form with logic
│   └── transcription_panel.jsx # File upload + history display
├── pages/
│   ├── login.jsx               # Login and Signup UI
│   ├── dashboard.jsx           # Authenticated dashboard
│   └── reset_password.jsx      # Password reset form
├── App.jsx                     # Main app + routing logic
├── config.js                   # API URL fallback for dev/deploy
├── supabaseClient.js           # Supabase setup
├── index.css                   # TailwindCSS styles
└── main.jsx                    # App entry point
```


## Tech Stack

| Purpose        | Tool / Library   |
| -------------- | ---------------- |
| Frontend       | React (Vite)     |
| Authentication | Supabase         |
| Styling        | Tailwind CSS     |
| Routing        | React Router DOM |
| Requests       | Axios            |
| Notifications  | React Toastify   |
| Hosting        | Vercel           |


## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/speech-to-text-frontend.git
cd speech-to-text-frontend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Create `.env` file

Create a `.env` file in the root directory with the following:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_KEY=your-anon-key
VITE_API_URL=http://localhost:5000 # or Render URL for backend
```

### 4. Run Dev Server

```bash
npm run dev
```

Your frontend will be available at `http://localhost:5173`


## Authentication with Supabase

* Email/password based login and signup
* Includes password reset (via Supabase redirect)
* Frontend checks auth session & redirects accordingly
* Supabase credentials must be set via `.env` and Vercel Dashboard

---

## API Endpoints Expected from Backend

| Endpoint                   | Method | Description                        |
| -------------------------- | ------ | ---------------------------------- |
| `/transcribe`              | POST   | Upload audio + user ID             |
| `/transcriptions/:user_id` | GET    | Fetch user’s transcription history |

> Make sure your backend supports:
>
> * CORS
> * Multipart form data
> * Uses Google Cloud Speech API


## Vercel Deployment

1. Push frontend repo to GitHub
2. Connect your GitHub repo to Vercel
3. Set the following environment variables in **Vercel → Project Settings**:

```env
VITE_SUPABASE_URL=
VITE_SUPABASE_KEY=
VITE_API_URL=
```

4. Click **Deploy**

> No need to upload or expose Google credentials on Vercel — those are only used on your backend.


## Future Enhancements

* Toast notifications (`react-toastify`)
* Audio recording from microphone
* Export transcript to PDF or `.txt`
* Password strength validation
* Dark mode toggle
* Language selection for transcription

