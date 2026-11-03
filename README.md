📚 BookNook --- Library Management System
BookNook is a library management web application where users can explore
books, borrow books, manage their borrowing history, and return books.
The project is built with a modern web stack and provides a simple,
responsive user experience.
✨ Features
- Browse and explore available books
- View book details
- User authentication with email/password and Google login
- Borrow books and track currently borrowed books
- View borrowing history
- Return borrowed books
- Manage user profile
- Responsive design for desktop, tablet, and mobile
- Toast notifications for user actions
🛠️ Tech Stack
Client
- Next.js
- React
- Tailwind CSS
- Better Auth
- React Hot Toast
Server
- Node.js
- Express.js
- MongoDB
- REST API
📁 Project Structure
booknook/
├── booknook-client/   # Next.js frontend
└── booknook-server/   # Express.js backend
Update the folder names above if your repository uses a different
structure.

🚀 Getting Started
Prerequisites
- Node.js (LTS)
- npm
- MongoDB database
1. Clone the repository
git clone YOUR_REPOSITORY_URL
cd booknook
2. Set up the backend
cd booknook-server
npm install
Create a .env file in the server directory:
PORT=5000
MONGODB_URI=your_mongodb_connection_string
Start the server:
npm run dev
3. Set up the frontend
Open a new terminal:
cd booknook-client
npm install
Create a .env.local file in the client directory:
NEXT_PUBLIC_BETTER_AUTH_URL=https://booknook-client-git-main-jenodinerifat.vercel.app
Configure any additional Better Auth and Google OAuth environment
variables required by your auth setup.

Start the development server:
npm run dev
Open http://localhost:3000 in your browser.
🔐 Environment Variables
  Variable                        Description
  PORT                          Backend server port (for example, 5000)
MONGODB_URI                   MongoDB connection string
NEXT_PUBLIC_BETTER_AUTH_URL   Better Auth base URL

Keep your credentials private. Never commit .env or .env.local files
to GitHub.
🔌 API
The backend provides REST API endpoints for book and borrowing
operations.

Example endpoints (adjust to match your server routes):

  Method    Endpoint               Description
  GET     /books               Get all books
GET     /books/:id           Get a book by ID
POST    /books               Add a book
GET     /borrow              Get borrowing records
POST    /borrow              Borrow a book
PATCH   /borrow/:id/return   Return a borrowed book
🌐 Live Demo
- Live Website:https://booknook-client-git-main-jenodinerifat.vercel.app
- Client Repository: Add your frontend repository URL
- Server Repository: Add your backend repository URL
📸 Screenshots



  
🎯 Project Goal
The goal of BookNook is to make basic library operations easier through
a user-friendly web application. It also demonstrates practical skills
in frontend development, REST API integration, authentication, and
database operations.
👨‍💻 Developer
Jenodine Islam Rifat
- GitHub: @jenodinerifat59
⭐ If you find this project useful, consider giving it a star!
