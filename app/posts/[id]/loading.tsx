export default function Loading() {
  return (
    <main className="max-w-2xl mx-auto px-4 py-8">
      <div className="h-4 w-20 bg-gray-200 rounded mb-6 animate-pulse" />
      <div className="h-8 bg-gray-200 rounded mb-4 animate-pulse" />
      <div className="space-y-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-4 bg-gray-100 rounded animate-pulse" />
        ))}
      </div>
    </main>
  );
}
