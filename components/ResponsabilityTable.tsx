import React, { useState } from 'react';
import { FileInput } from './FileInput';


const ResponsibilityTable = () => {
  const [data, setData] = useState<{
    Name: string;
    Status: string;
    CreationDate: string;
    CompletionDate: string;
  }[]>([]);

  const generateRandomData = () => {
    const names = ["Nombre 1", "Nombre 2", "Nombre 3", "Nombre 4"];
    const statuses = ["aprobado", "en proceso", "terminado"];
    
    const randomName = names[Math.floor(Math.random() * names.length)];
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
    
    // Generar fechas aleatorias dentro del rango de, por ejemplo, los últimos 30 días
    const currentDate: Date = new Date();
    const creationDate: Date = new Date(currentDate.getTime() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000);
    const completionDate: Date = new Date(creationDate.getTime() + Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000);
    
    // Formatear fechas como cadenas de texto
    const formattedCreationDate = creationDate.toISOString().split('T')[0];
    const formattedCompletionDate = completionDate.toISOString().split('T')[0];
    
    return { Name: randomName, Status: randomStatus, CreationDate: formattedCreationDate, CompletionDate: formattedCompletionDate };
  };

  const addDataToTable = () => {
    // Generar datos aleatorios y agregarlos a la tabla
    const newData = generateRandomData();
    setData([...data, newData]);
  }

  const getStatusColor = (Status: string) => {
    switch (Status) {
      case 'aprobado':
        return 'bg-green-400';
      case 'en proceso':
        return 'bg-yellow-400';
      case 'terminado':
        return 'bg-blue-400';
      default:
        return 'bg-gray-400';
    }
  }

  return (
    <div className='m-10'>
      <button onClick={addDataToTable}>
        Agregar Fila Aleatoria
      </button>
      <table className="table-auto w-full bg-gray-100">
        <thead>
          <tr>
            <th className="px-2 py-2">Nombre de Responsabilidad</th>
            <th className="px-2 py-2">Creation Date</th>
            <th className="px-2 py-2">Cumplimiento</th>
            <th className="px-2 py-2">Estado</th>
            <th className="px-2 py-2">Archivos</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} className='text-center'>
              <td className="border px-2 py-2">{item.Name}</td>
              <td className="border px-2 py-2">{item.CreationDate}</td>
              <td className="border px-2 py-2">{item.CompletionDate}</td>
              <td className={`border px-2 py-2 ${getStatusColor(item.Status)} text-white text-center`}>
                {item.Status}
              </td>
              <td className="border px-2 py-2 text-center">
                <FileInput />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export { ResponsibilityTable };
