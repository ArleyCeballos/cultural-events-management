import { Dialog, DialogContent, DialogTitle } from "@mui/material"
import { Button } from "../Button";
import { Dispatch, SetStateAction } from "react";

interface EditPermisionProps {
    open: boolean;
    setDialogOpen: Dispatch<SetStateAction<boolean>>
}

const EditPermision = ({ open, setDialogOpen }: EditPermisionProps) => {
    return (
        <Dialog open={open}>
            <DialogTitle className="bg-main">
                <span className="font-bold">Verificación de cambio</span>
            </DialogTitle>

            <DialogContent className=" bg-main">
                <div className="flex flex-row items-center justify-center gap-5">

                    <span>Vas a cambiar la responsabilidad X del espacio Y estas seguro? </span>
                    <Button text={"Sí"} type="secondary" handleClick={() => {
                        setDialogOpen(false)
                    }} />

                    <Button text={"No"} type="secondary" handleClick={() => {
                        setDialogOpen(false)
                    }} />
                </div>

            </DialogContent>

        </Dialog>
    )
}

export { EditPermision }