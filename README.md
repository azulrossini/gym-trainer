# Gym Trainer 💪

A modern, colorful web application for managing your gym workouts. Built with Next.js, React, TypeScript, Tailwind CSS, and Jotai for state management.

## Features

- **Exercise Management**: Create, edit, and delete exercises with categories (abs, core, legs, chest, back, arms, shoulders, cardio) and difficulty levels (beginner, intermediate, advanced)
- **Routine Builder**: Build workout routines using three types:
  - EMOM (Every Minute On the Minute)
  - AMRAP (As Many Rounds As Possible)
  - Just Minutes (Timed routines)
- **Workout Designer**: Create complete workouts by combining at least 3 routines with a total duration of 30-40 minutes
- **Workout Detail View**: View your workout in a beautiful 3-column layout showing all routines and their exercises
- **Persistent Storage**: All data is saved to localStorage using Jotai's atomWithStorage

## Tech Stack

- **Frontend Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS (custom color palette)
- **State Management**: Jotai
- **UI Components**: Custom React components with modular CSS files

## Project Structure

```
gym-trainer/
├── app/
│   ├── exercises/          # Exercises page
│   ├── routines/           # Routines page
│   ├── workouts/           # Workouts page and detail views
│   │   └── [id]/          # Dynamic workout detail page
│   ├── layout.tsx         # Root layout with Jotai Provider
│   ├── page.tsx           # Home page
│   └── globals.css        # Global Tailwind styles
├── components/
│   ├── ExerciseCard.tsx   # Exercise display card
│   ├── ExerciseForm.tsx   # Exercise creation/edit form
│   ├── ExerciseList.tsx   # Exercise list with search/filter
│   ├── RoutineCard.tsx    # Routine display card
│   ├── RoutineForm.tsx    # Routine creation/edit form
│   ├── RoutineList.tsx    # Routine list with search/filter
│   ├── WorkoutCard.tsx    # Workout display card
│   ├── WorkoutForm.tsx    # Workout creation/edit form
│   ├── WorkoutList.tsx    # Workout list with search
│   ├── WorkoutDetail.tsx  # 3-column workout detail view
│   ├── Navigation.tsx     # Navigation bar
│   └── *.css              # Component-specific CSS files
├── hooks/
│   ├── useExercises.ts    # Exercise CRUD operations
│   ├── useRoutines.ts     # Routine CRUD operations
│   └── useWorkouts.ts     # Workout CRUD operations
├── atoms/
│   └── index.ts           # Jotai atoms for state management
├── types/
│   └── index.ts           # TypeScript type definitions
├── data/
│   └── mockData.ts        # Initial mock data
└── package.json
```

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd gym-trainer
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

### Creating an Exercise

1. Navigate to the **Exercises** page
2. Click **Add Exercise**
3. Fill in the exercise name, description, category, and difficulty
4. Click **Create**

### Building a Routine

1. Navigate to the **Routines** page
2. Click **Add Routine**
3. Choose a name, type (EMOM/AMRAP/Just Minutes), and duration
4. Add exercises from your library with specific reps or durations
5. Click **Create**

### Designing a Workout

1. Navigate to the **Workouts** page
2. Click **Add Workout**
3. Enter a workout name and description
4. Select at least 3 routines (the total duration must be 30-40 minutes)
5. Click **Create**

### Viewing a Workout

1. Go to the **Workouts** page
2. Click **View Workout** on any workout card
3. See the 3-column layout displaying all routines and their exercises

## Color Palette

The app uses a modern, vibrant color scheme:

- **Primary (Blue)**: Main actions and primary elements
- **Accent (Purple/Magenta)**: Secondary actions and highlights
- **Success (Green)**: Positive feedback and success states
- **Category Colors**: Unique colors for each exercise category

## Data Persistence

All data (exercises, routines, workouts) is automatically saved to the browser's localStorage using Jotai's `atomWithStorage`. Your data persists across browser sessions.

## Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## License

This project is open source and available under the MIT License.

## Future Enhancements

- Add exercise images/videos
- Timer functionality for workout execution
- Workout history tracking
- Export/import workouts
- Social sharing features
- Progressive Web App (PWA) support
