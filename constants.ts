// constants.ts - Centralized string constants for the Gym Trainer application

export const APP_CONSTANTS = {
  APP_NAME: 'Gym Trainer',
  APP_TITLE: 'Gym Trainer - Your Personal Workout Manager',
  APP_DESCRIPTION: 'Create and manage your exercises, routines, and workouts',
  APP_TAGLINE: 'Your personal workout management system',
  APP_WELCOME: 'Welcome to Gym Trainer',
  APP_FULL_DESCRIPTION: 'Your ultimate workout management system. Create exercises, build routines, and design complete workouts tailored to your fitness goals.',
};

export const NAVIGATION = {
  HOME: 'Home',
  EXERCISES: 'Exercises',
  ROUTINES: 'Routines',
  WORKOUTS: 'Workouts',
};

export const PAGES = {
  EXERCISES: {
    TITLE: 'Exercises',
    DESCRIPTION: 'Create and manage your exercise library',
    DETAIL_DESCRIPTION: 'Manage your exercise library. Create, edit, and organize exercises by category and difficulty.',
  },
  ROUTINES: {
    TITLE: 'Routines',
    DESCRIPTION: 'Build routines from your exercises',
    DETAIL_DESCRIPTION: 'Create and manage your workout routines. Combine exercises into EMOM, AMRAP, or timed routines.',
  },
  WORKOUTS: {
    TITLE: 'Workouts',
    DESCRIPTION: 'Complete workout programs combining multiple routines',
    DETAIL_DESCRIPTION: 'Design complete workout sessions. Combine at least 3 routines into 30-40 minute workouts.',
  },
  HOME: {
    EXERCISES_CARD: {
      EMOJI: '🏋️',
      TITLE: 'Exercises',
      DESCRIPTION: 'Create and manage your exercise library with categories, difficulty levels, and detailed descriptions.',
    },
    ROUTINES_CARD: {
      EMOJI: '📋',
      TITLE: 'Routines',
      DESCRIPTION: 'Build EMOM, AMRAP, or timed routines by combining your exercises into effective training sequences.',
    },
    WORKOUTS_CARD: {
      EMOJI: '🔥',
      TITLE: 'Workouts',
      DESCRIPTION: 'Design complete 30-40 minute workouts by combining at least 3 routines for a full training session.',
    },
    HOW_IT_WORKS: {
      TITLE: 'How It Works',
      STEP_1: {
        TITLE: 'Create Exercises',
        DESCRIPTION: 'Build your exercise library with different categories (abs, legs, cardio, etc.) and difficulty levels.',
      },
      STEP_2: {
        TITLE: 'Build Routines',
        DESCRIPTION: 'Combine exercises into EMOM, AMRAP, or timed routines with specific reps and durations.',
      },
      STEP_3: {
        TITLE: 'Design Workouts',
        DESCRIPTION: 'Create full workouts by selecting at least 3 routines that total 30-40 minutes of training.',
      },
    },
  },
};

export const FORMS = {
  EXERCISE: {
    TITLE_NEW: 'Add New Exercise',
    TITLE_EDIT: 'Edit Exercise',
    FIELD_NAME: 'Exercise Name',
    FIELD_NAME_PLACEHOLDER: 'e.g., Push-ups',
    FIELD_DESCRIPTION: 'Description',
    FIELD_DESCRIPTION_PLACEHOLDER: 'Describe how to perform this exercise...',
    FIELD_CATEGORY: 'Category',
    FIELD_DIFFICULTY: 'Difficulty',
    BUTTON_CREATE: 'Create',
    BUTTON_UPDATE: 'Update',
    BUTTON_CANCEL: 'Cancel',
  },
  ROUTINE: {
    TITLE_NEW: 'Add New Routine',
    TITLE_EDIT: 'Edit Routine',
    FIELD_NAME: 'Routine Name',
    FIELD_NAME_PLACEHOLDER: 'e.g., Morning Cardio',
    FIELD_TYPE: 'Type',
    FIELD_DURATION: 'Duration (minutes)',
    FIELD_DESCRIPTION: 'Description (optional)',
    FIELD_DESCRIPTION_PLACEHOLDER: 'Describe this routine...',
    FIELD_EXERCISES: 'Exercises',
    BUTTON_ADD_EXERCISE: 'Add Exercise',
    BUTTON_REMOVE: 'Remove',
    BUTTON_CREATE: 'Create',
    BUTTON_UPDATE: 'Update',
    BUTTON_CANCEL: 'Cancel',
    PLACEHOLDER_REPS: 'Reps',
    PLACEHOLDER_SECONDS: 'Seconds',
    MESSAGE_NO_EXERCISES: 'No exercises added yet',
    MESSAGE_ADD_EXERCISE_FIRST: 'Please add at least one exercise to the routine',
    MESSAGE_CREATE_EXERCISES_FIRST: 'Please create some exercises first',
  },
  WORKOUT: {
    TITLE_NEW: 'Add New Workout',
    TITLE_EDIT: 'Edit Workout',
    FIELD_NAME: 'Workout Name',
    FIELD_NAME_PLACEHOLDER: 'e.g., Monday Morning Blast',
    FIELD_DESCRIPTION: 'Description (optional)',
    FIELD_DESCRIPTION_PLACEHOLDER: 'Describe this workout...',
    FIELD_ROUTINES: 'Select Routines (minimum 3)',
    LABEL_TOTAL_DURATION: 'Total',
    LABEL_REQUIRED_DURATION: '(30-40 min required)',
    MESSAGE_NO_ROUTINES: 'No routines available. Please create some routines first.',
    MESSAGE_SELECT_MINIMUM: 'Please select at least 3 routines (currently',
    MESSAGE_MIN_ROUTINES: 'A workout must have at least 3 routines',
    MESSAGE_DURATION_ERROR: 'Total duration must be between 30-40 minutes. Current:',
    BUTTON_CREATE: 'Create',
    BUTTON_UPDATE: 'Update',
    BUTTON_CANCEL: 'Cancel',
    LABEL_ROUTINE_INFO: 'exercises',
  },
};

export const CARDS = {
  EXERCISE: {
    BUTTON_EDIT: 'Edit',
    BUTTON_DELETE: 'Delete',
  },
  ROUTINE: {
    BUTTON_EDIT: 'Edit',
    BUTTON_DELETE: 'Delete',
    LABEL_DURATION: 'min',
    LABEL_EXERCISES: 'exercises',
  },
  WORKOUT: {
    BUTTON_EDIT: 'Edit',
    BUTTON_DELETE: 'Delete',
    BUTTON_VIEW: 'View Details',
    LABEL_ROUTINES: 'routines',
    LABEL_DURATION: 'min',
  },
};

export const LISTS = {
  BUTTON_ADD: 'Add',
  SEARCH_PLACEHOLDER: 'Search',
  FILTER_ALL: 'All',
  MESSAGE_NO_ITEMS: 'No items found',
  MESSAGE_NO_ITEMS_CREATE: 'Create your first',
};

export const WORKOUT_DETAIL = {
  BACK_LINK: 'Back to Workouts',
  BUTTON_START: 'Start Workout',
  LABEL_ROUTINES: 'Routines',
  LABEL_TOTAL_DURATION: 'minutes total',
  LABEL_EXERCISES: 'Exercises',
  MESSAGE_NO_ROUTINES: 'No routines found for this workout',
  MESSAGE_NOT_FOUND: 'Workout Not Found',
  MESSAGE_NOT_FOUND_DETAIL: 'The workout youre looking for doesnt exist.',
  LABEL_REPS: 'reps',
  LABEL_SECONDS: 's',
};

export const WORKOUT_SESSION = {
  COMPLETION: {
    EMOJI: '🎉',
    TITLE: 'Workout Complete!',
    MESSAGE_COMPLETED: 'Completed',
    MESSAGE_ROUTINES: 'routines in',
    MESSAGE_MINUTES: 'minutes',
    BUTTON_BACK: 'Back to Workout',
  },
  HEADER: {
    LABEL_ROUTINE: 'Routine',
    LABEL_OF: 'of',
    BUTTON_EXIT: 'Exit',
  },
  TIMER: {
    LABEL_MINUTES: 'minutes',
    BUTTON_SAVE: 'Save',
    BUTTON_CANCEL: 'Cancel',
    BUTTON_EDIT: 'Edit Time',
  },
  CONTROLS: {
    BUTTON_START: 'Start',
    BUTTON_PAUSE: 'Pause',
    BUTTON_RESUME: 'Resume',
    BUTTON_SKIP_TO_END: 'Skip to End',
    BUTTON_PREVIOUS: 'Previous',
    BUTTON_NEXT: 'Next Routine',
    BUTTON_SKIP_ROUTINE: 'Skip Routine',
    BUTTON_FINISH: 'Finish Workout',
  },
  ROUTINE_TYPES: {
    EMOM: {
      FULL_NAME: 'EMOM - Every Minute On the Minute',
      EMOJI: '⏱️',
      DESCRIPTION: 'Complete exercises at the start of each minute. You will hear a beep every minute.',
    },
    AMRAP: {
      FULL_NAME: 'AMRAP - As Many Rounds As Possible',
      EMOJI: '🔁',
      DESCRIPTION: 'Complete as many rounds of the exercises as possible within the time limit.',
    },
    JUST_MINUTES: {
      FULL_NAME: 'Just Minutes - Timed Workout',
      EMOJI: '⏰',
      DESCRIPTION: 'Work through the exercises at your own pace within the time limit.',
    },
  },
  LABEL_EXERCISES: 'Exercises',
  LABEL_REPS: 'reps',
  LABEL_SECONDS: 's',
};

export const CONFIRM_DIALOG = {
  DELETE_EXERCISE: {
    TITLE: 'Delete Exercise',
    MESSAGE: 'Are you sure you want to delete this exercise? This action cannot be undone.',
    CONFIRM: 'Delete',
    CANCEL: 'Cancel',
  },
  DELETE_ROUTINE: {
    TITLE: 'Delete Routine',
    MESSAGE: 'Are you sure you want to delete this routine? This action cannot be undone.',
    CONFIRM: 'Delete',
    CANCEL: 'Cancel',
  },
  DELETE_WORKOUT: {
    TITLE: 'Delete Workout',
    MESSAGE: 'Are you sure you want to delete this workout? This action cannot be undone.',
    CONFIRM: 'Delete',
    CANCEL: 'Cancel',
  },
};

export const EXERCISE_CATEGORIES = {
  ABS: 'abs',
  CORE: 'core',
  LEGS: 'legs',
  CHEST: 'chest',
  BACK: 'back',
  ARMS: 'arms',
  SHOULDERS: 'shoulders',
  CARDIO: 'cardio',
} as const;

export const EXERCISE_DIFFICULTIES = {
  BEGINNER: 'beginner',
  INTERMEDIATE: 'intermediate',
  ADVANCED: 'advanced',
} as const;

export const ROUTINE_TYPES = {
  EMOM: 'EMOM',
  AMRAP: 'AMRAP',
  JUST_MINUTES: 'Just Minutes',
} as const;

export const ARIA_LABELS = {
  TOGGLE_MENU: 'Toggle menu',
  TOGGLE_THEME: 'Toggle theme',
  SWITCH_TO_LIGHT: 'Switch to light mode',
  SWITCH_TO_DARK: 'Switch to dark mode',
};

export const TIME_FORMAT = {
  MINUTES: 'min',
  SECONDS: 's',
};
