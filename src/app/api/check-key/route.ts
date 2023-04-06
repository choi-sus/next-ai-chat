import { NextRequest, NextResponse } from 'next/server';
import { Configuration, OpenAIApi } from 'openai';

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

    const text = completion.data.choices[0].text;

    return NextResponse.json({ message: 'API key is valid', text });
  } catch (error) {
    return NextResponse.json({ error }, { status: 401 });
  }
}
