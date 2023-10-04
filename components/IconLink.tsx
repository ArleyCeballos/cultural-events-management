import { text } from "node:stream/consumers"
import { IconType } from "react-icons";

interface IconLinkProps {
    text: String;
    ActiveIcon: IconType
    InactiveIcon: IconType
    isActive?: boolean
}

const IconLink = ({ text, isActive = false, ActiveIcon, InactiveIcon }: IconLinkProps) => {
    return (
        <div className={`flex items-center gap-4 ${isActive ? "text-white" : "text-light-grey hover:text-white hover:cursor-pointer"} `}>
            <span className="text-2xl">
                { isActive ? <ActiveIcon /> : <InactiveIcon />}
            </span>
            <span className="text-md font-semibold">{text}</span>
        </div>
    )
}

export { IconLink }