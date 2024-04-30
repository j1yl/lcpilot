import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

export async function POST(req: NextRequest) {
  const { code, problemName, description, language } = await req.json();

  if (!code) {
    return NextResponse.json(
      {
        message: 'Bad'
      },
      {
        status: 400
      }
    );
  }

  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    const prompt = "Give me a hint to " + problemName + ". " + description + "This is my code using " + language + ".\n" + code;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    return NextResponse.json(
      {
        text: text
      },
      {
        status: 200
      }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        errror: error
      },
      {
        status: 200
      }
    );
  }
}
