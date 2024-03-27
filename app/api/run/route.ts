import { NextResponse, type NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  const ENDPOINT = 'https://emkc.org/api/v2/piston/execute';

  const { language, code, problem_name, testcases } = await req.json();

  console.log(req);

  if (!language || !code || !problem_name || !testcases) {
    return NextResponse.json(
      { error: 'Missing language, version or code' },
      { status: 400 }
    );
  }

  const [langVersion, fullCode] = runnableCode(problem_name, language, code);

  try {
    const response = await fetch(ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        language: language,
        version: langVersion,
        files: [
          {
            name: 'src',
            content: `${fullCode}`
          }
        ],
        stdin: "",
        // args: testcases.map((testcase: {
        //   in: string;
        //   out: string;
        // }[]) => testcase.in),
        args: testcases.map((t: {
          in: string;
          out: string;
        }) => (
          t.in
        )),
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

const runnableCode = (title: string, language: string, theirCode: string) => {

  let newCode:string = "";
  let version:string = "";

  switch (language) {
    case 'cpp':
      version = "10.2.0";
      newCode = theirCode + `

      int main() {
      \t` + title + `(process.argv);
      \treturn 0;
      }`;
      break;
    case 'python':
      version = "3.10.0";
      newCode = theirCode + "\n\n" + title + `(process.argv)`;
      break;
    case 'java':
      version = "15.0.2"; 
      newCode = theirCode + "\n\npublic static void main(String[] args) {\t" + title + "(process.argv);\n}";
      break;
    case 'typescript':
      version = "5.0.3";
      newCode = theirCode + "\n\n" + title + `(process.argv)`;
      break;
    default:
      newCode = theirCode;
  }
  return [version, newCode];
}
