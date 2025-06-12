'use client';

import { useState, useCallback } from 'react';

interface OpenAiInsight {
  analysis: string;
  prediction: string;
  confidence: number;
  recommendation: string;
  alert: string | null;
  reasoning: string;
  timestamp: string;
  user: string;
  model: string;
  tokensUsed: number;
}

interface UseOpenAIResponse {
  insight: OpenAiInsight | null;
  loading: boolean;
  error: string | null;
  generateInsight: (weatherData: any, userLocation?: string) => Promise<void>;
  tokensUsedToday: number;
}

export function useOpenAI(): UseOpenAIResponse {
  const [insight, setInsight] = useState<OpenAiInsight | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [tokensUsedToday, setTokensUsedToday] = useState(0);

  const generateInsight = useCallback(async (weatherData: any, userLocation?: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/ai/insights', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          weatherData,
          userLocation: userLocation || 'London, UK',
          userPreferences: {
            user: 'Aashik9567',
            interests: ['outdoor_activities', 'photography', 'travel']
          }
        }),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'Failed to generate AI insight');
      }

      setInsight(data.data);
      setTokensUsedToday(prev => prev + (data.data.tokensUsed || 0));

      console.log('✅ OpenAI Insight Generated:', {
        user: data.data.user,
        model: data.data.model,
        tokens: data.data.tokensUsed,
        timestamp: data.data.timestamp
      });

    } catch (error: any) {
      console.error('❌ OpenAI Error:', error);
      setError(error.message || 'Failed to generate AI insight');
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    insight,
    loading,
    error,
    generateInsight,
    tokensUsedToday
  };
}