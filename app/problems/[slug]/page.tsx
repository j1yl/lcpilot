import { Problem } from '@/types/problem';
import getDocument from '@/lib/firebase/getData';
import dynamic from 'next/dynamic';
import Testcases from '@/components/Testcases';
import MdxLayout from '@/components/MdxLayout';

const DyanmicCodeEditor = dynamic(() => import('@/components/CodeEditor'), {
  ssr: false
});

export default async function Page({ params }: { params: { slug: string } }) {
  const { result, error } = (await getDocument('problem', params.slug)) as {
    result: Problem;
    error: string;
  };

  if (error) {
    return (
      <div>
        <h1>Error</h1>
        <div>{error}</div>
      </div>
    );
  }

  return (
    <div className="m-2 grid max-h-[calc(100vh-40px-16px)] w-full gap-2 md:grid-cols-2">
      <div className="flex flex-col gap-4 overflow-scroll rounded-lg bg-neutral-900 p-4 text-white md:row-span-2">
        <h1 className="text-2xl font-semibold">
          {/* {result.lc_number}: {result.title[0].toUpperCase() + result.title.slice(1).toLowerCase()}
           */}
          {result.lc_number}: {result.title}
        </h1>
        <div
          className={`w-max rounded-xl bg-neutral-700 px-2 py-1 text-xs
          ${result.difficulty === 'easy' ? 'text-green-500' : result.difficulty === 'medium' ? 'text-yellow-500' : result.difficulty === 'hard' ? 'text-red-500' : 'text-gray-500'}
        `}
        >
          {result.difficulty[0].toUpperCase() + result.difficulty.slice(1).toLowerCase()}
        </div>
        {/* <MdxLayout>{`${result.content.replaceAll('\\n', '\n')}`}</MdxLayout> */}
        {/* <Markdown>{`${result.content}`}</Markdown> */}
        <MdxLayout>{`${result.content.replaceAll('\\n', '\n')}`}</MdxLayout>
      </div>
      <div className="min-h-0 min-w-0 flex-1 rounded-lg md:row-span-3">
        <DyanmicCodeEditor />
      </div>
      <div className="h-full rounded-lg bg-neutral-900">
        <Testcases testcases={result.testcases} />
      </div>
    </div>
  );
}
