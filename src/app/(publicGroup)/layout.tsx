import { Navbar } from "@/components/shared/navbar";
import { Footer } from "./_components/home/footer";
import { getMe } from "@/service/getMe";

const PublicGroupLayout = async (
    {
        children
    } : {
        children: React.ReactNode
    }
) => {
  const user  = getMe(); // cookies() read now happens INSIDE this Suspense boundary
  return (
    <div>
      <Navbar user={user} />
      <main>
          {children}
      </main>
      
      <Footer />
    </div>
  )
}

export default PublicGroupLayout