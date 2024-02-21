import { NextResponse, type NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  const ENDPOINT = 'https://emkc.org/api/v2/piston/execute';

  const { language, version, code } = await req.json();

  if (!language || !version || !code) {
    return NextResponse.json(
      { error: 'Missing language, version or code' },
      {
        status: 400
      }
    );
  }

  try {
    const response = await fetch(ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        language,
        version,
        files: [
          {
            name: 'src',
            content: `${code}`
          }
        ],
        compile_timeout: 10000,
        run_timeout: 5000,
        compile_memory_limit: -1,
        run_memory_limit: -1
      })
    });

    const data = await response.json();

    return NextResponse.json(
      { ...data },
      {
        status: 200
      }
    );
  } catch (error) {
    return NextResponse.json(
      { error },
      {
        status: 500
      }
    );
  }
}
