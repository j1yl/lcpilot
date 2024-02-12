'use client';

import dynamic from 'next/dynamic';
import { editor } from 'monaco-editor';

// Disable ssr as instructed by package documentation @monaco-editor/react
export const DyanmicCodeEditor = dynamic(() => import('../../components/CodeEditor'), {
  ssr: false
});

// This function will be called when the editor content changes
function handleEditorContentChange(
  value: string | undefined,
  event: editor.IModelContentChangedEvent
) {
  console.log(value);
}

export default function Page() {
  return (
    <>
      <div className="grid w-full border border-blue-500 md:grid-cols-2">
        <div className="flex flex-col gap-2">
          <div>1</div>
          <div>2</div>
        </div>
      </div>
      <div id="editor-parent" className="flex w-full flex-col">
        <div className="flex w-full items-center justify-between border-b border-b-neutral-500">
          {/* Can show selector for lang and reset button here */}
          {/* I will let u figure it out */}
          {/* <select className="bg-transparent focus:outline-none">
            {['typescript', 'python', 'cpp'].map((lang) => (
              <option key={lang} value={lang}>
                {lang[0].toUpperCase() + lang.slice(1)}
              </option>
            ))}
          </select> */}
        </div>
        <DyanmicCodeEditor onChange={handleEditorContentChange} />
      </div>
    </>
  );
}
