export function NavbarSkeleton() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <div className="h-6 w-24 animate-pulse rounded bg-muted" />

        {/* Nav links */}
        <nav className="hidden gap-8 md:flex">
          <div className="h-4 w-12 animate-pulse rounded bg-muted" />
          <div className="h-4 w-16 animate-pulse rounded bg-muted" />
          <div className="h-4 w-16 animate-pulse rounded bg-muted" />
          <div className="h-4 w-14 animate-pulse rounded bg-muted" />
        </nav>

        {/* Right side (sign in / avatar area) */}
        <div className="hidden items-center gap-3 md:flex">
          <div className="h-4 w-16 animate-pulse rounded bg-muted" />
          <div className="h-8 w-24 animate-pulse rounded-md bg-muted" />
        </div>

        {/* Mobile menu button placeholder */}
        <div className="size-6 animate-pulse rounded bg-muted md:hidden" />
      </div>
    </header>
  );
}