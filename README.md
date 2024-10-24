# ViCo : Space-themed Collaborative Co-working Spaces Application

ViCoSpaces, a new and user-friendly collaborative co-working space application designed to enhance productivity and foster seamless collaboration among individuals. Built with the Vue 3 Composition API and Firebase, ViCo provides a robust platform for students, individuals and teams to work together in real-time and visualize ideas.

## Table of Contents
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

- User authentication (email/password and Google sign-in)
- Room creation and management
- Real-time collaboration
- Whiteboard and Live Cursors
- Real-time chat communication
- User-friendly interface

## Installation

To install the project, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/ViCoSpaces.git
   ```

2. Navigate to the project directory:
   ```bash
   cd ViCoSpaces
   ```

3. Install the dependencies:
   ```bash
   npm install
   ```
   
4. Create .env file in root directory replace values with your firebaseconfig
   ```
   VITE_FIREBASE_API_KEY=abcd
   VITE_FIREBASE_AUTH_DOMAIN=abcd
   VITE_FIREBASE_PROJECT_ID=abcd
   VITE_FIREBASE_STORAGE_BUCKET=abcd
   VITE_FIREBASE_MESSAGING_SENDER_ID=abcd
   VITE_FIREBASE_APP_ID=abcd
   VITE_FIREBASE_MEASUREMENT_ID=abcd
   ```
   
## Usage

To start the development server, run:
```
npm run dev
```
Open your browser and navigate to `http://localhost:5173` to view the application.


## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Write clear and concise commit messages.
4. Ensure that your changes are well-tested.
5. Push your branch to your fork.
6. Create a pull request to the main repository.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
