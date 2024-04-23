import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const ENDPOINT = 'https://emkc.org/api/v2/piston/execute';

  const { language, code, problem_name, testcases } = await req.json();

  if (!language || !code || !problem_name || !testcases) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  try {
    const [version, template] = generateRunnableCode(problem_name, language, code, testcases);

    const response = await fetch(ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        language: language,
        version: version,
        files: [
          {
            name: 'src',
            content: template
          }
        ],
        stdin: '',
        args: [],
        compile_timeout: 10000,
        run_timeout: 5000,
        compile_memory_limit: -1,
        run_memory_limit: -1
      })
    });

    const data = await response.json();

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

function generateRunnableCode(
  problem_name: string,
  language: string,
  code: string,
  testcases: string
) {
  let version = '';
  let template = '';

  switch (language) {
    case 'python':
      version = '3.10.0';
      template = [
        code,
        'def run_test_cases():',
        '  testcases = ' + JSON.stringify(testcases),
        '  for testcase in testcases:',
        "    input = testcase['in']",
        "    expected = testcase['out']",
        '    result = ' + problem_name + '(*input)',
        '    print(f"Input: {input}, Expected: {expected}, Got: {result}")',
        "if __name__ == '__main__':",
        '  run_test_cases()'
      ].join('\n');
      break;
    default:
      throw new Error('Unsupported language');
  }

  return [version, template];
}
