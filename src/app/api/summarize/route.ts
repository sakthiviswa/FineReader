// app/api/summarize/route.ts

import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { text } = await req.json();

  if (!text) {
    return NextResponse.json({ error: 'No input provided' }, { status: 400 });
  }

  try {
    const openaiRes = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          { role: 'system', content: 'You are a helpful summarizer.' },
          { role: 'user', content: `Summarize this text:\n\n${text}` }
        ],
        temperature: 0.5
      })
    });

    const data = await openaiRes.json();
    const summary = data.choices?.[0]?.message?.content || 'No summary generated';

    return NextResponse.json({ summary });
  } catch (err) {
    console.error('API error:', err);
    return NextResponse.json({ error: 'Failed to summarize' }, { status: 500 });
  }
}
