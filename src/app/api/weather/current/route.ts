import { NextRequest, NextResponse } from 'next/server';
import { weatherService } from '@/lib/api/weatherService';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const location = searchParams.get('location');
    const lat = searchParams.get('lat');
    const lon = searchParams.get('lon');

    if (!location && (!lat || !lon)) {
      return NextResponse.json(
        { error: 'Location parameter or lat/lon coordinates are required' },
        { status: 400 }
      );
    }

    let weatherData;
    
    if (lat && lon) {
      weatherData = await weatherService.getWeatherByCoords(
        parseFloat(lat),
        parseFloat(lon)
      );
    } else {
      weatherData = await weatherService.getCurrentWeather(location!);
    }

    return NextResponse.json({
      success: true,
      data: weatherData,
      timestamp: new Date().toISOString(),
    });

  } catch (error: any) {
    console.error('Weather API Error:', error);
    
    return NextResponse.json(
      {
        success: false,
        error: {
          message: error.message || 'Failed to fetch weather data',
          code: error.code || 500,
        },
      },
      { status: error.code || 500 }
    );
  }
}