import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { image } = await req.json();

    const response = await openai.responses.create({
      model: "gpt-4.1-mini",
      input: [
        {
          role: "user",
          content: [
            {
              type: "input_text",
              text: "Describe this image in detail",
            },
            {
              type: "input_image",
              image_url: {
                url: `data:image/jpeg;base64,${image}`,
                detail: "auto",
              },
            },
          ],
        },
      ],
    });

    const caption =
      response.output_text || response.output?.[0]?.content?.[0]?.text || "";

    return NextResponse.json({ caption });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
