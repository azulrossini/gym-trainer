'use client';

import { useState, useEffect, useRef } from 'react';
import { Workout, Routine } from '@/types';
import { useRoutines } from '@/hooks/useRoutines';
import { useExercises } from '@/hooks/useExercises';
import { audioManager } from '@/utils/audio';
import './WorkoutSession.css';

interface WorkoutSessionProps {
  workout: Workout;
  onExit: () => void;
}

type SessionStatus = 'ready' | 'running' | 'paused' | 'complete';

export default function WorkoutSession({ workout, onExit }: WorkoutSessionProps) {
  const { getRoutineById } = useRoutines();
  const { getExerciseById } = useExercises();
  
  const [currentRoutineIndex, setCurrentRoutineIndex] = useState(0);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [status, setStatus] = useState<SessionStatus>('ready');
  const [isEditingTime, setIsEditingTime] = useState(false);
  const [editTimeValue, setEditTimeValue] = useState('');
  
  const intervalRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const lastMinuteRef = useRef(0);

  const routines = workout.routines
    .map(id => getRoutineById(id))
    .filter((r): r is Routine => r !== undefined);

  const currentRoutine = routines[currentRoutineIndex];
  const currentRoutineDurationSeconds = currentRoutine ? currentRoutine.duration * 60 : 0;
  const isRoutineComplete = elapsedSeconds >= currentRoutineDurationSeconds;
  const allRoutinesComplete = currentRoutineIndex >= routines.length;

  // Timer logic
  useEffect(() => {
    if (status === 'running' && !allRoutinesComplete) {
      intervalRef.current = setInterval(() => {
        setElapsedSeconds(prev => {
          const next = prev + 1;
          
          // EMOM: Beep every minute
          if (currentRoutine?.type === 'EMOM') {
            const currentMinute = Math.floor(next / 60);
            if (currentMinute > lastMinuteRef.current && currentMinute < currentRoutine.duration) {
              audioManager.playIntervalBeep();
              lastMinuteRef.current = currentMinute;
            }
          }
          
          // Check if routine is complete
          if (next >= currentRoutineDurationSeconds) {
            // Play appropriate sound based on routine type
            if (currentRoutine?.type === 'EMOM') {
              audioManager.playEMOMCompleteSound();
            } else {
              audioManager.playRoutineCompleteSound();
            }
            setStatus('paused');
            return next;
          }
          
          return next;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [status, currentRoutineDurationSeconds, currentRoutine, allRoutinesComplete]);

  // Handle routine completion
  useEffect(() => {
    if (isRoutineComplete && status === 'running') {
      setStatus('paused');
    }
  }, [isRoutineComplete, status]);

  const handleStart = () => {
    setStatus('running');
  };

  const handlePause = () => {
    setStatus('paused');
  };

  const handleResume = () => {
    setStatus('running');
  };

  const handleNextRoutine = () => {
    if (currentRoutineIndex < routines.length - 1) {
      setCurrentRoutineIndex(prev => prev + 1);
      setElapsedSeconds(0);
      lastMinuteRef.current = 0;
      setStatus('ready');
    } else {
      // Workout complete
      audioManager.playWorkoutCompleteSound();
      setStatus('complete');
    }
  };

  const handlePreviousRoutine = () => {
    if (currentRoutineIndex > 0) {
      setCurrentRoutineIndex(prev => prev - 1);
      setElapsedSeconds(0);
      lastMinuteRef.current = 0;
      setStatus('ready');
    }
  };

  const handleEditTime = () => {
    const wasRunning = status === 'running';
    if (wasRunning) {
      setStatus('paused');
    }
    setIsEditingTime(true);
    setEditTimeValue(Math.floor(elapsedSeconds / 60).toString());
  };

  const handleSaveTime = () => {
    const minutes = parseInt(editTimeValue) || 0;
    const newSeconds = minutes * 60;
    if (newSeconds >= 0 && newSeconds <= currentRoutineDurationSeconds) {
      setElapsedSeconds(newSeconds);
      lastMinuteRef.current = minutes - 1;
    }
    setIsEditingTime(false);
  };

  const handleSkipToEnd = () => {
    setElapsedSeconds(currentRoutineDurationSeconds);
    setStatus('paused');
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getProgressPercentage = () => {
    return (elapsedSeconds / currentRoutineDurationSeconds) * 100;
  };

  if (allRoutinesComplete || status === 'complete') {
    return (
      <div className="workout-session min-h-screen bg-gradient-to-br from-success-50 via-white to-accent-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 md:p-12 max-w-2xl w-full text-center">
          <div className="text-4xl md:text-6xl mb-4 md:mb-6">🎉</div>
          <h1 className="text-2xl md:text-4xl font-bold text-gray-800 dark:text-white mb-3 md:mb-4">Workout Complete!</h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-2">
            {workout.name}
          </p>
          <p className="text-base md:text-lg text-gray-500 dark:text-gray-400 mb-6 md:mb-8">
            Completed {routines.length} routines in {workout.totalDuration} minutes
          </p>
          <button
            onClick={onExit}
            className="px-6 md:px-8 py-2 md:py-3 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-lg text-base md:text-lg transition-colors"
          >
            Back to Workout
          </button>
        </div>
      </div>
    );
  }

  if (!currentRoutine) {
    return null;
  }

  const routineTypeColors = {
    'EMOM': 'from-primary-500 to-primary-600',
    'AMRAP': 'from-accent-500 to-accent-600',
    'Just Minutes': 'from-success-500 to-success-600',
  };

  return (
    <div className="workout-session min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-4 md:py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 mb-4 md:mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">{workout.name}</h1>
            <p className="text-sm md:text-base text-gray-600 dark:text-gray-300">
              Routine {currentRoutineIndex + 1} of {routines.length}
            </p>
          </div>
          <button
            onClick={onExit}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-medium rounded-lg transition-colors text-sm md:text-base"
          >
            Exit
          </button>
        </div>

        {/* Progress Indicators */}
        <div className="flex gap-2 mb-8">
          {routines.map((routine, index) => (
            <div
              key={routine.id}
              className={`routine-indicator flex-1 h-2 rounded-full transition-all ${
                index < currentRoutineIndex
                  ? 'bg-success-500 dark:bg-success-600'
                  : index === currentRoutineIndex
                  ? 'bg-primary-500 dark:bg-primary-600'
                  : 'bg-gray-300 dark:bg-gray-600'
              } ${index === currentRoutineIndex ? 'active' : ''}`}
            />
          ))}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8">
          {/* Left: Timer and Controls */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-4 md:p-8">
            <div className={`bg-gradient-to-r ${routineTypeColors[currentRoutine.type]} text-white rounded-xl p-4 md:p-6 mb-4 md:mb-6`}>
              <h2 className="text-xl md:text-3xl font-bold mb-2">{currentRoutine.name}</h2>
              <div className="flex justify-between items-center text-sm md:text-lg">
                <span className="font-medium">{currentRoutine.type}</span>
                <span className="font-semibold">{currentRoutine.duration} min</span>
              </div>
            </div>

            {/* Timer Display */}
            <div className="text-center mb-6 md:mb-8">
              <div className="mb-4">
                {isEditingTime ? (
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
                    <input
                      type="number"
                      min="0"
                      max={currentRoutine.duration}
                      value={editTimeValue}
                      onChange={(e) => setEditTimeValue(e.target.value)}
                      className="w-20 md:w-24 px-3 md:px-4 py-2 text-xl md:text-2xl border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg text-center"
                      autoFocus
                    />
                    <span className="text-lg md:text-2xl text-gray-600 dark:text-gray-300">minutes</span>
                    <div className="flex gap-2">
                      <button
                        onClick={handleSaveTime}
                        className="px-3 md:px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 text-sm md:text-base"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setIsEditingTime(false)}
                        className="px-3 md:px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 text-sm md:text-base"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className={`timer-display text-6xl md:text-8xl font-bold ${status === 'running' ? 'text-primary-600' : 'text-gray-700 dark:text-gray-200'}`}>
                      {formatTime(elapsedSeconds)}
                    </div>
                    <div className="text-xl md:text-2xl text-gray-500 dark:text-gray-400 mt-2">
                      / {formatTime(currentRoutineDurationSeconds)}
                    </div>
                    <button
                      onClick={handleEditTime}
                      className="text-xs md:text-sm text-primary-600 dark:text-primary-400 hover:text-primary-800 dark:hover:text-primary-300 hover:underline mt-2 cursor-pointer"
                    >
                      Edit Time
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 mb-6 overflow-hidden">
              <div
                className={`h-full bg-gradient-to-r ${routineTypeColors[currentRoutine.type]} transition-all duration-1000 ${
                  status === 'running' ? 'pulse-animation' : ''
                }`}
                style={{ width: `${Math.min(getProgressPercentage(), 100)}%` }}
              />
            </div>

            {/* Control Buttons */}
            <div className="flex flex-col sm:flex-row gap-2 md:gap-3 justify-center mb-3 md:mb-4">
              {status === 'ready' && (
                <button
                  onClick={handleStart}
                  className="control-button px-6 md:px-8 py-3 md:py-4 bg-success-600 hover:bg-success-700 text-white font-bold rounded-lg text-lg md:text-xl transition-colors"
                >
                  ▶ Start
                </button>
              )}
              {status === 'running' && (
                <button
                  onClick={handlePause}
                  className="control-button px-6 md:px-8 py-3 md:py-4 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-lg text-lg md:text-xl transition-colors"
                >
                  ⏸ Pause
                </button>
              )}
              {status === 'paused' && !isRoutineComplete && (
                <button
                  onClick={handleResume}
                  className="control-button px-6 md:px-8 py-3 md:py-4 bg-success-600 hover:bg-success-700 text-white font-bold rounded-lg text-lg md:text-xl transition-colors"
                >
                  ▶ Resume
                </button>
              )}
              {status !== 'running' && !isRoutineComplete && (
                <button
                  onClick={handleSkipToEnd}
                  className="control-button px-4 md:px-6 py-3 md:py-4 bg-gray-400 hover:bg-gray-500 text-white font-medium rounded-lg transition-colors text-sm md:text-base"
                >
                  Skip to End
                </button>
              )}
            </div>

            {/* Routine Navigation */}
            <div className="flex flex-col sm:flex-row gap-2 md:gap-3 justify-center">
              <button
                onClick={handlePreviousRoutine}
                disabled={currentRoutineIndex === 0}
                className="px-4 md:px-6 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm md:text-base"
              >
                ← Previous
              </button>
              {isRoutineComplete && (
                <button
                  onClick={handleNextRoutine}
                  className="px-4 md:px-6 py-2 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-lg transition-colors text-sm md:text-base"
                >
                  {currentRoutineIndex === routines.length - 1 ? 'Finish Workout ✓' : 'Next Routine →'}
                </button>
              )}
              {!isRoutineComplete && currentRoutineIndex < routines.length - 1 && (
                <button
                  onClick={handleNextRoutine}
                  className="px-4 md:px-6 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-medium rounded-lg transition-colors text-sm md:text-base"
                >
                  Skip Routine →
                </button>
              )}
            </div>

            {/* Routine Type Info */}
            <div className="bg-blue-50 dark:bg-blue-900 dark:bg-opacity-30 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <h3 className="font-semibold text-blue-900 dark:text-blue-300 mb-1">
                {currentRoutine.type === 'EMOM' ? '⏱️ EMOM - Every Minute On the Minute' : (currentRoutine.type === 'AMRAP' ? '🔁 AMRAP - As Many Rounds As Possible' : '⏰ Just Minutes - Timed Workout')}
              </h3>
              <p className="text-sm text-blue-700 dark:text-blue-400">
                {currentRoutine.type === 'EMOM' ? 'Complete exercises at the start of each minute. You will hear a beep every minute.' : (currentRoutine.type === 'AMRAP' ? 'Complete as many rounds of the exercises as possible within the time limit.' : 'Work through the exercises at your own pace within the time limit.')}
              </p>
            </div>
          </div>

          {/* Right: Exercise List */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-4 md:p-8">
            <h3 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white mb-4 md:mb-6">
              Exercises ({currentRoutine.exercises.length})
            </h3>
            <div className="space-y-3 max-h-[600px] overflow-y-auto">
              {currentRoutine.exercises.map((ex, idx) => {
                const exercise = getExerciseById(ex.exerciseId);
                if (!exercise) return null;

                return (
                  <div
                    key={idx}
                    className="exercise-checklist-item border border-gray-200 dark:border-gray-700 rounded-lg p-3 md:p-4"
                  >
                    <div className="flex items-start gap-2 md:gap-3">
                      <div className="flex-shrink-0 w-7 h-7 md:w-8 md:h-8 bg-primary-100 dark:bg-primary-900 dark:bg-opacity-50 text-primary-700 dark:text-primary-300 rounded-full flex items-center justify-center font-bold text-sm md:text-base">
                        {idx + 1}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-800 dark:text-white text-base md:text-lg">{exercise.name}</h4>
                        <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 mb-2">{exercise.description}</p>
                        <div className="flex gap-2 flex-wrap">
                          {ex.reps && (
                            <span className="text-xs md:text-sm bg-blue-100 dark:bg-blue-900 dark:bg-opacity-50 text-blue-800 dark:text-blue-300 px-2 md:px-3 py-1 rounded-full font-semibold">
                              {ex.reps} reps
                            </span>
                          )}
                          {ex.duration && (
                            <span className="text-xs md:text-sm bg-purple-100 dark:bg-purple-900 dark:bg-opacity-50 text-purple-800 dark:text-purple-300 px-2 md:px-3 py-1 rounded-full font-semibold">
                              {ex.duration}s
                            </span>
                          )}
                          <span className="text-xs md:text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 md:px-3 py-1 rounded-full">
                            {exercise.category}
                          </span>
                          <span className="text-xs md:text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 md:px-3 py-1 rounded-full">
                            {exercise.difficulty}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
