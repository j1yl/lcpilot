// things I did
//
//I changed loading for running code and added loading for hint button
//copied onClick function for running code to hint code

//Things to do
//
//still need to update payload to incude description (how do i get the description)
//somehow get my data returned from route to display in Pilot tab
'use client';

import React, { useEffect, useState } from 'react';
import Editor from '@monaco-editor/react';
import { type editor } from 'monaco-editor';
import { Button } from './Button';
import LoadingDots from './LoadingDots';
import { ExecutionResult } from '@/types/executionResult';

enum SupportedLanguages {
  // cpp = 'cpp',
  python = 'python'
  // java = 'java',
  // typescript = 'typescript'
}

type TestCase = {
  in: any[];
  out: any[];
};

type Props = {
  language?: SupportedLanguages;
  className?: string;
  functionName: string;
  params?: string;
  testcases: TestCase[];
  onChange?: (value: string | undefined, event: editor.IModelContentChangedEvent) => void;
  setExecutionResult: React.Dispatch<React.SetStateAction<ExecutionResult>>;
  setTabIndex?: React.Dispatch<React.SetStateAction<number>>;
};

export default function CodeEditor({
  testcases,
  params,
  functionName,
  onChange,
  setExecutionResult
}: Props) {
  const starterCodes = {
    cpp: '#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello, C++!" << endl;\n    return 0;\n}',
    python: `def ${functionName}(${params}):\n    pass`,
    java: 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, Java!");\n    }\n}',
    typescript: 'console.log("Hello, TypeScript!");'
  };

  const [currentLanguage, setCurrentLanguage] = useState<SupportedLanguages>(
    SupportedLanguages.python
  );
  const [codeValue, setCodeValue] = useState<string>(starterCodes[currentLanguage]);
  const [runLoading, setRunLoading] = useState<boolean>(false);

  const [hintLoading, setHintLoading] = useState<boolean>(false);

  const getHint = async () => {
    setHintLoading(true);
    const payload = {
      language: currentLanguage,
      code: codeValue,
      problem_name: functionName,
    };

    try {
      const response = await fetch('/api/ai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      setExecutionResult(data);
      setHintLoading(false);
    } catch (error) {
      setHintLoading(false);
    }
  };


  const runCode = async () => {
    setRunLoading(true);
    const payload = {
      language: currentLanguage,
      code: codeValue,
      problem_name: functionName,
      testcases: testcases
    };

    try {
      const response = await fetch('/api/run', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      setExecutionResult(data);
      setRunLoading(false);
    } catch (error) {
      setRunLoading(false);
    }
  };

  useEffect(() => {
    setCodeValue(starterCodes[currentLanguage]);
  }, [currentLanguage]);

  return (
    <div className="flex h-full flex-col relative">
      <div className="flex w-full justify-between bg-neutral-900">
        <select
          id="language_selector"
          className="rounded border border-transparent bg-transparent px-2 text-xs shadow-xl hover:cursor-pointer hover:bg-neutral-700 focus:outline-none"
          onChange={(e) => setCurrentLanguage(e.target.value as SupportedLanguages)}
          value={currentLanguage}
        >
          {Object.entries(SupportedLanguages).map(([key, value]) => (
            <option key={key} value={value}>
              {value[0].toUpperCase() + value.slice(1)}
            </option>
          ))}
        </select>
        <Button
          className="border border-transparent hover:cursor-pointer hover:bg-neutral-700"
          type="button"
          title="Reset to default code"
          onClick={() => setCodeValue(starterCodes[currentLanguage])}
        >
          <svg
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.85355 2.14645C5.04882 2.34171 5.04882 2.65829 4.85355 2.85355L3.70711 4H9C11.4853 4 13.5 6.01472 13.5 8.5C13.5 10.9853 11.4853 13 9 13H5C4.72386 13 4.5 12.7761 4.5 12.5C4.5 12.2239 4.72386 12 5 12H9C10.933 12 12.5 10.433 12.5 8.5C12.5 6.567 10.933 5 9 5H3.70711L4.85355 6.14645C5.04882 6.34171 5.04882 6.65829 4.85355 6.85355C4.65829 7.04882 4.34171 7.04882 4.14645 6.85355L2.14645 4.85355C1.95118 4.65829 1.95118 4.34171 2.14645 4.14645L4.14645 2.14645C4.34171 1.95118 4.65829 1.95118 4.85355 2.14645Z"
              fill="currentColor"
              fillRule="evenodd"
              clipRule="evenodd"
            />
          </svg>
        </Button>
      </div>
      <Editor
        defaultLanguage={currentLanguage}
        language={currentLanguage}
        theme="vs-dark"
        options={{
          selectOnLineNumbers: true,
          tabCompletion: 'on'
        }}
        onChange={(newValue, e) => {
          setCodeValue(newValue || '');
          if (onChange) onChange(newValue, e);
        }}
        value={codeValue}
        className={'h-full'}
      />
      <Button
        disabled={hintLoading}
        size={'sm'}
        className="transiiton-all absolute bottom-0 left-0 m-4 border border-transparent bg-green-800 px-2 py-1 duration-300 ease-in-out hover:cursor-pointer hover:bg-green-700 disabled:bg-neutral-800"
        onClick={getHint}
      >
        {hintLoading ? <LoadingDots /> : 'Hint'}
      </Button>
      <Button
        disabled={runLoading}
        size={'sm'}
        className="transiiton-all absolute bottom-0 right-0 m-4 border border-transparent bg-green-800 px-2 py-1 duration-300 ease-in-out hover:cursor-pointer hover:bg-green-700 disabled:bg-neutral-800"
        onClick={runCode}
      >
        {runLoading ? <LoadingDots /> : 'Run'}
      </Button>
    </div>
  );
}
