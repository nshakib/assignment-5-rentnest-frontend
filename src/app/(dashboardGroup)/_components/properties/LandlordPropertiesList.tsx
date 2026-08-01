import { PropertyTable } from './PropertyTable';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { fetchLandlordProperties } from '../../_actions/properties/landlord-properties';
import { cookies } from 'next/headers';

export async function LandlordPropertiesList({ user}: { user: { id: string } }) {
  const properties = await fetchLandlordProperties();

  if (properties.length === 0) {
    return (
      <div className="rounded-xl border border-dashed p-10 text-center text-muted-foreground">
        <p>You haven't listed any properties yet.</p>
        <Button asChild variant="outline" className="mt-4">
          <Link href="/dashboard/landlord/properties/new">List your first property</Link>
        </Button>
      </div>
    );
  }

  return <PropertyTable properties={properties} />;
}



export async function fetchLandlordPropertyById(id: string) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) throw new Error("Not authenticated");

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/properties/${id}`,
    {
      headers: { Cookie: `accessToken=${accessToken}` },
      cache: "no-store",
    }
  );

  if (res.status === 404) return null;
  if (!res.ok) throw new Error("Failed to fetch property");

  const result = await res.json();
  const p = result.data;

  return {
    ...p,
    monthlyRent: Number(p.monthlyRent),
    maintenanceFee: p.maintenanceFee != null ? Number(p.maintenanceFee) : null,
  };
}