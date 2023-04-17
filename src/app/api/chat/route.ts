import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { Configuration, OpenAIApi } from 'openai';

interface SystemError {
  response: { status: number };
}

export async function POST(request: NextRequest) {
  const apiKey = cookies().get('key');

  if (!apiKey || !apiKey.value) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const configuration = new Configuration({
    apiKey: apiKey.value,
  });
  const openai = new OpenAIApi(configuration);

  const { message, model } = await request.json();

  try {
    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: `${model} : ${message}`,
      temperature: 0.9,
      max_tokens: 150,
      top_p: 1,
      frequency_penalty: 0.0,
      presence_penalty: 0.6,
      stop: ['\n'],
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
