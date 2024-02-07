export default async function Page() {
  return (
    <>
      <div className="grid w-full border border-blue-500 md:grid-cols-2">
        <div className="flex flex-col gap-2">
          <div>1</div>
          <div>2</div>
        </div>
      </div>
      <div className="w-full border border-yellow-500">3</div>
    </>
  );
}
