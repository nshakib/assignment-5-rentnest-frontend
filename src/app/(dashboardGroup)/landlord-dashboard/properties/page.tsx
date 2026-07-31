import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import { Suspense } from 'react';
import { PropertiesSkeleton } from '@/app/(publicGroup)/_components/properties/PropertiesSkeleton';
import { LandlordPropertiesList } from '../../_components/properties/LandlordPropertiesList';


const LandlordPropertiesPage = async () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">My Properties</h1>
        <Button asChild>
          <Link href="/dashboard/landlord/properties/new">
            <Plus className="mr-2 h-4 w-4" /> Add Property
          </Link>
        </Button>
      </div>

      <Suspense fallback={<PropertiesSkeleton />}>
        <LandlordPropertiesList />
      </Suspense>
    </div>
  )
}

export default LandlordPropertiesPage