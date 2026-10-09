export default function Loading() {
  return (
    <div className="space-y-4" aria-busy>
      <div className="h-9 w-56 animate-pulse rounded bg-slate-200" />
      <div className="grid gap-4 md:grid-cols-2">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="h-48 animate-pulse rounded-xl bg-slate-200" />
        ))}
      </div>
    </div>
  );
}
