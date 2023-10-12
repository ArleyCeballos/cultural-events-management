import { MdShield } from 'react-icons/md'
import { TeatroIcon } from "./TeatroIcon"
import { Card } from './Card'

interface SidebarProps {
    onCardOptionClick: (modeId: number) => void;
  }

const Sidebar = ({ onCardOptionClick }: SidebarProps) => {
    return (
        <aside className=" bg-sideBar w-[670px] flex flex-col">
            <div className="bg-svg-fond">
                <div><TeatroIcon /></div>
            </div>
            <div className="h-full flex flex-col gap-6">
                <Card
                    options={[<p onClick={() => onCardOptionClick(1)}>Alquiler</p>,
                    <p onClick={() => onCardOptionClick(2)}>Co-Producción</p>,
                    <p onClick={() => onCardOptionClick(3)}>Propio</p>,
                    <p onClick={() => onCardOptionClick(4)}>Apoyo</p>,
                    <p onClick={() => onCardOptionClick(5)}>Canje</p>,
                    <p onClick={() => onCardOptionClick(6)}>Proyecto</p>
                ]}
                    text='Permisos'
                    icon={<MdShield />} />
            </div>
        </aside>
    )
}

export { Sidebar }