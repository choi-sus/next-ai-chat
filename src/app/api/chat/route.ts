import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { Configuration, OpenAIApi } from 'openai';

interface SystemError {
  response: { status: number };
}

export async function POST(request: NextRequest) {
  const apiKey = cookies().get('key') as unknown as string;

  if (!apiKey) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const configuration = new Configuration({
    apiKey,
  });
  const openai = new OpenAIApi(configuration);

  const { message } = await request.json();

  try {
    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: message,
    });
    console.log(response.data.choices[0].text);

    return NextResponse.json(
      { msg: response.data.choices[0].text },
      { status: 200 },
    );
  } catch (error) {
    const err = error as SystemError;

    return NextResponse.json({ error }, { status: err.response.status });
  }
}
