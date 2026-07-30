'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const links = [
  { title: 'Overview', href: '/tenant-dashboard' },
  { title: 'Settings', href: '/tenant-dashboard/settings' },
]

export function DashboardSidebar() {
  const pathname = usePathname()
  return (
    <aside className="hidden w-64 border-r bg-background lg:block">
      <div className="flex h-14 items-center border-b px-6 font-semibold">
        Dashboard
      </div>
      <nav className="flex flex-col gap-1 p-4">
        {links.map(({ title, href }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              'rounded-md px-3 py-2 text-sm font-medium hover:bg-muted',
              pathname === href ? 'bg-muted text-primary' : 'text-muted-foreground'
            )}
          >
            {title}
          </Link>
        ))}
      </nav>
    </aside>
  )
}