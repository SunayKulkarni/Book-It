# BookIt

BookIt is a full-stack experience booking platform where users can browse unique experiences, check availability, and make bookings — complete with promo code validation.

Built using React + TypeScript (Vite) for the frontend and Node.js + Express + MongoDB for the backend.

---

## Tech Stack

| Layer | Technologies Used |
|:------|:------------------|
| Frontend | React, TypeScript, Vite |
| Backend | Node.js, Express.js, TypeScript |
| Database | MongoDB (Mongoose) |
| Deployment | Vercel (Frontend) & Render (Backend) |
| Env Management | dotenv |
| API Testing | Postman |

---

## Project Structure

```
bookIt/
├── backend/
│   ├── src/
│   │   ├── app.ts
│   │   ├── db.ts
│   │   ├── routes/
│   │   ├── models/
│   │   └── utils/
│   ├── dist/
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── vite.config.ts
│   ├── package.json
│   └── tsconfig.json
│
└── README.md
```

---

## Live Demo

- Frontend (Vercel): https://book-it-sage-eight.vercel.app
- Backend (Render): https://book-it-3n5y.onrender.com

---

## API Endpoints

| Method | Endpoint | Description |
|:-------|:----------|:-------------|
| GET | /api/experiences | Get list of all experiences |
| GET | /api/experiences/:id | Get details and slot availability |
| POST | /api/bookings | Create a new booking |
| POST | /api/promo/validate | Validate promo codes (SAVE10, FLAT100) |

---

## Setup and Installation

### Backend

```bash
cd backend
npm install
```

Create a `.env` file in `/backend` with:
```
PORT=10000
MONGODB_URI=<your_mongodb_connection_string>
```

Then run:
```bash
npm run build
npm start
```

Or for development:
```bash
npm run dev
```

---

### Frontend

```bash
cd frontend
npm install
```

Create a `.env` file in `/frontend` with:
```
VITE_BACKEND_URL=https://book-it-3n5y.onrender.com
```

Then start the dev server:
```bash
npm run dev
```

To build for production:
```bash
npm run build
npm run preview
```

---

## Environment Variables

| Key | Location | Description |
|:----|:----------|:-------------|
| PORT | backend/.env | Server port |
| MONGODB_URI | backend/.env | MongoDB connection string |
| VITE_BACKEND_URL | frontend/.env | Backend API base URL |

---

## Key Features

- Interactive UI for browsing experiences  
- Real-time slot availability  
- Booking form with promo code validation  
- CORS-enabled backend for smooth integration  
- Deployed on Vercel + Render

---

## Scripts

### Backend
| Command | Description |
|----------|-------------|
| npm run dev | Start dev server (TypeScript watch mode) |
| npm run build | Compile TypeScript to JS |
| npm run start | Start compiled server |
| npm run seed | Seed demo data into MongoDB |

### Frontend
| Command | Description |
|----------|-------------|
| npm run dev | Run development server |
| npm run build | Build production files |
| npm run preview | Preview production build locally |

---

## License
This project is licensed under the MIT License.
