import React from 'react';
import { ResponsibilityTable } from '@/components/DeliverResponsibility/ResponsabilityTable';
import { ResponsibilityTableData } from '@/components/DeliverResponsibility/ResponsabilityTableData';

interface respCompliProps {
  nameEvent: string
}

const Responsibility = ({ nameEvent }: respCompliProps) => {
  return (
    <div className='font-serif text-2xl h-screen bg-main'>
      <h1 className="text-4xl font-bold text-center mb-2 py-2">Cumplimiento de Responsabilidades</h1>
      <div className="container mx-auto px-4 flex flex-col items-center">
        <label className="text-gray-title font-bold">
          Nombre del Evento
        </label>
        <ResponsibilityTable/>
      </div>
    </div>
  );
}

export default Responsibility;
