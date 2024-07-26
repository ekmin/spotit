import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import authOptions from "@/app/services/authOptions";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function GET() {
  const session = await getServerSession(authOptions);

  return NextResponse.json({ name: session?.user?.name ?? "Not Logged In" });
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if(session) {
    const data = await req.json();
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `Answer the following prompt in this JSON format.[{special tag, product title, array of key features, short description, price, resource links}, {special tag, product title, array of key features, short description, price, resource links}]. Here the special tag is a keyword use to compare each device from each other, such as 'best all rounder', 'best camera phone', 'best value'. Given are some requirements needed by a user from a product, provide 4 products that matches the user requirement. Product type: ${data["productType"]}, Requirements: ${data["requirements"]} Other Cases: ${data["otherCases"]} currency: ${data["currency"]}`
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    const ftext = JSON.parse(text.replace(/`/g, "").split("json")[1]);
  
    return NextResponse.json(ftext);
  }
  return NextResponse.json("Not Logged in");
}
