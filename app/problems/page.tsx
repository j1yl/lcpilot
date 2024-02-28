'use client';

import dynamic from 'next/dynamic';
import { editor } from 'monaco-editor';

// Disable ssr as instructed by package documentation @monaco-editor/react
const DyanmicCodeEditor = dynamic(() => import('../../components/CodeEditor'), {
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
      <div id="editor-parent" className="flex max-h-[calc(100vh-40px)] w-full flex-col">
        <DyanmicCodeEditor
          value={''}
          onChange={handleEditorContentChange}
          language={'cpp'}
          className="max-h-screen rounded"
        />
      </div>
    </>
  );
}
