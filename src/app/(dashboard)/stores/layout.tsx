import Navbar from "@/components/navbar"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex h-full w-full flex-col">
      <Navbar />
      <div className="flex-1">{children}</div>
    </div>
  )
}
