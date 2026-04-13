export default function Forbidden() {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-black text-white font-silkscreen">
      <h1 className="text-9xl text-red-600">403</h1>
      <p className="text-xl mt-4">ACCESS DENIED</p>
      <a href="/" className="mt-8 text-zinc-500 hover:text-white border-b border-zinc-800">RETURN_HOME</a>
    </div>
  );
}
