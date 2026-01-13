# DevSync | Real-time Collaborative Workspace

A full-stack collaborative platform allowing multiple users to edit code and markdown documents simultaneously with sub-50ms latency.

## 🚀 Features
- **Real-time Sync**: Powered by Socket.io and WebSockets for instantaneous updates.
- **Session Persistence**: Redis-backed caching ensures data isn't lost during disconnects.
- **Security**: JWT-based authentication flow for private workspace access.
- **Live Preview**: Custom Markdown compiler integrated for immediate visual feedback.

## 🛠️ Tech Stack
- **Frontend**: React.js, Tailwind CSS, Lucide Icons.
- **Backend**: Node.js, Express, Socket.io.
- **Database/Cache**: Redis (Session Management), MongoDB (User Data).
- **Auth**: JSON Web Tokens (JWT).

## 🏁 Getting Started
1. Clone the repo: `git clone https://github.com/your-username/DevSync.git`
2. Install dependencies: `npm install`
3. Start Redis server: `redis-server`
4. Run the app: `npm run dev`