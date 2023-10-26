import { Sidebar } from "@/components/SideBar/Sidebar"

interface LayoutProps {
    children: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {

    return (
        <main className="flex flex-row">
            <Sidebar />
            {children}
        </main>
    )
}

export { Layout };