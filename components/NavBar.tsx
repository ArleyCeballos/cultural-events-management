import { Button } from "./Button"
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';

const NavBar = () => {

    return <nav className="bg-NavBar flex items-center justify-between px-6 py-2 rounded-md">
        <div className="flex gap-4 text-xl">
            <div className="bg-Icon-fond p-1 rounded-full text-Text-Icon"><BsChevronLeft /></div>
            <div className="bg-Icon-fond p-1 rounded-full text-Text-Icon"><BsChevronRight /></div>
        </div>
        <div className="flex gap-3 items-center">
            <span className="menu-text">Alquiler</span>
            <span className="menu-text">Co-Producción</span>
            <span className="menu-text">Propio</span>
            <span className="menu-text">Apoyo</span>
            <span className="menu-text">Canje</span>
            <span className="menu-text">Proyecto</span>
            {/* <div className="vertical-separator"/>
                <span>Sign Up</span>
                <Button type="primary" text="Log In" /> */}
        </div>
    </nav>
}
export { NavBar }