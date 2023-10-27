import { useState } from 'react';
import { useRouter } from 'next/router';
import React, { ChangeEvent } from 'react';

const FileUploadPage = () => {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const router = useRouter();
  const [buttonLabel, setButtonLabel] = useState('Guardar');

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const fileArray = Array.from(files);
      setUploadedFiles([...uploadedFiles, ...fileArray]);
    }
  };

  const handleButtonAction = () => {
    if (buttonLabel === 'Guardar') {
      // Realizar acciones de guardado aquí
      setButtonLabel('Cumplido');
      // Redirige una vez que se haya realizado el guardado
      router.push('/');
    } else if (buttonLabel === 'Cumplido') {
      // Realizar acciones de cumplimiento aquí
      router.push('/');
    }
  };

  return (
    <div>
      <h1>Subir archivos</h1>
      <input type="file" multiple onChange={handleFileChange} />
      <button onClick={handleButtonAction}>{buttonLabel}</button>
    </div>
  );
};

export default FileUploadPage;
