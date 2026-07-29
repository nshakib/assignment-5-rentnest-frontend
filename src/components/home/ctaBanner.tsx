import { Button } from "@/components/ui/button";

export function CtaBanner() {
  return (
    <section className="relative overflow-hidden bg-neutral-900 px-4 py-20 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl text-center">
        <p className="mb-2 text-sm font-medium uppercase tracking-wide text-neutral-400">
          Discover a new way of living
        </p>
        <h2 className="mb-4 text-2xl font-bold sm:text-3xl">
          Make an enquiry
        </h2>
        <p className="mb-8 text-neutral-300">
          Save your time and easily rent or sell your property with the
          lowest commission on the real estate market.
        </p>
        <Button size="lg" variant="secondary">
          Make an enquiry
        </Button>
      </div>
    </section>
  );
}