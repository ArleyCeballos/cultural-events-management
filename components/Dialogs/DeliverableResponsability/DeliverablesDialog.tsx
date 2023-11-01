import { Button } from "@/components/Button/Button";
import { Checkbox, Dialog, DialogContent, DialogTitle, List, ListItem, ListItemSecondaryAction, ListItemText, TextField } from "@mui/material"
import React, { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';


interface deliverablesDialogProps {
    open: boolean
    setDialogOpen: Dispatch<SetStateAction<boolean>>
}

const DeliverablesDialog = ({ open, setDialogOpen }: deliverablesDialogProps) => {
    const [observations, setObservations] = useState('');
    const [deliverables, setDeliverables] = useState<File[]>([]);
    const [responsibilityCompleted, setResponsibilityCompleted] = useState(false);

    const handleUpload = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        // Puedes realizar alguna lógica para guardar los archivos en tu backend o en algún servicio de almacenamiento.
        // Por ahora, simplemente los almacenaremos en el estado de `deliverables`.
        if (files) {
            const fileArray = Array.from(files as FileList);
            // Resto del código
            setDeliverables([...deliverables, ...fileArray]);
        }
    };

    return (
        <Dialog open={open}>
            <DialogTitle>Observaciones</DialogTitle>
            <DialogContent>
                <TextField
                    label="Introducir observaciones"
                    variant="outlined"
                    fullWidth
                    multiline
                    value={observations}
                    onChange={(e) => setObservations(e.target.value)}
                />
            </DialogContent>

            <DialogTitle>Subir entregables</DialogTitle>
            <DialogContent>
                <input type="file" multiple onChange={handleUpload} />
                <List>
                    {deliverables.map((file, index) => (
                        <ListItem key={index}>
                            <ListItemText primary={file.name} />
                        </ListItem>
                    ))}
                </List>

                <Button text="Cerrar" type="secondary" handleClick={
                    () => { setDialogOpen(false) }
                } />
            </DialogContent>

            <DialogTitle>Marcar responsabilidad como terminada</DialogTitle>
            <DialogContent>
                <Checkbox
                    checked={responsibilityCompleted}
                    onChange={() => setResponsibilityCompleted(!responsibilityCompleted)}
                />
            </DialogContent>

        </Dialog>
    );
};

export { DeliverablesDialog };