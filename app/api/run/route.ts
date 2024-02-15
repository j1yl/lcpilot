import { NextResponse, type NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  const ENDPOINT = 'https://emkc.org/api/v2/piston/execute';

  const { language, version, code } = await req.json();

  console.log(language, code);

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
        run_timeout: 3000,
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
