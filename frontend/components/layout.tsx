import { SiteHeader } from "@/components/site-header"
import Sidebar from "./sidebar"

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <>
      <SiteHeader />
      <Sidebar />
      <main>{children}</main>
    </>
  )
}
