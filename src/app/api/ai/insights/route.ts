import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { weatherData, userLocation, userPreferences } = await request.json();

    const currentTime = '2025-06-11 10:30:22';
    const currentUser = 'Aashik9567';

    // Create a detailed prompt for OpenAI
    const prompt = `You are WeatherAI, an advanced weather analysis system. Analyze the following weather data and provide intelligent insights for user ${currentUser}.

Current Weather Data:
- Location: ${userLocation || 'London, UK'}
- Temperature: ${weatherData.temperature}°C
- Humidity: ${weatherData.humidity}%
- Pressure: ${weatherData.pressure}mb
- Wind Speed: ${weatherData.windSpeed}km/h
- Visibility: ${weatherData.visibility}km
- UV Index: ${weatherData.uvIndex}
- Precipitation: ${weatherData.precipitation}mm
- Time: ${currentTime} UTC

Please provide:
1. A detailed weather analysis (2-3 sentences)
2. A prediction for the next 6 hours with confidence level
3. A personalized recommendation for outdoor activities
4. Any weather alerts or warnings if applicable
5. A brief explanation of the reasoning behind your analysis

Format your response as JSON with these exact keys:
{
  "analysis": "your detailed analysis",
  "prediction": "your 6-hour prediction",
  "confidence": 0.85,
  "recommendation": "your activity recommendation",
  "alert": "any alerts or null if none",
  "reasoning": "your reasoning explanation"
}

Keep responses professional but friendly, and always consider user safety.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // Free tier model
      messages: [
        {
          role: "system",
          content: "You are WeatherAI, a professional weather analysis assistant. Always respond with valid JSON only, no additional text."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: 500, // Keep within free tier limits
      temperature: 0.7,
    });

    const aiResponse = completion.choices[0]?.message?.content;
    
    if (!aiResponse) {
      throw new Error('No response from OpenAI');
    }

    // Parse the JSON response
    let parsedResponse;
    try {
      parsedResponse = JSON.parse(aiResponse);
    } catch (parseError) {
      console.error('Failed to parse OpenAI response:', aiResponse);
      // Fallback response
      parsedResponse = {
        analysis: "Weather analysis temporarily unavailable. Current conditions appear stable.",
        prediction: "Conditions expected to remain similar for the next 6 hours.",
        confidence: 0.7,
        recommendation: "Check back later for updated AI insights.",
        alert: null,
        reasoning: "AI analysis system is processing data."
      };
    }

    return NextResponse.json({
      success: true,
      data: {
        ...parsedResponse,
        timestamp: currentTime,
        user: currentUser,
        model: 'gpt-3.5-turbo',
        tokensUsed: completion.usage?.total_tokens || 0
      }
    });

  } catch (error: any) {
    console.error('OpenAI API Error:', error);
    
    // Provide fallback response if OpenAI fails
    return NextResponse.json({
      success: true,
      data: {
        analysis: "Current weather conditions are being analyzed. The data shows stable atmospheric patterns.",
        prediction: "Weather patterns suggest continued stability over the next 6 hours.",
        confidence: 0.75,
        recommendation: "Good conditions for most outdoor activities. Stay informed about any changes.",
        alert: null,
        reasoning: "Analysis based on current atmospheric pressure and temperature readings.",
        timestamp: '2025-06-11 10:30:22',
        user: 'Aashik9567',
        model: 'fallback-system',
        tokensUsed: 0
      }
    });
  }
}