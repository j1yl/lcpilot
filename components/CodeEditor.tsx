import React from 'react';
import Editor, { type Monaco } from '@monaco-editor/react';
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
  language?: string | SupportedLanguages;
  value?: string | undefined;
  className?: string;
  onChange?: (value: string | undefined, event: editor.IModelContentChangedEvent) => void;
};

export default function CodeEditor({ className, language, value, onChange }: Props) {
  const [currentLanguage, setCurrentLanguage] = React.useState<string | SupportedLanguages>(
    language || SupportedLanguages.cpp
  );

  return (
    <>
      <div className="w-full border-b border-neutral-700 bg-neutral-800 p-1">
        <select
          id="language_selector"
          className="bg-transparent px-2 py-1 text-xs hover:cursor-pointer focus:outline-none"
          onChange={() => {
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
