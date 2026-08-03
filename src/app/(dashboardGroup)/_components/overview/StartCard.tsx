// src/app/(dashboardGroup)/_components/overview/StartCard.tsx
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  trendPositive?: boolean;
  trendIcon?: LucideIcon;
}

export function StatCard({
  label,
  value,
  icon: Icon,
  trend,
  trendPositive,
  trendIcon: TrendIcon,
}: StatCardProps) {
  // Auto-select trend icon if not provided
  const ResolvedTrendIcon = TrendIcon ?? (trendPositive ? TrendingUp : TrendingDown);

  return (
    <Card className="relative overflow-hidden transition-all duration-200 hover:shadow-md hover:border-primary/20 dark:hover:border-primary/30 group">
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-4">
          {/* Text Content */}
          <div className="min-w-0 flex-1 space-y-1">
            <p className="text-sm font-medium text-muted-foreground truncate">
              {label}
            </p>
            <p className="text-2xl sm:text-3xl font-bold tracking-tight text-card-foreground tabular-nums">
              {value}
            </p>
            {trend && (
              <div
                className={cn(
                  "flex items-center gap-1 text-xs font-medium mt-1",
                  trendPositive === true
                    ? "text-emerald-600 dark:text-emerald-400"
                    : trendPositive === false
                      ? "text-amber-600 dark:text-amber-400"
                      : "text-muted-foreground"
                )}
              >
                <ResolvedTrendIcon className="h-3 w-3 shrink-0" />
                <span className="truncate">{trend}</span>
              </div>
            )}
          </div>

          {/* Icon Container */}
          <div className="shrink-0 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform duration-200 group-hover:scale-110 group-hover:bg-primary/15">
            <Icon className="h-6 w-6" />
          </div>
        </div>
      </CardContent>

      {/* Subtle accent bar at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-primary/0 via-primary/40 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </Card>
  );
}