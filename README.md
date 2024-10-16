# Ping Pong Ranking Dashboard

This project is a ping pong ranking website built using React and Next.js. Originally started as a Next.js dashboard tutorial, it has been customized to track and display ping pong game scores. The initial version was developed in PHP during college, and this is a revamped, modern version with a new tech stack.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Scripts](#scripts)
- [Dependencies](#dependencies)

## Features

- Log ping pong game scores for registered players
- Display overall player rankings and stats
- Secure authentication and user management with NextAuth
- Responsive design using Tailwind CSS
- UI icons provided by FontAwesome and Heroicons

## Tech Stack

- **Frontend:** React, Next.js, Tailwind CSS
- **Authentication:** NextAuth
- **Database:** Vercel Postgres
- **Utilities:** TypeScript, ESLint, Zod

## Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   ```
2. **Navigate into the project directory**:
   ```bash
   cd <project-directory>
   ```
3. **Install the dependencies**:

   ```bash
   npm install
   ```

4. **Set up environment variables**: Create a `.env` file in the root directory and configure the necessary environment variables for NextAuth and your database connection.

5. **Run the development server**:

   ```bash
   npm run dev
   ```

6. **Create the database**: Visit `http://localhost:3000/seed` in your browser to create the database (note: this does not seed data).

## Usage

- Visit `http://localhost:3000` to access the application locally.
- Log in or register to start logging your ping pong scores.
- Navigate through the dashboard to view player rankings and individual stats.

## Scripts

- **`npm run build`**: Builds the production-ready version of the app.
- **`npm run dev`**: Starts the development server.
- **`npm run start`**: Starts the production server.
- **`npm run lint`**: Lints the code using ESLint.

## Dependencies

Here is a breakdown of the key dependencies used in this project:

- **React & Next.js**: Core of the frontend and server-side rendering.
- **NextAuth**: For user authentication and session management.
- **Tailwind CSS**: For styling and responsive design.
- **Vercel Postgres**: Database for storing ping pong game data.
- **FontAwesome & Heroicons**: For UI icons and enhanced visual elements.
- **Zod**: Schema validation for TypeScript.

## Dev Dependencies

- **TypeScript**: Typed JavaScript for enhanced code reliability.
- **ESLint**: For code linting to maintain consistent code style.

## License

This project is licensed under the MIT License.
