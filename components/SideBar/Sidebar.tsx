import { MdCalendarMonth, MdShield } from 'react-icons/md'
import { Card } from '../Card/Card'
import { TeatroIcon } from '../TeatroIcon/TeatroIcon';
import Link from 'next/link';

const Sidebar = () => {
    return (
        <aside className=" bg-sideBar w-1/4 min-h-screen text-white flex flex-col ">
            <div className="bg-svg-fond p-2">
                <div><TeatroIcon /></div>
            </div>
            <Card
                options={
                    [<Link href={`/TablaPermisos?modeId=1`} as="/TablaPermisos">
                        Alquiler
                    </Link>,
                    <Link href={`/TablaPermisos?modeId=2`} as="/TablaPermisos">
                        Propio
                    </Link>,
                    <Link href={`/TablaPermisos?modeId=3`} as="/TablaPermisos">
                        Proyecto
                    </Link>,
                    <Link href={`/TablaPermisos?modeId=4`} as="/TablaPermisos">
                        Co-Producción
                    </Link>,
                    <Link href={`/TablaPermisos?modeId=5`} as="/TablaPermisos">
                        Apoyo
                    </Link>,
                    <Link href={`/TablaPermisos?modeId=6`} as="/TablaPermisos">
                        Canje
                    </Link>
                    ]}
                text='Modalidades'
                icon={<MdShield />} />

            <Card
                options={
                    [<Link href={`/responsabily_compliance`} as="/responsabily_compliance">
                        Pendientes por cumplimiento
                    </Link>,
                    ]}
                text='Eventos'
                icon={<MdCalendarMonth />} />
        </aside>
    )
}

export { Sidebar }
