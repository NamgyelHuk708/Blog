import { AdminSidebar } from "@/components/admin-sidebar"

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-[#080808]">
      <AdminSidebar />
      <main className="ml-60 min-h-screen p-8">{children}</main>
    </div>
  )
}
