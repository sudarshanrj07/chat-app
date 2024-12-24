# Chat App

**Version**: 1.0.0  
**License**: ISC

## Description

The **Chat App** is a **real-time messaging application** built using **Node.js**, **Express.js**, and **Socket.io**. It enables users to send and receive messages instantly, providing an interactive chat experience. The app supports user authentication, file uploads, and stores chat data in **MongoDB** using **Mongoose**. Secure authentication is managed with **bcrypt** for password hashing and **express-session** for session management.

Key features include:

- **Real-time Messaging**: Powered by **Socket.io** for instant messaging between users.
- **User Authentication**: Users can securely register and log in with hashed passwords.
- **File Uploads**: Send images and other files using **Multer** middleware.
- **Session Management**: User sessions are maintained across requests using **express-session**.
- **Environment Configuration**: **dotenv** is used to securely manage environment variables.

---

## Technologies Used

- **Backend**: Node.js, Express.js
- **Real-time Communication**: Socket.io
- **Database**: MongoDB with Mongoose (ODM)
- **Authentication**: bcrypt, express-session
- **File Uploads**: Multer
- **Templating**: EJS (Embedded JavaScript) for dynamic HTML rendering
- **Environment Management**: dotenv for secure environment variables

---

## Features

- **Instant Messaging**: Communicate with other users in real time using WebSockets.
- **User Registration & Login**: Secure user authentication with password hashing and session management.
- **File Uploads**: Users can send and receive image files or other types of files.
- **Persistent Sessions**: Users remain logged in across multiple sessions and page refreshes.
- **Real-time Notification**: Users get instant feedback on messages sent and received.

---

## Installation

To run the app locally, follow these steps:

### 1. Clone the repository

```bash
git clone https://github.com/your-username/chat-app.git
cd chat-app
