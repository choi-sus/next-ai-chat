import { NextRequest, NextResponse } from 'next/server';
import { Configuration, OpenAIApi } from 'openai';

interface SystemError {
  response: { status: number };
}

export async function POST(request: NextRequest) {
  const { apiKey } = await request.json();

  const configuration = new Configuration({
    apiKey,
  });
  const openai = new OpenAIApi(configuration);

  try {
    const completion = await openai.createCompletion({
      model: 'text-davinci-002',
      prompt: 'Please validate open ai api key.',
    });

    const result = completion.data.choices[0].text;

    return NextResponse.json({ message: 'API key is valid', result });
  } catch (error) {
    const err = error as SystemError;

    return NextResponse.json({ error }, { status: err.response.status });
  }
}
