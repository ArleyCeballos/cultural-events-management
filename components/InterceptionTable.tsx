import React, { useState, useEffect } from 'react';

interface InterceptionTableProps {
  rows: string[];
  columns: string[];
  initialCheckedCells?: { [key: string]: boolean };
  onCheckboxChange: (row: string, column: string) => void;
}

const InterceptionTable: React.FC<InterceptionTableProps> = ({ rows, columns, initialCheckedCells, onCheckboxChange }) => {
  
  console.log(initialCheckedCells)
  
  const [checkedCells, setCheckedCells] = useState<{ [key: string]: boolean }>({});

  // Establecer el estado inicial de las casillas cuando initialCheckedCells cambie
  useEffect(() => {
    if (initialCheckedCells) {
      setCheckedCells(initialCheckedCells);
    }
  }, [initialCheckedCells]);

  return (
    <table style={{ borderCollapse: 'collapse', width: '100%' }}>
      <thead>
        <tr>
          <th></th>
          {columns.map((column) => (
            <th key={column}>{column}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row}>
            <td>{row}</td>
            {columns.map((column) => (
              <td key={column}>
                <input
                  type="checkbox"
                  checked={checkedCells[`${row}-${column}`] || false}
                  onChange={() => onCheckboxChange(row, column)}
                />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export {InterceptionTable};