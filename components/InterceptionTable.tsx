import React, { useState, useEffect } from 'react';

interface InterceptionTableProps {
  rows: string[];
  columns: string[];
  initialCheckedCells?: { [key: string]: boolean };
  onCheckboxChange: (row: string, column: string) => void;
  title: string;
}

const InterceptionTable: React.FC<InterceptionTableProps> = ({ rows, columns, initialCheckedCells, title, onCheckboxChange }) => {
  
  console.log(initialCheckedCells)
  
  const [checkedCells, setCheckedCells] = useState<{ [key: string]: boolean }>({});

  // Establecer el estado inicial de las casillas cuando initialCheckedCells cambie
  useEffect(() => {
    if (initialCheckedCells) {
      setCheckedCells(initialCheckedCells);
    }
  }, [initialCheckedCells]);

  return (
    <table className='custom-table' style={{ borderCollapse: 'collapse', width: '100%' }}>
      <thead>
        <tr>
          <th className='text-black'>{title}</th>
          {columns.map((column) => (
            <th className='text-black' key={column}>{column}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row}>
            <td className='text-black'>{row}</td>
            {columns.map((column) => (
              <td key={column}>
                <div className='checkbox-container'>
                <input className='circular-checkbox'
                  type="checkbox"
                  checked={checkedCells[`${row}-${column}`] || false}
                  onChange={() => onCheckboxChange(row, column)}
                />
                </div>  
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export {InterceptionTable};