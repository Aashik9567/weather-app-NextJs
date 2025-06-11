import { NextRequest, NextResponse } from 'next/server';
import { weatherService } from '@/lib/api/weatherService';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const location = searchParams.get('location');
    const days = searchParams.get('days') || '7';

    if (!location) {
      return NextResponse.json(
        { error: 'Location parameter is required' },
        { status: 400 }
      );
    }

    const daysNum = Math.min(Math.max(parseInt(days), 1), 10); // Limit to 1-10 days
    const forecastData = await weatherService.getForecast(location, daysNum);

    return NextResponse.json({
      success: true,
      data: forecastData,
      timestamp: new Date().toISOString(),
    });

  } catch (error: any) {
    console.error('Forecast API Error:', error);
    
    return NextResponse.json(
      {
        success: false,
        error: {
          message: error.message || 'Failed to fetch forecast data',
          code: error.code || 500,
        },
      },
      { status: error.code || 500 }
    );
  }
}