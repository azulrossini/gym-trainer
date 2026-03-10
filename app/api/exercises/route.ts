import { NextRequest, NextResponse } from 'next/server';
import { exerciseService } from '@/services/exerciseService';

// GET /api/exercises - Get all exercises
export async function GET() {
  try {
    const exercises = await exerciseService.getAllExercises();
    return NextResponse.json(exercises);
  } catch (error) {
    console.error('GET /api/exercises error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch exercises' },
      { status: 500 }
    );
  }
}

// POST /api/exercises - Create a new exercise
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const exercise = await exerciseService.createExercise(body);
    return NextResponse.json(exercise, { status: 201 });
  } catch (error) {
    console.error('POST /api/exercises error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to create exercise' },
      { status: 400 }
    );
  }
}
