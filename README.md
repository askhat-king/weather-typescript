# 🌦️ Weather Dashboard

A modern, responsive weather application built with **React**, **TypeScript**, and **Visual Crossing API**. This dashboard features real-time weather data, interactive map layers and a fully synchronized dark mode.

## 🚀 Features

* **Dynamic Location Search**: Search weather by city or click anywhere on the map to get custom coordinates.
* **Interactive Weather Maps**: Toggle between different weather layers including Precipitation, Wind Speed, and Cloud Cover.
* **Responsive Grid Layout**: A mobile-first design that adapts from a single-column stack on mobile to a multi-column dashboard on desktop.
* **Dark Mode Support**: Full dark/light theme integration using `Tailwind CSS` and `React Context`.
* **Smart Skeletons**: Smooth loading states using `TanStack Query` and custom `Skeleton` components.

---

## 🛠️ Tech Stack

* **Framework**: `React 19 (Vite)`
* **Language**: `TypeScript`
* **Styling**: `Tailwind CSS`
* **UI Components**: `shadcn/ui` (Radix UI primitives)
* **State Management & Data Fetching**: `TanStack Query v5`
* **Weather Data**: `Visual Crossing API`

---

## 📐 Responsive Architecture

The application uses a strategic **Tailwind Grid** system to ensure the dashboard feels native on all devices:

* **Mobile**: 1-column stack for readability.
* **Desktop**: 2-column layout pairing the Map with Current Weather.

---

## 🧠 What I Learned

### 1. Advanced TypeScript Patterns
Mastered type safety for API responses and component props.

### 2. React Design Patterns (Composition & Context)
* **Context API**: Implemented a `ThemeProvider` to manage global state without **"prop drilling."**
* **Component Composition**: Built a reusable `Card` wrapper that leverages Shadcn’s `cn` utility to allow custom styling via props.

### 3. Handling Complex API Logic
I learned how to manage **Map Tile Layers** and coordinate systems.

### 4. Performance with Suspense
Implemented **React Suspense** paired with `useSuspenseQuery`. This allowed me to decouple the data-fetching logic from the UI, resulting in a much cleaner component structure where **"Loading"** and **"Error"** states are handled by parent boundaries and Skeletons.

---

## 🔧 Installation

**Clone the repo:**
```bash
git clone https://github.com/your-username/weather-dashboard.git
```

**Install dependencies:**
```bash
npm install
```

**Set up Environment Variables:**
Create a `.env` file in the root and add your API key:
```env
VITE_WEATHER_API_KEY=your_visual_crossing_key
```

**Run Dev Server:**
```bash
npm run dev
```
