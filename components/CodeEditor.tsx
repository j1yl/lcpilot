"use client"

//import Link from 'next/link'
import React, {useRef, useEffect} from 'react';
import ToolBar from './ToolBar'
import * as monaco from 'monaco-editor';

type Props = {
  value: string;
  onChange: (value: string) => void;
  language: string;
}

const CodeEditor: React.FC<Props> = (props: Props) => {

  const editorRef = React.useRef<HTMLDivElement | null>(null);
  
  useEffect(() => {
    if (editorRef.current) {
      const editor = monaco.editor.create(editorRef.current, {
        value: props.value,
        language: props.language,
        theme: "vs-dark",
      });

      props.onChange(editor.getValue());

      editor.onDidChangeModelContent((event => {
        props.onChange(editor.getValue());
      }));

      return () => {
        editor.dispose();
      };
    }
  }, [props.value, props.language]);

  return (
      <div>
          <ToolBar />
          <div ref={editorRef} style={{height: "calc(100vh - 200px)"}}></div>
      </div>
  )
}

export default CodeEditor;