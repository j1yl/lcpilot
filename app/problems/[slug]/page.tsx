import getDocument from '@/lib/firebase/getData';
import ProblemLayout from '@/components/Problem';
import { Problem } from '@/types/problem';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export default async function Page({ params }: { params: { slug: string } }) {
  const session = await getServerSession(authOptions);
  const { result, error } = (await getDocument('problem', params.slug)) as {
    result: Problem;
    error: string;
  };

  console.log(session?.user?.email);

  if (session?.user?.email) {
    return <ProblemLayout result={result} />;
  }

  return (
    <div className="flex h-[calc(100vh-80px)] flex-col items-center justify-center">
      <h1 className="text-red-500">You need to be signed in to view this page.</h1>
      <p>Sign in using the button at the top right of the screen.</p>
    </div>
  );
}
