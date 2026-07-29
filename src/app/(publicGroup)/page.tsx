import { CtaBanner } from "@/components/home/ctaBanner";
import { FeaturedProperties } from "@/components/home/featuredProperties";
import { HeroSearch } from "@/components/home/heroSearch";
import { HowItWorks } from "@/components/home/howItWorks";
import { Newsletter } from "@/components/home/newsletter";
import { Testimonials } from "@/components/home/testimonials";
import { Footer } from "@/components/layout/footer";


export default function Home() {
  return (
    <main>
      <HeroSearch />
      <FeaturedProperties />
      <HowItWorks />
      <CtaBanner />
      <Testimonials />
      <Newsletter />
      <Footer />
    </main>
  );
}