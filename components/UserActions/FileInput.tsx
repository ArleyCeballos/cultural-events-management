import { useState } from 'react';
import { MdModeEditOutline, MdDeleteOutline } from 'react-icons/md';
import { DeliverablesDialog } from '../Dialogs/DeliverableResponsability/DeliverablesDialog';

const FileInput = () => {

  const [dialogOpen, setDialogOpen] = useState<boolean>(false)

  const handleProgileDialogClick = () => {
    setDialogOpen(true)
  }

  return (
    <div className='text-3xl flex gap-2'>
      <MdModeEditOutline className="text-gray-900 hover:text-yellow-600 hover:cursor-pointer" onClick={handleProgileDialogClick} />
      <MdDeleteOutline className="text-gray-900 hover:text-red-600 hover:cursor-pointer" />
      <DeliverablesDialog open={dialogOpen} setDialogOpen={setDialogOpen} />
    </div>
  );
}

export { FileInput };
