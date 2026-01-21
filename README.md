# Eliza Chat Application

A modern, responsive chat application built with **Vue 3**, **TypeScript**, and **ConnectRPC**.

## Features

- **Modular Architecture**: Separate logic (Composables) and UI (Components).
- **Persistent History**: Chat history is saved to LocalStorage.
- **Auto-scroll**: Smart scrolling that follows new messages.
- **Type Safety**: Fully typed with TypeScript.
- **Accessibility**: Aria-labels and proper semantic HTML.
- **Modern UI**: Styled with scoped CSS variables for easy theming.

## Project Setup

### Prerequisites

- Node.js (Latest LTS recommended)
- npm or yarn

### Installation

Install dependencies:

```sh
npm install
```

### Development

Start the development server:

```sh
npm run dev
```

Visit `http://localhost:5173` (or the URL shown in your terminal) to view the app.

## Architecture Overview

This project follows the **Modular Composable Architecture**:

- **`src/composables/`**: Contains business logic (`useChat`, `useLocalStorage`, `useAutoScroll`).
- **`src/components/`**: Pure UI components (`ChatHeader`, `ChatFooter`, `MessageList`).
- **`src/App.vue`**: The orchestrator that binds logic to UI.
- **`src/api/`**: Connection to the Eliza Service via ConnectRPC.
