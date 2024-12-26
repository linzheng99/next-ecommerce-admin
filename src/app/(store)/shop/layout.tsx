import Footer from "@/components/shop/footer"
import Navbar from "@/components/shop/navbar"

interface SetupLayoutProps {
  children: React.ReactNode
}

export default function SetupLayout({ children }: SetupLayoutProps) {
  return (
    <div className="w-full h-full">
      <Navbar />
      {children}
      <Footer />
    </div>
  )
};
