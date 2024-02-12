import React from 'react';
import Editor, { type Monaco } from '@monaco-editor/react';
import { type editor } from 'monaco-editor';
import clsx from 'clsx';

type SupportedLanguages = 'typescript' | 'python' | 'cpp';

type Props = {
  language?: SupportedLanguages;
  value?: string | undefined;
  className?: string;
  onChange?: (value: string | undefined, event: editor.IModelContentChangedEvent) => void;
};

export default function CodeEditor({ className, language, value, onChange }: Props) {
  return (
    <Editor
      language={language as string}
      defaultLanguage="python"
      defaultValue={value}
      theme="vs-dark"
      options={{
        selectOnLineNumbers: true
      }}
      onChange={onChange}
      className={clsx('h-full w-full', className)}
    />
  );
}
