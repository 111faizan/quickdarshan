# QuickDarshan 🎥🙏

**QuickDarshan** is a live streaming platform built to provide virtual darshan experiences from temples and spiritual centers. It supports real-time streaming, user authentication with **Auth0** or **Supabase**, offline image viewing, and a clean spiritual-themed UI.

---

## 🌐 Live Demo

🔗 [Visit Live Site] https://quickdarshan.vercel.app/

---

## 🧰 Tech Stack

- **Frontend**: React (Vite), Tailwind CSS
- **Backend**: Node.js, Express
- **Streaming**: OBS + WebRTC/HLS
- **Authentication**: Auth0 or Supabase (toggle as needed)
- **Storage**: Local file system (offline image storage)
- **Deployment**: Vercel (frontend), Render/Localhost (backend)

---

## 🚀 Features

- 🔐 User login/signup with **Auth0** or **Supabase**
- 📡 Live video streaming (OBS/WebRTC/HLS)
- 🖼️ Offline image display section
- 🧘 Minimal UI with spiritual aesthetics
- 🧩 Modular architecture for flexibility

---

## 🛠️ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/quickdarshan.git
cd quickdarshan


🔐 Authentication Options
Choose either Auth0 or Supabase authentication based on your preference.

Option A: Setup Auth0
Go to Auth0 Dashboard

Create a Single Page Application

Under Settings, grab:

Domain

Client ID

Add:

Allowed Callback URLs: http://localhost:5173

Allowed Logout URLs: http://localhost:5173

Allowed Web Origins: http://localhost:5173


Add to client/.env:
env
Copy
Edit
VITE_AUTH_PROVIDER=auth0
VITE_AUTH0_DOMAIN=your-auth0-domain
VITE_AUTH0_CLIENT_ID=your-auth0-client-id

Option B: Setup Supabase
Go to Supabase Dashboard

Create a new project

Under Project Settings → API, get:

SUPABASE_URL

SUPABASE_ANON_KEY

Add to client/.env:
env
Copy
Edit
VITE_AUTH_PROVIDER=supabase
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key

 Streaming with OBS
Open OBS Studio

Set stream settings to Custom

Enter your RTMP/WebRTC endpoint (local or deployed)

Offline Images
Images captured from streams are stored in:

server/public/images/

Accessed via backend API or static route for display on the frontend.



Install Dependencies and Run
npm install
npm run dev

The app will run at:
➡️ http://localhost:5173 (or whatever Vite assigns)

quickdarshan/
├── public/
│   └── images/               # Saved images from streams
├── src/
│   ├── auth/                 # Auth0/Supabase logic
│   ├── components/           # Reusable UI components
│   ├── pages/                # Route-based pages
│   └── main.tsx              # App entry point
├── .env                      # Environment config
├── index.html
├── vite.config.ts
├── package.json


