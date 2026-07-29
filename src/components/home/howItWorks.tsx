import { Search, Users, FileText, Key } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Find real estate",
    description:
      "Browse thousands of listings and filter by location, price, and property type to find the right match.",
  },
  {
    icon: Users,
    title: "Meet relator",
    description:
      "Connect with a trusted local agent who knows the market and can guide you through every step.",
  },
  {
    icon: FileText,
    title: "Documents",
    description:
      "We handle the paperwork and contracts, keeping everything transparent and legally sound.",
  },
  {
    icon: Key,
    title: "Take the keys",
    description:
      "Close the deal and move into your new home with zero hidden commissions.",
  },
];

export function HowItWorks() {
  return (
    <section className="bg-neutral-50 px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <h2 className="text-2xl font-bold sm:text-3xl">
            How It works? Find a perfect home
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div key={step.title} className="text-center sm:text-left">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-neutral-900 text-white sm:mx-0">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-lg font-semibold">{step.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}