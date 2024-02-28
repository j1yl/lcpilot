import React from 'react';
import Editor, { Monaco } from '@monaco-editor/react';
import { type editor } from 'monaco-editor';
import clsx from 'clsx';
import { Button, buttonVariants } from './Button';

enum SupportedLanguages {
  cpp = 'C++',
  c = 'C',
  csharp = 'C#',
  dart = 'Dart',
  go = 'Go',
  java = 'Java',
  javascript = 'JavaScript',
  kotlin = 'Kotlin',
  lua = 'Lua',
  perl = 'Perl',
  php = 'PHP',
  python = 'Python3',
  ruby = 'Ruby',
  rust = 'Rust',
  swift = 'Swift',
  typescript = 'TypeScript'
}

type Props = {
  language: string;
  value?: string | undefined;
  className: string;
  onChange?: (value: string | undefined, event: editor.IModelContentChangedEvent) => void;
};

export default function CodeEditor({ className, language, value, onChange }: Props) {
  const [currentLanguage, setCurrentLanguage] = React.useState<string | SupportedLanguages>(
    language || SupportedLanguages.cpp
  );


  return (
    <>
      <div className="w-full border-b border-neutral-700 bg-neutral-800 p-1 flex justify-between">
        <select
          id="language_selector"
          className="bg-transparent px-2 py-1 text-xs hover:cursor-pointer focus:outline-none black border-2 border-transparent hover:border-green-600 rounded-md shadow-xl -webkit-appearance:none hover:bg-gray-700"
          onChange={(e) => {
            const select = document.querySelector('#language_selector') as HTMLSelectElement;
            const selectedLanguage = select.options[select.selectedIndex]
              .value as SupportedLanguages;
            setCurrentLanguage(selectedLanguage);
          }}
          defaultValue={language}
          name={language as string}
        >
          value={currentLanguage || SupportedLanguages.cpp}
          {Object.keys(SupportedLanguages).map((lang) => (
            <option key={lang} value={lang}>
              {SupportedLanguages[lang as keyof typeof SupportedLanguages]}
            </option>
          ))}
        </select>
        <Button className="border-2 border-transparent hover:cursor-pointer hover:bg-gray-700 hover:border-green-600" type="button" onClick={() => {}}>
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4.85355 2.14645C5.04882 2.34171 5.04882 2.65829 4.85355 2.85355L3.70711 4H9C11.4853 4 13.5 6.01472 13.5 8.5C13.5 10.9853 11.4853 13 9 13H5C4.72386 13 4.5 12.7761 4.5 12.5C4.5 12.2239 4.72386 12 5 12H9C10.933 12 12.5 10.433 12.5 8.5C12.5 6.567 10.933 5 9 5H3.70711L4.85355 6.14645C5.04882 6.34171 5.04882 6.65829 4.85355 6.85355C4.65829 7.04882 4.34171 7.04882 4.14645 6.85355L2.14645 4.85355C1.95118 4.65829 1.95118 4.34171 2.14645 4.14645L4.14645 2.14645C4.34171 1.95118 4.65829 1.95118 4.85355 2.14645Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"/>
        </svg>
        </Button>
      </div>
      <Editor
        defaultLanguage={currentLanguage || SupportedLanguages.cpp}
        language={currentLanguage}
        defaultValue={value}
        theme="vs-dark"
        options={{
          selectOnLineNumbers: true,
          tabCompletion: 'on'
        }}
        
        onChange={onChange}
        className={className}
      />
    </>
  );
}

