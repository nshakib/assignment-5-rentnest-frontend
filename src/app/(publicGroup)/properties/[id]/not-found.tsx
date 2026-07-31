import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function PropertyNotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center">
      <h1 className="text-2xl font-bold">Property not found</h1>
      <p className="mt-2 text-muted-foreground">
        This listing may have been removed or the link is incorrect.
      </p>
      <Button asChild className="mt-6">
        <Link href="/properties">Browse other properties</Link>
      </Button>
    </div>
  );
}