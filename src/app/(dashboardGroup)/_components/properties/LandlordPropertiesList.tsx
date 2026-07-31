import { PropertyTable } from './PropertyTable';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { fetchLandlordProperties } from '../../_actions/properties/landlord-properties';

export async function LandlordPropertiesList() {
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