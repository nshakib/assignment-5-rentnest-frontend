export default function Loading() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="aspect-[16/9] w-full animate-pulse rounded-xl bg-muted" />
      <div className="mt-6 h-8 w-2/3 animate-pulse rounded bg-muted" />
      <div className="mt-3 h-4 w-1/3 animate-pulse rounded bg-muted" />
    </div>
  );
}