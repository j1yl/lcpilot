import React from 'react';
import Editor, { type Monaco } from '@monaco-editor/react';
import { type editor } from 'monaco-editor';
import clsx from 'clsx';
import {Button, buttonVariants} from './Button';

type SupportedLanguages = 'typescript' | 'python' | 'python3' | 'cpp' | 'javascript' | 'java' | 'csharp' | 'go' | 'rust' | 'kotlin' | 'swift' | 'ruby' | 'php' | 'perl' | 'lua' | 'r' | 'shell' | 'powershell';
const numLangauge = 3;

type Props = {
  language?: SupportedLanguages;
  value?: string | undefined;
  className?: string;
  onChange?: (value: string | undefined, event: editor.IModelContentChangedEvent) => void;
};

export default function CodeEditor({ className, language, value, onChange }: Props) {
  return (
    <div>
      <select className="language-selector" name={language as string}>
        {['typescript', 'python', 'python3', 'cpp', 'javascript', 'java', 'csharp', 'go', 'rust', 'kotlin', 'swift', 'ruby', 'php', 'perl', 'lua', 'r', 'shell', 'powershell'].map((lang) => (
          <option key={lang} value={lang}>
            {lang[0].toUpperCase() + lang.slice(1)}
          </option>
        ))}
      </select>
      <Editor
        language={language as string}
        defaultLanguage="python"
        defaultValue={value}
        theme="vs-dark"
        options={{
          selectOnLineNumbers: true,
          tabCompletion: 'on'
        }}
        onChange={onChange}
        className={clsx('h-full w-full', className)}
      />
    </div>
    
  );
}
