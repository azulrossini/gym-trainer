import { NextRequest, NextResponse } from 'next/server';
import { workoutService } from '@/services/workoutService';

// GET /api/workouts - Get all workouts
export async function GET() {
  try {
    const workouts = await workoutService.getAllWorkouts();
    return NextResponse.json(workouts);
  } catch (error) {
    console.error('GET /api/workouts error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch workouts' },
      { status: 500 }
    );
  }
}

// POST /api/workouts - Create a new workout
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const workout = await workoutService.createWorkout(body);
    return NextResponse.json(workout, { status: 201 });
  } catch (error) {
    console.error('POST /api/workouts error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to create workout' },
      { status: 400 }
    );
  }
}
