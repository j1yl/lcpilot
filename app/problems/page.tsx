export default async function Page() {
  return (
    <>
      <div className="grid md:grid-cols-2 border border-blue-500 w-full">
        <div className="flex flex-col gap-2">
          <div>1</div>
          <div>2</div>
        </div>
      </div>
      <div className="border-yellow-500 border w-full">3</div>
    </>
  );
}
