import Link from 'next/link';
import { useState } from 'react';

const FileInput = () => {
  const [buttonColor, setButtonColor] = useState('blue');
  const [isDisabled, setIsDisabled] = useState(false);

  const handleButtonClick = () => {
    if (buttonColor === 'blue') {
      // Presionado "Guardar"
      setButtonColor('green');
      setIsDisabled(true); // Deshabilita la capacidad de agregar más archivos
    }
  };

  return (
    <button style={{ backgroundColor: buttonColor }} disabled={isDisabled}>
      <a href="/FileUploadPage" >
       Subir Archivos 
      </a>
      <button onClick={handleButtonClick}>Guardar</button>
    </button>
  );
}

export { FileInput };
