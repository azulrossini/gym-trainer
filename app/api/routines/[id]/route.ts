import { NextRequest, NextResponse } from 'next/server';
import { routineService } from '@/services/routineService';

// GET /api/routines/[id] - Get routine by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const routine = await routineService.getRoutineById(id);
    
    if (!routine) {
      return NextResponse.json(
        { error: 'Routine not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(routine);
  } catch (error) {
    console.error(`GET /api/routines/${id} error:`, error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch routine' },
      { status: 500 }
    );
  }
}

// PUT /api/routines/[id] - Update routine
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const body = await request.json();
    const routine = await routineService.updateRoutine(id, body);
    return NextResponse.json(routine);
  } catch (error) {
    console.error(`PUT /api/routines/${id} error:`, error);
    const status = error instanceof Error && error.message === 'Routine not found' ? 404 : 400;
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to update routine' },
      { status }
    );
  }
}

// DELETE /api/routines/[id] - Delete routine
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    await routineService.deleteRoutine(id);
    return NextResponse.json({ message: 'Routine deleted successfully' });
  } catch (error) {
    console.error(`DELETE /api/routines/${id} error:`, error);
    const status = error instanceof Error && error.message === 'Routine not found' ? 404 : 500;
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to delete routine' },
      { status }
    );
  }
}
