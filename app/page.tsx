import getDocuments from '@/lib/firebase/getDocs';
import { Problem } from '@/types/problem';
import Link from 'next/link';

export default async function Home() {
  const {
    result,
    error
  }: {
    result: Problem[];
    error: unknown;
  } = await getDocuments('problem');

  if (error) {
    return <div>{String(error)}</div>;
  }

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-grow">
      <ul className="mx-auto my-auto flex w-full flex-col gap-2">
        {result
          .sort((a, b) => a.lc_number - b.lc_number)
          .map((doc) => (
            <Link
              href={`/problems/${doc.id}`}
              key={doc.id}
              className="group flex items-center justify-between gap-2"
            >
              <h2 className="underline group-hover:no-underline">
                {doc.title[0].toUpperCase() + doc.title.slice(1).toLowerCase()}
              </h2>
              <span
                className={`${doc.difficulty === 'easy' ? 'text-green-500' : doc.difficulty === 'medium' ? 'text-yellow-500' : 'text-red-500'}`}
              >
                {doc.difficulty[0].toUpperCase() + doc.difficulty.slice(1).toLowerCase()}
              </span>
            </Link>
          ))}
      </ul>
    </div>
  );
}
