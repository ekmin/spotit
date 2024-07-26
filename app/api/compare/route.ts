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
    const prompt = `Answer the following prompt in this JSON format.[genaral_opinion, {special_tag, product_title, description, pros, cons, price, reviews, links}, {special tag, product title, description, pros, cons, price, reviews, links}]. Given below is a product selected by a user. Suggest 4 other products in the same price range which can be better than the product given product by provinding pros and cons over the user's choice as an array.In the general_opinion, provide a gerneral opinion of the product selected by the user by considering ratings and reviews given by the current users and the experts in the field of the user's product. And in the description, give an overview of the suggested product and reason to consider the suggested product over the users choice. In the reviews, you have to provide the experts and current users thoughts about the suggested product as a description. Product Type: ${body["model"]}, Product: ${body["productType"]}`;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    const ftext = JSON.parse(text.replace(/`/g, "").split("json")[1]);

    return NextResponse.json(ftext);
  }
  return NextResponse.json("Not Logged in");
}
