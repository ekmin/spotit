import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
const { GoogleGenerativeAI } = require("@google/generative-ai");

export async function GET() {
  const session = await getServerSession(authOptions);

  return NextResponse.json({ name: session?.user?.name ?? "Not Logged In" });
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (session) {
    const body = await req.json();
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `Answer the following prompt in this JSON format.[your opinion, {special tag, product title, array of key features, short description, price, resource links}, {special tag, product title, array of key features, short description, price, resource links}]. Give below is a product selected by the user and you have to give your opinion about the users choice and suggest 4 other products which are better than that in the same price range. In the short description you should say why it is better than the product choosed by user and show the difference. Product: ${body["product"]}`;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    const ftext = JSON.parse(text.replace(/`/g, "").split("json")[1]);

    return NextResponse.json(ftext);
  }
  return NextResponse.json("Not Logged in");
}

// In the short description you should say why it is better than the product choosed by user and show the dfifference.