import { NextResponse } from "next/server";
import openai from "openai/index.js";

export const POST = async (req: Request) => {
  try {
    const { image } = await req.json();

    const response = await openai.responses.create({
      model: "gpt-4.1-mini",
      input: [
        {
          role: "user",
          content: [
            {
              type: "input_image",
              text: "Describe this image in detail",
            },
            {
              type: "input_image",
              image_url: `data:image/jpeg;base64,${image}`,
            },
          ],
        },
      ],
    });

    const caption = response.output_text;

    return NextResponse.json({ caption });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
