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
    <div className="flex flex-grow flex-col items-center gap-8 p-2">
      {result.map((doc) => (
        <div key={doc.id}>
          <Link href={`/problems/${doc.id}`}>
            <a className="text-blue-500 hover:underline">
              {doc.title[0].toUpperCase() + doc.title.slice(1).toLowerCase()}
            </a>
          </Link>
          <span className={`ml-2 ${doc.difficulty === 'easy' ? 'text-green-500' : doc.difficulty === 'medium' ? 'text-yellow-500' : 'text-red-500'}`}>
            {doc.difficulty[0].toUpperCase() + doc.difficulty.slice(1).toLowerCase()}
          </span>
        </div>
      ))}
    </div>
  );
}
