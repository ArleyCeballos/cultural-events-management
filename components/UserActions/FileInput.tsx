import { useState } from 'react';
import { MdUpload, MdModeEditOutline, MdDownload } from 'react-icons/md';
import { DeliverablesDialog } from '../Dialogs/DeliverableResponsability/DeliverablesDialog';
import Docxtemplater from 'docxtemplater';
import PizZip from 'pizzip';
import { saveAs } from 'file-saver';


const FileInput = () => {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  const handleProgileDialogClick = () => {
    setDialogOpen(true);
  };

  const generateDocument = async () => {
    try {
      // Cargar la plantilla del documento desde una URL
      const response = await fetch('espacioPublico.docx');
      if (!response.ok) {
        throw new Error('No se pudo cargar la plantilla del documento.');
      }
      const templateData = await response.arrayBuffer();

      const zip = new PizZip(templateData);
      const doc = new Docxtemplater(zip);

      // Datos que llenarán el documento
      const data = {
        fecha: 'Medellin, 14 de agosto de 2023',
        contenido: 'Show oficial del Payaso PLIM PLIM el día 27 de agosto de 2023 desde las 4:00 pm',
        asunto: 'Evento del 27 de agosto de 2023'
      };

      // Llenar la plantilla con los datos
      doc.setData(data);
      doc.render();

      // Generar el documento final
      const generatedDoc = doc.getZip().generate({ type: 'blob' });

      // Descargar el documento
      saveAs(generatedDoc, 'documento_generado.docx');
    } catch (error) {
      console.error('Error al generar el documento:', error);
    }
  };

  return (
    <div className="text-3xl flex gap-2">
      <MdUpload className="text-gray-900 hover:text-yellow-600 hover:cursor-pointer" onClick={handleProgileDialogClick} />
      <MdModeEditOutline className="text-gray-900 hover:text-red-600 hover:cursor-pointer" />
      <MdDownload className="text-gray-900 hover:text-green-600 hover:cursor-pointer" onClick={generateDocument} />
      <DeliverablesDialog open={dialogOpen} setDialogOpen={setDialogOpen} />
    </div>
  );
};

export { FileInput };
