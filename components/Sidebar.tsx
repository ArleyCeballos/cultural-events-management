import { MdShield } from 'react-icons/md'
import { TeatroIcon } from "./TeatroIcon"
import { Card } from './Card'

const Sidebar = () => {
    return (
        <aside className=" bg-sideBar w-[670px] flex flex-col">
            <div className="bg-svg-fond">
                <div><TeatroIcon /></div>
            </div>
            <div className="h-full flex flex-col gap-6">
                <Card
                    options={[<p>Alquiler</p>, <p>Co-Producción</p>, <p>Propio</p>,
                    <p>Apoyo</p>, <p>Canje</p>, <p>Proyecto</p>]}
                    text='Permisos'
                    icon={<MdShield />} />
            </div>
        </aside>
    )
}

export { Sidebar }