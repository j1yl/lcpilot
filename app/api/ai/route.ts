import { NextResponse, type NextRequest } from 'next/server';
import fetch from 'node-fetch'; // Import fetch for making HTTP requests

export async function POST(req: NextRequest) {
  const GEMINI_ENDPOINT = 'GEMINI_API_ENDPOINT'; // Replace this with your Gemini API endpoint
  const GEMINI_API_KEY = 'GEMINI_API_KEY'; // Replace this with your Gemini API key

  // Extract language, version, and code from the request body
  const { language, version, code } = await req.json();

  // Check if language, version, and code are provided
  if (!language || !version || !code) {
    return NextResponse.json(
      { error: 'Missing language, version, or code' },
      { status: 400 }
    );
  }

  try {
    // Call your Gemini API endpoint with the provided code
    const response = await fetch(GEMINI_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${GEMINI_API_KEY}` // Include your API key in the Authorization header
      },
      body: JSON.stringify({
        source_code: code,
        language: language, // Ensure to pass language according to the Gemini API requirements
        version: version // Ensure to pass version according to the Gemini API requirements
      })
    });

    // Parse the response from the Gemini API
    const data = await response.json();

    // Extract suggestions from the Gemini response
    const { suggestions } = data;

    // Construct the response with suggestions and hint button
    const responseData = {
      suggestions,
      hint_button: 'Click here for a hint'
    };

    // Return the suggestions and hint button in the response
    return NextResponse.json(responseData, { status: 200 });
  } catch (error) {
    // Handle any errors that occur during the API call
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
