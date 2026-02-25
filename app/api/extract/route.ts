import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const { prompt } = await req.json();

  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-4.1-mini",
      input: ` ${prompt}`,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("OpenAI API error", response.status, errorText);
    return NextResponse.json({ error: errorText }, { status: response.status });
  }

  const data = await response.json();

  const test = data?.output?.[0]?.content?.[0]?.text ?? data?.output_text ?? "";

  const formattedText = test.replace(/\\n/g, "\n");

  return NextResponse.json(formattedText || "");
};
