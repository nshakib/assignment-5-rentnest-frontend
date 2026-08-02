export function DashboardShellSkeleton() {
  return (
    <div className="min-h-screen flex flex-col animate-pulse">
      <div className="h-16 border-b" />
      <div className="flex flex-1">
        <div className="w-64 border-r p-4 space-y-3">
          <div className="h-6 w-full rounded bg-muted" />
          <div className="h-6 w-full rounded bg-muted" />
          <div className="h-6 w-full rounded bg-muted" />
        </div>
        <div className="flex-1 p-6">
          <div className="h-8 w-48 rounded bg-muted" />
        </div>
      </div>
    </div>
  );
}