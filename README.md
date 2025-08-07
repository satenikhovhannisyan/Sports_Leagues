# React + Vite

Single-page application (SPA) that consumes the All Leagues API and displays the sports leagues with filtering options.
---------------------
Installation
npm install

Run the app
npm run dev
----------------------


AI TOOLS USED:

ChatGPT (OpenAI) + Github Copilot:  Used extensively for UI/UX layout suggestions, animation implementation, and for exploring best practices regarding component architecture and lightweight caching approaches suited for this app's size and nature.

CASHING LOGIC:

Since this is a small-scale test application, I implemented a simple custom caching mechanism using localStorage with TTL (Time-To-Live) logic. This method is not reliable for critical data since localStorage is not synchronized with backend updates in real time.
There’s a risk of displaying outdated information to users unless actively refreshed.
In a real-world app with larger data needs or pagination, I’d consider using TanStack Query for its powerful caching and async state management.

UI/UX DESIGN:

The UI was built using Material UI (MUI) components, balancing visual clarity and developer productivity.
I paid close attention to performance-related details—imported MUI components individually, avoiding full library imports to prevent unnecessary bundle size growth and avoid loading unused components.

TIME TAKEN

While the original estimation suggested the task could be completed in approximately 90 minutes, it took more time to research, iterate, and validate decisions throughout the process as it was important to me to evaluate different approaches before settling on solutions that are simple yet scalable, aiming to balance the task’s scope with production-level thinking.