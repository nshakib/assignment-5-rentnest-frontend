export default function Loading() {
  return (
    <div className="max-w-2xl space-y-6 animate-pulse">
      <div className="h-8 w-48 rounded bg-muted" />

      <div className="space-y-2">
        <div className="h-4 w-16 rounded bg-muted" />
        <div className="h-10 w-full rounded bg-muted" />
      </div>

      <div className="space-y-2">
        <div className="h-4 w-24 rounded bg-muted" />
        <div className="h-24 w-full rounded bg-muted" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <div className="h-4 w-20 rounded bg-muted" />
          <div className="h-10 w-full rounded bg-muted" />
        </div>
        <div className="space-y-2">
          <div className="h-4 w-20 rounded bg-muted" />
          <div className="h-10 w-full rounded bg-muted" />
        </div>
      </div>

      <div className="h-10 w-full rounded bg-muted" />
    </div>
  );
}