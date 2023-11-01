import { useState } from 'react';
import { MdModeEditOutline, MdDeleteOutline } from 'react-icons/md';

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
    <div className='text-3xl flex gap-2'>
      <MdModeEditOutline className="text-gray-900 hover:text-yellow-600 hover:cursor-pointer" />
      <MdDeleteOutline className="text-gray-900 hover:text-red-600 hover:cursor-pointer" />
    </div>
  );
}

export { FileInput };
