import { Suspense } from "react";
import { Building2, FileSignature, Wallet, TrendingUp, ArrowUpRight, Home } from "lucide-react";
import { fetchLandlordProperties } from "../_actions/properties/landlord-properties";
import { fetchLandlordRequests } from "../_components/properties/LandlordPropertiesList";
import { StatCard } from "../_components/overview/StartCard";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

async function OverviewStats() {
  const [properties, requests] = await Promise.all([
    fetchLandlordProperties(),
    fetchLandlordRequests(),
  ]);

  const totalProperties = properties.length;
  const ActiveProperties = properties.filter((p) => p.status === "ACTIVE").length;
  const occupancyRate = totalProperties > 0 ? Math.round((ActiveProperties / totalProperties) * 100) : 0;

  const pendingRequests = requests.filter((r) => r.status === "PENDING").length;
  const activeRequests = requests.filter(
    (r) => r.status === "PENDING" || r.status === "APPROVED"
  ).length;

  const estimatedMonthlyEarnings = requests
    .filter((r) => r.status === "ACTIVE")
    .reduce((sum, r) => sum + Number(r.property?.monthlyRent ?? 0), 0);

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Total Properties"
          value={totalProperties}
          icon={Building2}
          trend={`${ActiveProperties} occupied`}
          trendIcon={Home}
        />
        <StatCard
          label="Occupancy Rate"
          value={`${occupancyRate}%`}
          icon={TrendingUp}
          trend={occupancyRate >= 70 ? "Healthy" : "Needs attention"}
          trendPositive={occupancyRate >= 70}
        />
        <StatCard
          label="Pending Requests"
          value={pendingRequests}
          icon={FileSignature}
          trend={pendingRequests > 0 ? "Action needed" : "All caught up"}
          trendPositive={pendingRequests === 0}
        />
        <StatCard
          label="Est. Monthly Earnings"
          value={`৳${estimatedMonthlyEarnings.toLocaleString("en-BD")}`}
          icon={Wallet}
          trend="Based on active leases"
        />
      </div>

      {/* Quick Actions Row */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card className="border-dashed border-2 border-indigo-200 dark:border-indigo-900/50 hover:border-indigo-400 dark:hover:border-indigo-700 transition-colors cursor-pointer group">
          <Link href="/landlord-dashboard/properties/new" className="block h-full">
            <CardContent className="flex flex-col items-center justify-center py-8 text-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform duration-200">
                <Building2 className="h-6 w-6" />
              </div>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">Add New Property</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">List a property for rent</p>
              </div>
            </CardContent>
          </Link>
        </Card>

        <Card className="hover:bg-gray-50 dark:hover:bg-gray-900/30 transition-colors cursor-pointer group">
          <Link href="/landlord-dashboard/requests" className="block h-full">
            <CardContent className="flex items-center gap-4 py-6">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400">
                <FileSignature className="h-6 w-6" />
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-gray-900 dark:text-white">Review Requests</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 truncate">
                  {pendingRequests > 0 ? `${pendingRequests} pending application${pendingRequests > 1 ? "s" : ""}` : "No pending requests"}
                </p>
              </div>
              {pendingRequests > 0 && (
                <Badge variant="secondary" className="ml-auto shrink-0 bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300">
                  {pendingRequests}
                </Badge>
              )}
            </CardContent>
          </Link>
        </Card>

        <Card className="hover:bg-gray-50 dark:hover:bg-gray-900/30 transition-colors cursor-pointer group">
          <Link href="/landlord-dashboard/properties" className="block h-full">
            <CardContent className="flex items-center gap-4 py-6">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400">
                <Home className="h-6 w-6" />
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-gray-900 dark:text-white">Manage Properties</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 truncate">
                  {totalProperties} listing{totalProperties !== 1 ? "s" : ""} · {occupancyRate}% occupied
                </p>
              </div>
              <ArrowUpRight className="ml-auto h-4 w-4 shrink-0 text-gray-400 group-hover:text-indigo-500 transition-colors" />
            </CardContent>
          </Link>
        </Card>
      </div>
    </div>
  );
}

function OverviewSkeleton() {
  return (
    <div className="space-y-6">
      {/* Stats skeleton - matches 4-column grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="rounded-xl border border-gray-200 dark:border-gray-800 p-5 space-y-3">
            <div className="flex items-center justify-between">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-8 w-8 rounded-lg" />
            </div>
            <Skeleton className="h-8 w-16" />
            <Skeleton className="h-3 w-32" />
          </div>
        ))}
      </div>

      {/* Quick actions skeleton */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="rounded-xl border border-gray-200 dark:border-gray-800 p-6">
            <div className="flex items-center gap-4">
              <Skeleton className="h-12 w-12 rounded-xl" />
              <div className="space-y-2 flex-1">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-48" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function LandlordOverviewPage() {
  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            Overview
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Welcome back! Here's what's happening with your properties.
          </p>
        </div>
        <Button asChild className="shrink-0">
          <Link href="/landlord-dashboard/properties/new">
            <Building2 className="mr-2 h-4 w-4" />
            Add Property
          </Link>
        </Button>
      </div>

      <Suspense fallback={<OverviewSkeleton />}>
        <OverviewStats />
      </Suspense>
    </div>
  );
}