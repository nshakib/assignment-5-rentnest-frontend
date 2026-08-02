import { LandlordDashboardStats, RecentActivity } from "@/lib/types";
import { z } from "zod";

export async function getLandlordDashboardStats(): Promise<LandlordDashboardStats> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/landlord/stats`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch dashboard stats");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching landlord stats:", error);
    return {
      totalProperties: 0,
      activeRequests: 0,
      totalEarnings: 0,
      pendingRequests: 0,
    };
  }
}

export async function getRecentActivity(limit: number = 5): Promise<RecentActivity[]> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/landlord/requests?limit=${limit}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch recent activity");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching recent activity:", error);
    return [];
  }
}