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
      model: 'text-davinci-002',
      prompt: 'Say this is a test',
      temperature: 0,
      max_tokens: 7,
    });

    const text = response.data.choices[0].text;

    return NextResponse.json({ message: 'API key is valid', text });
  } catch (error) {
    return NextResponse.json({ error }, { status: 401 });
  }
}
