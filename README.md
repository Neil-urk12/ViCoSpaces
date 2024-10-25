# ViCo : Space-themed Collaborative Co-working Spaces Application

ViCoSpaces, a new and user-friendly collaborative co-working space application designed to enhance productivity and foster seamless collaboration among individuals. Built with the Vue 3 Composition API and Firebase, ViCo provides a robust platform for students, individuals and teams to work together in real-time and visualize ideas.

| Frontend      | Backend         | Database           | Tools                |
|---------------|-----------------|--------------------|----------------------|
|![Vue.js](https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vue.js&logoColor=4FC08D)|![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=white)|![Firebase Realtime Database](https://img.shields.io/badge/Firebase%20Realtime%20Database-FFCA28?style=for-the-badge&logo=firebase&logoColor=white)|![Pinia](https://img.shields.io/badge/Pinia-ffd859?style=for-the-badge&logo=pinia&logoColor=black) ![Fabric.js](https://img.shields.io/badge/Fabric.js-1E90FF?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjI1NiIgdmlld0JveD0iMCAwIDI0IDI0IiB3aWR0aD0iMjU2IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Ik0yMyAySDRjLTEuMSAwLTIgLjktMiAydjE2YzAgMS4xLjkgMiAyIDJoMThjMS4xIDAgMi0uOSAyLTJWMmMwLTEuMS0uOS0yLTItMnpNNCAwYy0xLjkgMC0zIDEuMS0zIDN2MThjMCAxLjguOSAzIDMgM2gxOGMxLjkgMCAzLTEuMSAzLTNWM2MwLTEuOC0xLjEtMy0zLTNINVptNC4yIDkuOGwxLjItLjQgMS4xLS4zLjc0IDEuOCAxLjEgMyAuNyAyLjktLjUtMi45Yy0uMS0uMi0uMS0uMy0uMS0uNGgxLjFjMS4xIDAgMi4yLS4xIDMuMS0uNC4zLS4xLjUtLjMgMS0uM2wuMS41LTIuNS45Yy0uOC4yLTEuNy4zLTIuNS4zSDkuN2wuNC0yem0xMi42LTZ2MWgtMnYtMWguMnoiLz48L3N2Zz4=)







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
