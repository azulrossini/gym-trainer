-- Gym Trainer Database Schema
-- Run this SQL in your Supabase SQL Editor

-- Create exercises table
CREATE TABLE exercises (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  difficulty TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create routines table
CREATE TABLE routines (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  duration INTEGER NOT NULL,
  description TEXT NOT NULL,
  exercises JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create workouts table
CREATE TABLE workouts (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  routines JSONB NOT NULL DEFAULT '[]'::jsonb,
  total_duration INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better query performance
CREATE INDEX idx_exercises_category ON exercises(category);
CREATE INDEX idx_exercises_difficulty ON exercises(difficulty);
CREATE INDEX idx_routines_type ON routines(type);

-- Enable Row Level Security (RLS)
-- For now, we'll allow all operations (single user mode)
-- Later, we can restrict based on user authentication
ALTER TABLE exercises ENABLE ROW LEVEL SECURITY;
ALTER TABLE routines ENABLE ROW LEVEL SECURITY;
ALTER TABLE workouts ENABLE ROW LEVEL SECURITY;

-- Create policies to allow all operations (single user mode)
CREATE POLICY "Allow all operations on exercises" ON exercises FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations on routines" ON routines FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations on workouts" ON workouts FOR ALL USING (true) WITH CHECK (true);

-- Optional: Insert mock data
-- You can run this after creating the tables, or use the migration feature in the app

INSERT INTO exercises (id, name, description, category, difficulty) VALUES
  ('ex-1', 'Crunches', 'Basic ab exercise lying on your back', 'abs', 'beginner'),
  ('ex-2', 'Plank', 'Hold a push-up position on your forearms', 'core', 'beginner'),
  ('ex-3', 'Mountain Climbers', 'Dynamic core and cardio exercise', 'core', 'intermediate'),
  ('ex-4', 'Russian Twists', 'Seated oblique rotation exercise', 'abs', 'intermediate'),
  ('ex-5', 'Squats', 'Basic lower body exercise', 'legs', 'beginner'),
  ('ex-6', 'Lunges', 'Single-leg lower body exercise', 'legs', 'beginner'),
  ('ex-7', 'Jump Squats', 'Explosive squat variation', 'legs', 'advanced'),
  ('ex-8', 'Push-ups', 'Classic chest and tricep exercise', 'chest', 'beginner'),
  ('ex-9', 'Pull-ups', 'Back and bicep exercise', 'back', 'advanced'),
  ('ex-10', 'Dumbbell Curls', 'Bicep isolation exercise', 'arms', 'beginner'),
  ('ex-11', 'Shoulder Press', 'Overhead pressing movement', 'shoulders', 'intermediate'),
  ('ex-12', 'Burpees', 'Full body cardio exercise', 'cardio', 'intermediate'),
  ('ex-13', 'Jumping Jacks', 'Simple cardio warm-up', 'cardio', 'beginner');

INSERT INTO routines (id, name, type, duration, description, exercises) VALUES
  ('rt-1', 'Core Blast EMOM', 'EMOM', 12, 'Every minute on the minute core workout', 
   '[{"exerciseId":"ex-1","reps":20},{"exerciseId":"ex-2","duration":30},{"exerciseId":"ex-4","reps":15}]'::jsonb),
  ('rt-2', 'Lower Body AMRAP', 'AMRAP', 10, 'As many rounds as possible in 10 minutes',
   '[{"exerciseId":"ex-5","reps":15},{"exerciseId":"ex-6","reps":10},{"exerciseId":"ex-7","reps":8}]'::jsonb),
  ('rt-3', 'Upper Body Circuit', 'Just Minutes', 15, 'Timed upper body workout',
   '[{"exerciseId":"ex-8","reps":12},{"exerciseId":"ex-10","reps":15},{"exerciseId":"ex-11","reps":10}]'::jsonb),
  ('rt-4', 'Cardio Finisher', 'AMRAP', 8, 'High intensity cardio',
   '[{"exerciseId":"ex-12","reps":10},{"exerciseId":"ex-13","reps":20},{"exerciseId":"ex-3","reps":15}]'::jsonb),
  ('rt-5', 'Full Body EMOM', 'EMOM', 10, 'Every minute mixed movements',
   '[{"exerciseId":"ex-5","reps":12},{"exerciseId":"ex-8","reps":10},{"exerciseId":"ex-2","duration":30}]'::jsonb),
  ('rt-6', 'Quick Abs', 'Just Minutes', 8, 'Quick ab workout',
   '[{"exerciseId":"ex-1","reps":25},{"exerciseId":"ex-4","reps":20},{"exerciseId":"ex-2","duration":45}]'::jsonb);

INSERT INTO workouts (id, name, description, routines, total_duration, created_at) VALUES
  ('wk-1', 'Full Body Burner', 'Complete full body workout', '["rt-1","rt-2","rt-3"]'::jsonb, 37, '2026-03-01'),
  ('wk-2', 'Power Hour', 'High intensity training session', '["rt-4","rt-5","rt-6"]'::jsonb, 26, '2026-03-05');
