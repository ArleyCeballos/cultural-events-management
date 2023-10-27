import React from 'react';
import { ResponsibilityTable } from '@/components/ResponsabilityTable';
import { ResponsibilityTableData } from '@/components/ResponsabilityTableData';

const Responsibility = () => {
  return (
    <div className='font-serif text-2xl'>
      <h1 className="text-4xl font-bold text-center mb-8 py-10">Cumplimiento de Responsabilidad</h1>
      <div className="container mx-auto px-4 ">
        <div className="w-full md:w-1/2 xl:w-1/3 p-10 text-center">
          <label className="block uppercase tracking-wide text-gray-700 font-bold mb-2">
            Aquí va el nombre del evento
          </label>
        </div>
        <ResponsibilityTable  />
      </div>
    </div>
  );
}

export default Responsibility;
