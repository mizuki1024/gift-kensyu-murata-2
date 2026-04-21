export default function Loading() {
  return (
    <main className="max-w-5xl mx-auto px-4 py-8">
      <div className="h-9 w-32 bg-gray-200 rounded mb-8 animate-pulse" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 9 }).map((_, i) => (
          <div key={i} className="p-6 bg-white rounded-xl shadow border border-gray-100">
            <div className="h-5 bg-gray-200 rounded mb-3 animate-pulse" />
            <div className="h-4 bg-gray-100 rounded mb-2 animate-pulse" />
            <div className="h-4 bg-gray-100 rounded w-3/4 animate-pulse" />
          </div>
        ))}
      </div>
    </main>
  );
}