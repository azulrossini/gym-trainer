import { NextRequest, NextResponse } from 'next/server';
import { exerciseService } from '@/services/exerciseService';

// GET /api/exercises/[id] - Get exercise by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const exercise = await exerciseService.getExerciseById(id);
    
    if (!exercise) {
      return NextResponse.json(
        { error: 'Exercise not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(exercise);
  } catch (error) {
    console.error(`GET /api/exercises/${id} error:`, error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch exercise' },
      { status: 500 }
    );
  }
}

// PUT /api/exercises/[id] - Update exercise
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const body = await request.json();
    const exercise = await exerciseService.updateExercise(id, body);
    return NextResponse.json(exercise);
  } catch (error) {
    console.error(`PUT /api/exercises/${id} error:`, error);
    const status = error instanceof Error && error.message === 'Exercise not found' ? 404 : 400;
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to update exercise' },
      { status }
    );
  }
}

// DELETE /api/exercises/[id] - Delete exercise
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    await exerciseService.deleteExercise(id);
    return NextResponse.json({ message: 'Exercise deleted successfully' });
  } catch (error) {
    console.error(`DELETE /api/exercises/${id} error:`, error);
    const status = error instanceof Error && error.message === 'Exercise not found' ? 404 : 500;
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to delete exercise' },
      { status }
    );
  }
}
