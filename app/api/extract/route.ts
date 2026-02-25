import { NextResponse } from "next/server";
import { text } from "stream/consumers";

export const POST = async (req: Request) => {
  const { prompt } = await req.json();

  const response = await fetch("http://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-4.1-mini",
      Input: `Extract the following information from the text: ${prompt}      `,
    }),
  });
  if (!response.ok) {
    const errorText = await response.text();
    console.error("HF API error", response.status, errorText);
  }

  const data = await response.json();
  const test = data.output[0].content[0].text;

  const formattedText = test.replace(/\\n/g, "\n");

  return NextResponse.json(formattedText || "");
};
