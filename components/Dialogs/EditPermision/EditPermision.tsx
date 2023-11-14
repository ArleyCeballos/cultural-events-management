import { Dialog, DialogContent, DialogTitle, Link } from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import { Button } from "../../Button/Button";
import { useRouter } from 'next/router';


interface EditPermisionProps {
    open: boolean;
    setDialogOpen: Dispatch<SetStateAction<boolean>>;
    responsabilidad: string;
    onConfirm: () => void;
}

const EditPermision = ({ open, setDialogOpen, responsabilidad, onConfirm }: EditPermisionProps) => {
    const router = useRouter();

    const handleConfirm = () => {
        onConfirm();
        setDialogOpen(false);

        // Obtener el modeId actual de la URL
        const currentModeId = router.query.modeId;

        // Forzar la recarga solo si modeId está presente en la URL
        if (currentModeId) {
            // Actualizar el valor de modeId para forzar la recarga del componente Home
            router.push(`/TablaPermisos?modeId=${currentModeId}`, undefined, { shallow: true });
        }
    };

    const handleCancel = () => {
        setDialogOpen(false);
    };

    return (
        <Dialog open={open}>
            <DialogTitle className="bg-main">
                <span className="font-bold">Verificación de cambio</span>
            </DialogTitle>

            <DialogContent className=" bg-main">
                <div className="flex flex-row items-center justify-center gap-5">
                    <span>
                        Vas a cambiar la responsabilidad{" "}
                        <span className="font-bold">{responsabilidad}</span> ¿Estás seguro?
                    </span>
                    <Button
                        text={"Sí"}
                        type="secondary"
                        handleClick={handleConfirm}
                    />
                    <Button text={"No"} type="secondary" handleClick={handleCancel} />
                </div>
            </DialogContent>
        </Dialog>
    );
};

export { EditPermision };
