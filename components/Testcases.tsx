'use client';

import React, { useState } from 'react';
import { Button, buttonVariants } from './Button';

type Props = {
  testcases: string;
};

export default function Testcases({ testcases }: Props) {
  const [selected, setSelected] = useState<number>(0);

  const result: {
    in: string;
    out: string;
  }[] = JSON.parse(testcases);

  if (!testcases) return null;

  return (
    <div className="flex h-full flex-col gap-8 p-4">
      <div className="flex flex-wrap items-center gap-2">
        {result.map((_, i) => (
          <Button
            onClick={() => setSelected(i)}
            className={buttonVariants({
              variant: 'ghost',
              size: 'sm',
              className: selected === i ? 'bg-neutral-700' : ''
            })}
          >
            Case {i + 1}
          </Button>
        ))}
      </div>
      {result[selected] && (
        <div className="flex flex-col gap-4 font-mono">
          <div className="flex flex-col gap-2">
            <h3>stdin</h3>
            <span className="rounded bg-neutral-700 p-2">{result[selected].in}</span>
          </div>
          <div className="flex flex-col gap-2">
            <h3>stdout</h3>
            <span className="rounded bg-neutral-700 p-2">{result[selected].out}</span>
          </div>
        </div>
      )}
    </div>
  );
}
