import { NextRequest, NextResponse } from 'next/server';
import { Configuration, OpenAIApi } from 'openai';

export async function POST(request: NextRequest) {
  const { apiKey } = await request.json();

  const configuration = new Configuration({
    apiKey,
  });
  const openai = new OpenAIApi(configuration);

  try {
    const response = openai.createCompletion({
      model: 'text-davinci-003',
      prompt: 'Say this is a test',
      temperature: 0,
      max_tokens: 7,
    });

    return NextResponse.json({ message: 'API key is valid', response });
  } catch (error) {
    return new Response('Invalid API key', {
      status: 401,
    });
  }
}
