import OpenAi from "openai";

export async function openaiTextToImage(prompt: string) {
  const openai = new OpenAi();

  const response = await openai.images.generate({
    model: "dall-e-3",
    prompt: prompt,
    size: "1024x1024",
    response_format: "b64_json",
    n: 1,
  });

  const ImageData = response?.data?.[0].b64_json;
  if (!ImageData) {
    console.error("No image data found");
    return;
  }
  const buffer = Buffer.from(ImageData, "base64");
  return;
}
