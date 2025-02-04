# ChatWeb Application

ChatWeb is a real-time chat application that allows users to register, log in, and chat with other users. It features user authentication, real-time messaging, and a user-friendly interface.

## Features

- **User Registration**: Users can create an account by providing their name, email, and password.
- **User Login**: Registered users can log in using their email and password.
- **Real-time Messaging**: Users can send and receive messages in real-time.
- **User Authentication**: Secure authentication using JWT tokens.
- **Chat Management**: Users can create and manage chats with other users.
- **Online Users**: See which users are currently online.


## ScreenShot



## Getting Started

### Prerequisites

- Node.js
- MongoDB

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/ChatWeb.git
   cd ChatWeb
   ```

2. Install the dependencies for both the frontend and backend:
   ```bash
   cd my-app
   npm install
   cd ../backend
   npm install
   ```

3. Create a `.env` file in the `backend` directory and add your MongoDB URI and JWT secret:
   ```env
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   ```

### Running the Application

1. Start the backend server:
   ```bash
   cd backend
   npm start
   ```

2. Start the frontend development server:
   ```bash
   cd my-app
   npm start
   ```

3. Open your browser and navigate to `http://localhost:3000` to use the application.

## Usage

### Register

1. Navigate to the Register page.
2. Fill in your name, email, and password.
3. Click the "Register" button.
4. If registration is successful, you will be redirected to the login page.

### Login

1. Navigate to the Login page.
2. Fill in your email and password.
3. Click the "Login" button.
4. If login is successful, you will be redirected to the chat page.

### Chat

1. After logging in, you can see a list of users.
2. Click on a user to start a chat.
3. Type your message and press "Enter" to send it.
4. Messages will be sent and received in real-time.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License to Abdelhaliem Adham.
