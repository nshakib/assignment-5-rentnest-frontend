"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Later: call your API route here, e.g. fetch('/api/newsletter', { method: 'POST', body: JSON.stringify({ email }) })
    setSubmitted(true);
  }

  return (
    <section className="bg-neutral-50 px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="mb-2 text-2xl font-bold sm:text-3xl">
          Sign to newsletter
        </h2>
        <p className="mb-8 text-sm text-muted-foreground">
          Save your time and easily rent or sell your property with the
          lowest commission on the real estate market.
        </p>

        {submitted ? (
          <p className="text-sm font-medium text-green-600">
            Thanks for signing up!
          </p>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-3 sm:flex-row"
          >
            <Input
              type="email"
              required
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1"
            />
            <Button type="submit">Sign up</Button>
          </form>
        )}
      </div>
    </section>
  );
}