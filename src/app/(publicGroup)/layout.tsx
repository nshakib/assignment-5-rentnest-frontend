import { Navbar } from "@/components/shared/navbar";

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
    </div>
  )
}

export default PublicGroupLayout