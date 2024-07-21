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
    console.log(body["product"]);
    const prompt = `Answer the following prompt in this JSON format. {purpose_and_use: {description, examples[]}, specifications: {description, examples[]}, quality: {description, examples[]}, price: {description, examples[]}, brand: {description, examples[]}, ratings: {description, examples[]}, warranty: {description, examples[]}, availability: {description, examples[]}, terms: {description, examples[]}, conclusion: description}.Exclude '*'s. Given below is product type which a user who doesn't have any idea about the product wants to buy. Your task is to explain the user what are the things that should consider when buying it. If there are any new terms explain them too. Product: ${body["product"]}`;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    const ftext = JSON.parse(text.replace(/`/g, "").split("json")[1]);

    return NextResponse.json(ftext);
  }
  return NextResponse.json("Not Logged in");
}