import { NextRequest, NextResponse } from 'next/server';
import { workoutService } from '@/services/workoutService';

// GET /api/workouts/[id] - Get workout by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const workout = await workoutService.getWorkoutById(id);
    
    if (!workout) {
      return NextResponse.json(
        { error: 'Workout not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(workout);
  } catch (error) {
    console.error(`GET /api/workouts/${id} error:`, error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch workout' },
      { status: 500 }
    );
  }
}

// PUT /api/workouts/[id] - Update workout
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const body = await request.json();
    const workout = await workoutService.updateWorkout(id, body);
    return NextResponse.json(workout);
  } catch (error) {
    console.error(`PUT /api/workouts/${id} error:`, error);
    const status = error instanceof Error && error.message === 'Workout not found' ? 404 : 400;
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to update workout' },
      { status }
    );
  }
}

// DELETE /api/workouts/[id] - Delete workout
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    await workoutService.deleteWorkout(id);
    return NextResponse.json({ message: 'Workout deleted successfully' });
  } catch (error) {
    console.error(`DELETE /api/workouts/${id} error:`, error);
    const status = error instanceof Error && error.message === 'Workout not found' ? 404 : 500;
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to delete workout' },
      { status }
    );
  }
}
