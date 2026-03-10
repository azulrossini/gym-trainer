import { NextRequest, NextResponse } from 'next/server';
import { routineService } from '@/services/routineService';

// GET /api/routines - Get all routines
export async function GET() {
  try {
    const routines = await routineService.getAllRoutines();
    return NextResponse.json(routines);
  } catch (error) {
    console.error('GET /api/routines error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch routines' },
      { status: 500 }
    );
  }
}

// POST /api/routines - Create a new routine
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const routine = await routineService.createRoutine(body);
    return NextResponse.json(routine, { status: 201 });
  } catch (error) {
    console.error('POST /api/routines error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to create routine' },
      { status: 400 }
    );
  }
}
