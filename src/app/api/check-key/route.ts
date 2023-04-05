import { NextRequest, NextResponse } from 'next/server';
import { Configuration, OpenAIApi } from 'openai';

export async function POST(request: NextRequest) {
  const { apiKey } = await request.json();

  const configuration = new Configuration({
    apiKey,
  });
  const openai = new OpenAIApi(configuration);

  try {
    const response = await openai.createCompletion({
      model: 'text-davinci-001',
      prompt: 'Write a tagline for an ice cream shop.',
      temperature: 0.4,
      max_tokens: 64,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    const text = response.data.choices[0].text;

    return NextResponse.json({ message: 'API key is valid', text });
  } catch (error) {
    return new Response('Invalid API key', {
      status: 401,
    });
  }
}
