import React, { useState } from 'react';
import { ResponsibilityTable } from './ResponsabilityTable';
import { FileInput } from '../UserActions/FileInput';


interface ResponsibilityTableDataProps {
  Name: String;
  Status: String;
}
const ResponsibilityTableData = ({ Name, Status }: ResponsibilityTableDataProps) => {

  let statusColor = '';
  switch (Status) {
    case 'Entregado':
      statusColor = 'bg-green-400';
      break;
    case 'En proceso':
      statusColor = 'bg-yellow-400';
      break;
    case 'Terminado':
      statusColor = 'bg-blue-400';
      break;
    default:
      statusColor = 'bg-gray-400';
      break;
  }
  return (
    
    <tr className='text-center'>
      <td className="border px-2 py-2">{Name}</td>
      <td className="border px-2 py-2"><input type="date" disabled /></td>
      <td className="border px-2 py-2"><input type="date" disabled /></td>
      <td className={`border px-2 py-2 ${statusColor} text-white text-center`}>
        {Status}
      </td>
      <td className="border px-2 py-2 text-center">
        <FileInput />
      </td>
    </tr>
  );
}

export { ResponsibilityTableData };
