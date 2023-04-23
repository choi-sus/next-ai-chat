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
    await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: 'Please validate open ai api key.',
    });

    let response = NextResponse.json(
      { message: 'API key is valid' },
      { status: 200 },
    );

    response.cookies.set({
      name: 'key',
      value: apiKey,
      httpOnly: true,
      maxAge: 60 * 60,
    });

    return response;
  } catch (error) {
    const err = error as SystemError;

    return NextResponse.json({ error }, { status: err.response.status });
  }
}
