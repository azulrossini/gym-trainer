# Workout Session Feature

## Overview
Added a complete workout execution system with timers, audio cues, and routine navigation.

## Features Added

### 1. **Start Workout Button**
- Located on the workout detail page (e.g., `/workouts/wk-2`)
- Large, prominent green button with "🏋️ Start Workout" text
- Launches the workout session interface

### 2. **Workout Session Interface**

#### Timer System
- **Real-time countdown timer** showing current elapsed time
- **Progress bar** with animated pulse effect
- **Editable time**: Click "Edit Time" to jump to any minute in the routine
- **Auto-advance**: Automatically shows completion when routine time expires

#### Audio Cues
- **EMOM Beeps**: For EMOM routines, plays a beep sound every minute
- **Routine Complete**: Plays a 3-tone completion sound when routine finishes
- **Workout Complete**: Plays a victory fanfare when all routines are done

#### Controls
- **Start**: Begin the routine timer
- **Pause**: Pause the timer mid-routine
- **Resume**: Resume from paused state
- **Skip to End**: Jump to the end of current routine
- **Previous/Next**: Navigate between routines
- **Exit**: Return to workout detail page

### 3. **Routine Progress**
- Visual progress indicators showing which routine you're on
- Routine counter (e.g., "Routine 2 of 3")
- Color-coded progress bars:
  - Green: Completed routines
  - Blue: Current routine
  - Gray: Upcoming routines

### 4. **Exercise Display**
- Full list of exercises for current routine displayed on the right
- Shows exercise details: name, description, reps, duration, category, difficulty
- Numbered list for easy reference
- Scrollable area for long exercise lists

### 5. **Routine Type Information**
- Info box explaining the current routine type:
  - **EMOM**: "Every Minute On the Minute" - beeps every minute
  - **AMRAP**: "As Many Rounds As Possible" - complete cycles in time limit
  - **Just Minutes**: Timed workout at your own pace

### 6. **Completion Screen**
- Celebration screen with confetti emoji (🎉)
- Summary of completed workout
- "Back to Workout" button

## Technical Implementation

### Files Created/Modified

**New Files:**
- `utils/audio.ts` - Web Audio API manager for beeps and sounds
- `components/WorkoutSession.tsx` - Main workout session component
- `components/WorkoutSession.css` - Session-specific styles

**Modified Files:**
- `components/WorkoutDetail.tsx` - Added onStartWorkout callback and button
- `app/workouts/[id]/page.tsx` - Added session state management

### Audio System
Uses Web Audio API to generate:
- Interval beeps (800Hz sine wave)
- Completion sounds (3 ascending tones)
- Victory fanfare (C-E-G-C chord progression)

### Timer Logic
- Uses `setInterval` for accurate second-by-second countdown
- Tracks minute changes for EMOM beeps
- Automatically pauses on routine completion
- Prevents timer from running past routine duration

### State Management
- Session status: ready, running, paused, complete
- Current routine index tracking
- Elapsed seconds tracking
- Editable time mode with validation

## User Flow

1. User navigates to workout detail page
2. Clicks "Start Workout" button
3. **For each routine:**
   - Sees routine name, type, and duration
   - Views exercise list
   - Clicks "Start" to begin timer
   - Timer counts up with progress bar
   - EMOM routines beep every minute
   - Can pause/resume or edit time as needed
   - Completes routine (auto or manual)
   - Clicks "Next Routine" to continue
4. After final routine, sees completion screen
5. Returns to workout detail page

## Responsive Design
- Mobile-friendly single column layout
- Desktop shows timer (left) and exercises (right) side-by-side
- Touch-friendly large buttons
- Scrollable exercise lists

## Future Enhancements
- Exercise completion checkboxes
- Rest timer between routines
- Workout history logging
- Custom interval sounds
- Voice announcements
- Haptic feedback (mobile)
