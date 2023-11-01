import { Dialog, DialogContent, DialogTitle } from "@mui/material"
import { Dispatch, SetStateAction } from "react";
import { Button } from "../../Button/Button";

interface EditPermisionProps {
    open: boolean;
    setDialogOpen: Dispatch<SetStateAction<boolean>>
    responsabilidad: string
    onConfirm: () => void
}

const EditPermision = ({ open, setDialogOpen, responsabilidad, onConfirm }: EditPermisionProps) => {
    return (
        <Dialog open={open}>
            <DialogTitle className="bg-main">
                <span className="font-bold">Verificación de cambio</span>
            </DialogTitle>

            <DialogContent className=" bg-main">
                <div className="flex flex-row items-center justify-center gap-5">

                    <span>Vas a cambiar la responsabilidad <span className="font-bold">{responsabilidad}</span> estas seguro? </span>
                    <Button text={"Sí"} type="secondary" handleClick={() => {
                        onConfirm();
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