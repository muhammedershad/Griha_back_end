# Griha – Architecture Firm Website

Griha is an elaborate in-house architecture and construction website built using the MERN stack. This platform seamlessly integrates project progress tracking, employee task management, user consultation slot booking, and administrative functionalities, ensuring a highly efficient and functional experience for both clients and team members. 🚀

**Live link**:- [https://griha.vercel.app](https://griha.vercel.app/)

## Features 🌟

- **Project Progress Tracking**: Collaboration between clients and employees is facilitated on projects. Team members provide progress updates, and both clients and team members can express their perspectives.

- **Consultation Booking**: Clients can schedule expert consultations by booking slots, utilizing WebRTC for seamless video calls.
- **Authorization**: Authorization is handled using JSON Web Tokens (JWT) and appropriate middleware.

- **Real-time Chat**: Implemented real-time chat functionality using Socket.IO, enabling clients to communicate with project members within their project and employees to engage in communication with their colleagues.

- **Task Management**: Efficient task management is achieved with seamless task assignment and review capabilities for team members.

- **Global State Management**: Utilized Redux Toolkit for global state management in React.

- **Clean Architecture**: The entire codebase is written in TypeScript, following Clean Architecture principles to maintain coding standards and ensure high scalability.

- **Payment Integration**: The admin can initiate payments to clients, who can then make payments using the integrated Stripe payment gateway.

- **Media Storage**: Leveraged Firebase Storage for the storage of photos, videos, and various documents.

- **CI/CD Pipeline**: Implemented a CI/CD pipeline using GitHub Actions to streamline the development workflow.

- **Hosting**: The project frontend is hosted on Vercel, while the backend resides on AWS EC2. Nginx is utilized for reverse proxy and load balancing, secured through SSH certification.

- **Database**: Utilized MongoDB hosted on MongoDB Atlas.

## Technologies Used 💻

- React
- Redux
- Node.js
- Express.js
- Tailwind CSS
- WebRTC
- Socket.IO
- Firebase
- MongoDB
- MongoDB Atlas
- CI/CD pipeline (GitHub Actions)
- Nginx
- AWS EC2
- Vercel
- Stripe
- JWT
- Clean Architecture

## Deployment 🚀

The project frontend is hosted on Vercel at [https://griha.vercel.app](https://griha.vercel.app/), while the backend resides on AWS EC2. The database is hosted on MongoDB Atlas.

## Installation 🔧

To run this project locally, follow these steps:

1. Clone the repository
2. Navigate to the project directory
3. Install dependencies using `npm install`
4. Start the backend server using `npm start` in the `backend` directory
5. Start the frontend server using `npm run` in the `frontend` directory

Thank you for your interest! 😊

