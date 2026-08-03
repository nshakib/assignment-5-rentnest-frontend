import { CtaBanner } from "@/app/(publicGroup)/_components/home/ctaBanner";
import { FeaturedProperties } from "@/app/(publicGroup)/_components/home/featuredProperties";
import { HeroSearch } from "@/app/(publicGroup)/_components/home/heroSearch";
import { HowItWorks } from "@/app/(publicGroup)/_components/home/howItWorks";
import { Newsletter } from "@/app/(publicGroup)/_components/home/newsletter";
import { Testimonials } from "@/app/(publicGroup)/_components/home/testimonials";
import { Footer } from "@/app/(publicGroup)/_components/home/footer";
import { fetchCategories } from "../(dashboardGroup)/_actions/properties/fetchCategories";


export default async function Home() {
  const categories = await fetchCategories();
  return (
    <main>
      <HeroSearch categories={categories}/>
      <FeaturedProperties />
      <HowItWorks />
      <CtaBanner />
      <Testimonials />
      <Newsletter />
      <Footer />
    </main>
  );
}