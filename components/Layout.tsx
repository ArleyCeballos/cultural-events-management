import { ReactNode } from "react"

const Layout = ({ children }: { children: ReactNode }) => {
    return (
        <div>Desde Layout
            {children}
        </div>
    )
}

export default Layout