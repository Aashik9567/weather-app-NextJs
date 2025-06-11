import { NextResponse } from 'next/server';
import { weatherService } from '@/lib/api/weatherService';

export async function GET() {
  try {
    console.log('🧪 Testing Weather API connection...');
    
    // Test the API connection
    const testResult = await weatherService.testConnection();
    
    if (testResult.success) {
      // Get actual weather data for London
      const weatherData = await weatherService.getCurrentWeather('London');
      
      return NextResponse.json({
        success: true,
        message: 'Weather API is working perfectly! ✅',
        test: testResult,
        sampleData: {
          location: weatherData.location,
          temperature: weatherData.temperature,
          condition: weatherData.condition,
          timestamp: new Date().toISOString()
        },
        apiInfo: {
          user: 'Aashik9567',
          apiKey: '***' + process.env.WEATHER_API_KEY?.slice(-4),
          baseUrl: process.env.WEATHER_API_BASE_URL
        }
      });
    } else {
      return NextResponse.json({
        success: false,
        message: 'Weather API test failed ❌',
        error: testResult.message
      }, { status: 500 });
    }

  } catch (error: any) {
    console.error('❌ API Test Error:', error);
    
    return NextResponse.json({
      success: false,
      message: 'API test failed',
      error: error.message,
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}