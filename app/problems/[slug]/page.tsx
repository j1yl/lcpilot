import getDocument from '@/lib/firebase/getData';
import ProblemLayout from '@/components/Problem';
import { Problem } from '@/types/problem';

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

  return <ProblemLayout result={result} />;
}
