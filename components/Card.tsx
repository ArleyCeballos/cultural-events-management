import { useState } from "react";
import { Button } from "./Button"

interface CardProps {
    title: String;
    description: String;
    buttontext: String
}

const Card = ({ title, description, buttontext }: CardProps) => {
    const [dialogOpen, setOpen] = useState<boolean>(false);

    const handleLoginClick = () => {
        console.group("Hice click")
        setOpen(true);
    }
    
    
    return <div className="flex flex-col bg-card-grey items-start p-4 rounded-lg gap-3">
        <span className="font-semibold text-lg">{title}</span>
        <span className="text-xl">{description}</span>
        <Button type="secondary" text={buttontext} handleClick={handleLoginClick}/>


    </div>
}

export { Card }