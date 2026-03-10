# Gym Trainer 💪

A modern, professional web application for managing your gym workouts. Built with Next.js, React, TypeScript, and Supabase, featuring a clean 3-tier architecture with repository pattern for maintainability and scalability.

## ✨ Features

### 🏋️ Workout Management
- **Exercise Library**: Create, edit, and delete exercises with 8 categories (abs, core, legs, chest, back, arms, shoulders, cardio) and 3 difficulty levels (beginner, intermediate, advanced)
- **Routine Builder**: Build workout routines using three types:
  - **EMOM** (Every Minute On the Minute) - Complete exercises at the start of each minute
  - **AMRAP** (As Many Rounds As Possible) - Maximum rounds within time limit
  - **Just Minutes** - Timed routines at your own pace
- **Workout Designer**: Create complete workouts by combining at least 3 routines (30-40 minutes total)
- **3-Column Detail View**: Beautiful layout showing routines and their exercises

### ⏱️ Live Workout Sessions
- **Interactive Timer**: Real-time countdown with pause/resume functionality
- **Audio Cues**: Beeps for EMOM intervals, completion sounds for routine endings
- **Automatic Progression**: Seamlessly moves through routines
- **Editable Timer**: Adjust time on the fly during workouts
- **Progress Tracking**: Visual indicators showing workout completion

### 🎨 User Experience
- **Dark/Light Theme**: System-aware with manual toggle, persistent across sessions
- **Mobile Responsive**: Optimized for all screen sizes with hamburger menu
- **PWA Support**: Install as app on iOS/Android with custom icons
- **Custom Confirm Dialogs**: Beautiful, themed confirmation popups
- **Loading States**: Visual feedback for all operations

### 💾 Data Persistence
- **🔵 Supabase Backend** (recommended): 
  - Cloud PostgreSQL database
  - Automatic backups
  - RESTful API architecture
  - Access from any device
- **🟡 localStorage Fallback**: Browser-only storage when Supabase isn't configured

### 🏗️ Architecture
- **Repository Pattern**: Clean separation of concerns
- **3-Tier Architecture**: Handlers → Services → Repositories
- **Type-Safe**: Full TypeScript coverage
- **Business Logic Validation**: Enforced rules at service layer
- **RESTful API**: Standard endpoints for all operations

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 15 (App Router, Turbopack)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS (custom palette, dark mode)
- **State Management**: Jotai with localStorage persistence
- **UI Components**: Custom React components with modular CSS

### Backend
- **Database**: Supabase (PostgreSQL)
- **ORM**: Supabase Client
- **API**: Next.js API Routes (RESTful)
- **Architecture**: Repository Pattern with Service Layer

### Additional
- **Audio**: Web Audio API for workout timers
- **Icons**: Apple Touch Icons for PWA
- **Validation**: Business logic in service layer

## 📁 Project Structure

```
gym-trainer/
├── app/
│   ├── api/                     # API Routes (Handlers)
│   │   ├── exercises/
│   │   │   ├── route.ts         # GET, POST /api/exercises
│   │   │   └── [id]/route.ts   # GET, PUT, DELETE /api/exercises/:id
│   │   ├── routines/
│   │   │   ├── route.ts         # GET, POST /api/routines
│   │   │   └── [id]/route.ts   # GET, PUT, DELETE /api/routines/:id
│   │   └── workouts/
│   │       ├── route.ts         # GET, POST /api/workouts
│   │       └── [id]/route.ts   # GET, PUT, DELETE /api/workouts/:id
│   ├── exercises/               # Exercises page
│   ├── routines/                # Routines page
│   ├── workouts/                # Workouts page
│   │   └── [id]/               # Dynamic workout detail page
│   ├── layout.tsx              # Root layout with theme & Jotai
│   ├── page.tsx                # Home page
│   └── globals.css             # Global Tailwind styles
│
├── services/                    # Business Logic Layer
│   ├── exerciseService.ts      # Exercise validation & business rules
│   ├── routineService.ts       # Routine validation & business rules
│   └── workoutService.ts       # Workout validation & business rules
│
├── repositories/                # Data Access Layer
│   ├── exerciseRepository.ts   # Exercise database operations
│   ├── routineRepository.ts    # Routine database operations
│   └── workoutRepository.ts    # Workout database operations
│
├── components/                  # React Components
│   ├── ExerciseCard/           # Exercise display card
│   ├── ExerciseForm/           # Exercise creation/edit form
│   ├── ExerciseList/           # Exercise list with search/filter
│   ├── RoutineCard/            # Routine display card
│   ├── RoutineForm/            # Routine creation/edit form
│   ├── RoutineList/            # Routine list with search/filter
│   ├── WorkoutCard/            # Workout display card
│   ├── WorkoutForm/            # Workout creation/edit form
│   ├── WorkoutList/            # Workout list with search
│   ├── WorkoutDetail/          # 3-column workout detail view
│   ├── WorkoutSession/         # Live workout session timer
│   ├── Navigation/             # Navigation bar with theme toggle
│   ├── ThemeToggle/            # Dark/light mode toggle
│   └── ConfirmDialog/          # Custom confirmation dialog
│
├── hooks/                       # React Hooks
│   ├── useExercises.ts         # Exercise CRUD (calls API)
│   ├── useRoutines.ts          # Routine CRUD (calls API)
│   └── useWorkouts.ts          # Workout CRUD (calls API)
│
├── lib/
│   └── supabase.ts             # Supabase client configuration
│
├── utils/
│   └── audio.ts                # Audio manager for workout sounds
│
├── atoms/
│   └── index.ts                # Jotai atoms for state management
│
├── types/
│   └── index.ts                # TypeScript type definitions
│
├── data/
│   └── mockData.ts             # Initial mock data (13 exercises, 6 routines, 2 workouts)
│
├── constants.ts                 # Centralized UI strings
├── supabase-setup.sql          # Database schema & initial data
└── public/
    ├── favicon.ico             # Browser favicon
    ├── icon.png                # PWA icon
    └── apple-touch-icon.png    # iOS home screen icon
```

## 🏛️ Architecture

The app follows a clean **3-tier architecture**:

```
┌─────────────────────────────────────────┐
│     Frontend (React Components)         │
│            useExercises Hook             │
└──────────────┬──────────────────────────┘
               │ HTTP Requests
┌──────────────▼──────────────────────────┐
│      API Routes (HTTP Handlers)          │
│    /api/exercises, /api/routines, etc.  │
└──────────────┬──────────────────────────┘
               │ Method Calls
┌──────────────▼──────────────────────────┐
│      Services (Business Logic)           │
│  Validation, ID generation, rules        │
└──────────────┬──────────────────────────┘
               │ CRUD Operations
┌──────────────▼──────────────────────────┐
│    Repositories (Data Access)            │
│      Supabase client queries             │
└──────────────┬──────────────────────────┘
               │ SQL Queries
┌──────────────▼──────────────────────────┐
│       Supabase PostgreSQL DB             │
└──────────────────────────────────────────┘
```

**Benefits**:
- ✅ Clean separation of concerns
- ✅ Easy to test (mock any layer)
- ✅ Maintainable (change one layer without affecting others)
- ✅ Type-safe end-to-end
- ✅ Reusable services

See [ARCHITECTURE.md](./ARCHITECTURE.md) for detailed documentation.

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ installed
- **npm** or yarn package manager
- **(Optional)** Supabase account for cloud database

### Quick Start

1. **Clone the repository**:
```bash
git clone <repository-url>
cd gym-trainer
```

2. **Install dependencies**:
```bash
npm install
```

3. **Choose your backend**:

#### Option A: Use Supabase (Recommended)
Follow the [5-minute setup guide](./QUICK_START.md) or detailed [Supabase setup](./SUPABASE_SETUP.md):
- Create Supabase project
- Run `supabase-setup.sql` in SQL Editor
- Create `.env.local` with credentials:
  ```env
  NEXT_PUBLIC_SUPABASE_URL=your-project-url
  NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
  ```

#### Option B: Use localStorage (No setup required)
Skip Supabase setup - the app will automatically use browser localStorage.

4. **Run the development server**:
```bash
npm run dev
```

5. **Open [http://localhost:3000](http://localhost:3000)** in your browser

## 📖 Usage Guide

### Creating an Exercise

1. Navigate to the **Exercises** page
2. Click **Add Exercise** button
3. Fill in the form:
   - **Name**: Exercise name (e.g., "Push-ups")
   - **Description**: How to perform it
   - **Category**: abs, core, legs, chest, back, arms, shoulders, or cardio
   - **Difficulty**: beginner, intermediate, or advanced
4. Click **Create**

### Building a Routine

1. Navigate to the **Routines** page
2. Click **Add Routine**
3. Enter routine details:
   - **Name**: Routine name
   - **Type**: EMOM, AMRAP, or Just Minutes
   - **Duration**: Minutes (e.g., 12)
   - **Description**: What this routine focuses on
4. Add exercises:
   - Select an exercise from your library
   - Enter reps (e.g., 20) OR duration (e.g., 30 seconds)
   - Click **Add Exercise**
   - Repeat for all exercises
5. Click **Create**

### Designing a Workout

1. Navigate to the **Workouts** page
2. Click **Add Workout**
3. Enter workout info:
   - **Name**: Workout name (e.g., "Full Body Burner")
   - **Description**: Workout overview
4. Select routines:
   - Choose at least 3 routines
   - Total duration must be 30-40 minutes
5. Click **Create**

### Performing a Workout

1. Go to **Workouts** page
2. Click **View Workout** on any workout card
3. Click **Start Workout** button
4. The session begins:
   - **Timer** counts down for each routine
   - **Audio cues** play for EMOM intervals
   - **Edit Time** if needed
   - **Skip to End** to finish routine early
   - **Next Routine** when complete
5. Complete all routines to finish!

## 🎨 Color Palette

The app uses a modern, vibrant color scheme optimized for both themes:

- **Primary (Blue)**: Main actions and primary elements (`#3b82f6`)
- **Accent (Purple/Magenta)**: Secondary actions and highlights (`#a855f7`)
- **Success (Green)**: Positive feedback and success states (`#10b981`)
- **Category Colors**: Unique colors for each exercise category
- **Dark Mode**: Carefully tuned for comfortable viewing

## 🔌 API Endpoints

The app provides RESTful API endpoints for all operations:

### Exercises
- `GET /api/exercises` - List all exercises
- `POST /api/exercises` - Create new exercise
- `GET /api/exercises/:id` - Get single exercise
- `PUT /api/exercises/:id` - Update exercise
- `DELETE /api/exercises/:id` - Delete exercise

### Routines
- `GET /api/routines` - List all routines
- `POST /api/routines` - Create new routine
- `GET /api/routines/:id` - Get single routine
- `PUT /api/routines/:id` - Update routine
- `DELETE /api/routines/:id` - Delete routine

### Workouts
- `GET /api/workouts` - List all workouts
- `POST /api/workouts` - Create new workout
- `GET /api/workouts/:id` - Get single workout
- `PUT /api/workouts/:id` - Update workout
- `DELETE /api/workouts/:id` - Delete workout

## 💾 Data Persistence

### With Supabase (Recommended)
- ✅ Cloud database (PostgreSQL)
- ✅ Automatic backups
- ✅ Access from any device
- ✅ Production-ready
- ✅ Free tier available

### With localStorage (Fallback)
- ✅ Works without internet
- ✅ No setup required
- ⚠️ Data stored per browser
- ⚠️ Cleared if browser data is cleared

The app automatically detects which mode to use based on environment variables.

## 🔒 Business Logic & Validation

The service layer enforces business rules:

### Exercises
- Name and description required
- Valid category and difficulty
- All fields must be non-empty

### Routines
- Name and description required
- Valid type (EMOM, AMRAP, Just Minutes)
- Duration must be > 0
- At least 1 exercise
- Each exercise needs reps OR duration

### Workouts
- Name and description required
- Minimum 3 routines
- Total duration 30-40 minutes

## 📜 Scripts

### Development
```bash
npm run dev          # Start development server with Turbopack
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

### Testing
```bash
# Test API endpoints (with server running)
curl http://localhost:3000/api/exercises
curl http://localhost:3000/api/routines
curl http://localhost:3000/api/workouts
```

## 📚 Documentation

- **[QUICK_START.md](./QUICK_START.md)** - 5-minute Supabase setup guide
- **[SUPABASE_SETUP.md](./SUPABASE_SETUP.md)** - Detailed Supabase configuration
- **[ARCHITECTURE.md](./ARCHITECTURE.md)** - Complete architecture documentation
- **[REPOSITORY_PATTERN_SUMMARY.md](./REPOSITORY_PATTERN_SUMMARY.md)** - Repository pattern overview

## 🧪 Example Data

The app includes mock data to get you started:
- **13 Exercises**: Covering all categories and difficulties
- **6 Routines**: Examples of EMOM, AMRAP, and Just Minutes
- **2 Workouts**: Complete workout examples

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file in the project root:

```env
# Supabase Configuration (optional)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

**Note**: Without these variables, the app will use localStorage automatically.

### Customization

- **Colors**: Edit `tailwind.config.ts` to change the color palette
- **Mock Data**: Modify `data/mockData.ts` to change initial data
- **Validation Rules**: Update `services/*.ts` to change business logic
- **UI Strings**: Edit `constants.ts` to change all UI text

## 🚢 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in [Vercel Dashboard](https://vercel.com)
3. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Deploy!

The app is optimized for Vercel with:
- ✅ Static page generation
- ✅ API routes
- ✅ Automatic builds
- ✅ Edge network

### Other Platforms

The app can be deployed to any platform supporting Next.js:
- Netlify
- Railway
- AWS Amplify
- DigitalOcean App Platform

See Next.js deployment docs for platform-specific guides.

## 🤝 Contributing

Contributions are welcome! This project follows best practices:

- **TypeScript** for type safety
- **Repository Pattern** for clean architecture
- **ESLint** for code quality
- **Tailwind CSS** for styling
- **Component isolation** for maintainability

## 📄 License

This project is open source and available under the MIT License.

## 🎯 Roadmap

### Current Features
- ✅ Full CRUD for exercises, routines, workouts
- ✅ Live workout sessions with audio
- ✅ Dark/light theme
- ✅ Mobile responsive
- ✅ PWA support
- ✅ Supabase integration
- ✅ Repository pattern architecture

### Planned Enhancements
- 🔜 User authentication (multi-user support)
- 🔜 Workout history tracking
- 🔜 Progress analytics and charts
- 🔜 Exercise images/videos
- 🔜 Export/import workouts (JSON)
- 🔜 Social sharing features
- 🔜 Workout templates library
- 🔜 Rest timer between sets
- 🔜 Calendar view for workout planning

## 🙏 Acknowledgments

Built with:
- [Next.js](https://nextjs.org/) - React framework
- [Supabase](https://supabase.com/) - Backend & database
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Jotai](https://jotai.org/) - State management
- [TypeScript](https://www.typescriptlang.org/) - Type safety

## 📞 Support

For questions or issues:
1. Check the [documentation files](./SUPABASE_SETUP.md)
2. Review [ARCHITECTURE.md](./ARCHITECTURE.md) for technical details
3. Open an issue on GitHub

---

**Made with 💪 for fitness enthusiasts**
