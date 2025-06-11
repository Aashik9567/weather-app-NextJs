import { NextRequest, NextResponse } from 'next/server';
import { weatherService } from '@/lib/api/weatherService';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');

    if (!query || query.length < 2) {
      return NextResponse.json({
        success: true,
        data: [],
        message: 'Query must be at least 2 characters long',
      });
    }

    const locations = await weatherService.searchLocations(query);

    return NextResponse.json({
      success: true,
      data: locations,
      timestamp: new Date().toISOString(),
    });

  } catch (error: any) {
    console.error('Location Search API Error:', error);
    
    return NextResponse.json(
      {
        success: false,
        error: {
          message: error.message || 'Failed to search locations',
          code: error.code || 500,
        },
      },
      { status: error.code || 500 }
    );
  }
}