'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const links = [
  { title: 'Overview', href: '/tenant-dashboard' },
  { title: 'Customers', href: '/tenant-dashboard/customers' },
  { title: 'Settings', href: '/tenant-dashboard/settings' },
]

export function SidebarNav({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname()
  return (
    <nav className="flex flex-col gap-1 p-4">
      {links.map(({ title, href }) => (
        <Link
          key={href}
          href={href}
          onClick={onNavigate}
          className={cn(
            'rounded-md px-3 py-2 text-sm font-medium hover:bg-muted',
            pathname === href ? 'bg-muted text-primary' : 'text-muted-foreground'
          )}
        >
          {title}
        </Link>
      ))}
    </nav>
  )
}