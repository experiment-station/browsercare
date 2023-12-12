import { env } from '@/env.mjs';
import { OpenAIStream, StreamingTextResponse } from 'ai';
import { OpenAI } from 'openai';

export const runtime = 'edge';

const openai = new OpenAI({
  apiKey: env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  const { messages } = (await req.json()) as {
    messages: OpenAI.Chat.ChatCompletionCreateParamsStreaming['messages'];
  };

  const response = await openai.chat.completions.create({
    messages,
    model: 'gpt-3.5-turbo',
    stream: true,
  });

  const stream = OpenAIStream(response);

  return new StreamingTextResponse(stream);
}
