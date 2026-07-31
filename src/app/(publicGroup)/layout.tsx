import { Navbar } from "@/components/shared/navbar";
import { Footer } from "./_components/home/footer";

const PublicGroupLayout = async (
    {
        children
    } : {
        children: React.ReactNode
    }
) => {
  return (
    <div>
      <Navbar />
      {children}
      <Footer />
    </div>
  )
}

export default PublicGroupLayout