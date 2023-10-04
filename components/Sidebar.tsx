import { Button } from "./Button"
import { MdHomeFilled, MdOutlineSavedSearch, MdSearch, MdOutlineHome, MdVerticalSplit } from 'react-icons/md'
import { IconLink } from "./IconLink"
import { Card } from "./Card"
import { TeatroIcon } from "./TeatroIcon"

const Sidebar = () => {
    return (
        <aside className="w-[670px] p-2 flex flex-col gap-2">
            <div className="dark-card flex flex-col gap-4">
                <div><TeatroIcon/></div>
                <IconLink text='Home' ActiveIcon={MdHomeFilled} InactiveIcon={MdOutlineHome} />
                <IconLink isActive text='Buscar' ActiveIcon={MdOutlineSavedSearch} InactiveIcon={MdSearch} />
            </div>
            <div className="h-full dark-card flex flex-col gap-6 overflow-y-scroll">
                <div className="flex items-center gap-2 text-light-grey">
                    <MdVerticalSplit className="text-2xl" />
                    <span>Acciones</span>
                </div>
                <Card title='Gestión de permisos'
                    description='En esta sección puedes revisar la configuracion de permisos de tus eventos, 
                    así como visualización y modificación'
                    buttontext='Ir a Permisos' />

                <Card title='Eventos en Proceso'
                    description='En esta sección puedes revisar los eventos que se encuentran en proceso'
                    buttontext='Ir a Eventos' />
            </div>
        </aside>
    )
}

export { Sidebar }