export default function Loading() {
  return (
    <div className="max-w-md mx-auto py-10 space-y-6 animate-pulse">
      <div className="h-8 w-40 rounded bg-muted" />
      <div className="h-32 rounded-xl bg-muted" />
      <div className="h-10 rounded bg-muted" />
    </div>
  );
}