import React from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

type Props = {
  children: string;
};

export default function MdxLayout({ children }: Props) {
  return (
    <div className="prose-invert prose-blockquote:bg-neutral-800 prose-blockquote:px-1 prose-blockquote:rounded prose-code:bg-neutral-800 prose-code:px-1 prose-code:rounded prose-code:border-neutral-600 prose-code:border">
      <Markdown remarkPlugins={[remarkGfm]}>{children}</Markdown>
    </div>
  );
}
