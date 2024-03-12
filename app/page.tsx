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
    <div className="mx-auto flex w-full max-w-6xl flex-grow">
      <div className="mx-auto flex w-full flex-col p-4">
        <table className="w-full">
          <tr className="text-left">
            <th>Title</th>
            <th>Difficulty</th>
          </tr>
          {result.map((doc) => (
            <tr key={doc.id}>
              <td>
                <Link href={`/problems/${doc.id}`}>
                  {/* {doc.title[0].toUpperCase() + doc.title.slice(1).toLowerCase()} */}
                  {doc.title}
                </Link>
              </td>
              <td
                className={`${doc.difficulty === 'easy' ? 'text-green-500' : doc.difficulty === 'medium' ? 'text-yellow-500' : 'text-red-500'}`}
              >
                {doc.difficulty[0].toUpperCase() + doc.difficulty.slice(1).toLowerCase()}
              </td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
}
