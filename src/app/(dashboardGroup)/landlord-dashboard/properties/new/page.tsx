import { fetchCategories } from "@/app/(dashboardGroup)/_actions/properties/fetchCategories";
import { PropertyForm } from "@/app/(dashboardGroup)/_components/properties/PropertyForm";
import { PropertyFormSkeleton } from "@/app/(dashboardGroup)/_components/properties/PropertyFormSkeleton";
import { Suspense } from "react";

const CreateNewPropertyPage = async () => {
  const categories = await fetchCategories();

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">Add New Property</h1>
      <Suspense fallback={<PropertyFormSkeleton />}>
        <PropertyForm categories={categories} />
      </Suspense>
    </div>
  );
};

export default CreateNewPropertyPage;