"use client"; // error.tsx は必ず Client Component

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <main className="max-w-2xl mx-auto px-4 py-8 text-center">
      <h2 className="text-xl font-bold mb-4">エラーが発生しました</h2>
      <p className="text-gray-500 mb-6">{error.message}</p>
      <button
        onClick={reset}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        再試行
      </button>
    </main>
  );
}
