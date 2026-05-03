export default function Home() {
  return (
    <div className="w-screen h-screen bg-black text-white flex flex-col items-center justify-center p-8 text-center font-mono">
      <h1 className="text-4xl text-red-500 font-bold mb-4">DIAGNOSTIC MODE</h1>
      <p className="text-lg text-gray-300 max-w-xl">
        If you can see this text, the deployment pipeline is working, and the server is not crashing.
      </p>
      <p className="mt-8 text-sm text-gray-500 border border-gray-700 p-4 rounded bg-gray-900">
        All complex UI libraries (React Flow, TimelineJS, Framer Motion) have been temporarily stripped. 
        We are at an absolute baseline.
      </p>
    </div>
  );
}