# Task Master — Frontend

## Description

A **Task Management System** designed to help users stay organized and productive.  
This application allows individuals to create accounts, manage projects, and perform full CRUD (Create, Read, Update, Delete) operations on both projects and tasks.

## Features

- **User Authentication**  
  Secure account creation and login system to personalize task management.

- **Project Management**

  - Create new projects
  - View project details
  - Update project information
  - Delete projects when no longer needed

- **Task Management**

  - Add tasks to specific projects
  - Edit task details (name, description, status)
  - Mark tasks as done,todo or in-progress
  - Delete tasks to keep projects clean

- **Status Tracking**  
  Monitor progress with task statuses like _in-progress_, _done_, or _todo_.

- **Responsive Design**  
  Works seamlessly across desktop and mobile devices.

## Backend Repo

[Task Master Backend Repo Link](https://github.com/belunatic/task-master-backend-project)

## Tech

- React — UI library
- TypeScript — static types (optional; replace with JavaScript if preferred)
- Vite — dev tooling and bundling
- React Router — client-side routing
- State management — React Context / Redux / Zustand (pick one)
- Axios — HTTP client for API calls
- Tailwind CSS / Sass / CSS Modules — styling (choose one)

## Quick Start

1. Clone the repo `https://github.com/belunatic/task-master-frontend-project`
2. Install dependencies: `npm install`
3. create an `.env` file on the root and add this `VITE_BACKEND_URL = http://localhost:4000`
4. Start dev server: `npm run dev`

## Dependencies

- Tailwindcss
- Vite
- Typescript
- jwtDecode
- React-Route-Dom
- Axios
- React
