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

  const { members, message } = await request.json();

  const nickname = members?.map((character, _) => character.nickname);
  const isUser = members
    .filter((character, _) => character.position === 'user')
    .map((character, _) => `${character.nickname} is a user.`);
  const personalityTraits = members
    .filter((character, _) => character.position === 'ai')
    .map(
      (character, _) =>
        `The ${character.nickname} is ${character.personalityTraits.join(
          ', ',
        )}.`,
    );

  try {
    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: `The following is a conversation between a ${members.join(
        ' and ',
      )}. ${isUser} ${personalityTraits.join(' ')}\n\n ${message}`,
      temperature: 0.9,
      max_tokens: 150,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0.6,
      stop: [...nickname.map((name, _) => ` ${name}: `)],
    });

    return NextResponse.json(
      { data: response.data.choices[0].text },
      { status: 200 },
    );
  } catch (error) {
    const err = error as SystemError;

    return NextResponse.json({ error }, { status: err.response.status });
  }
}
