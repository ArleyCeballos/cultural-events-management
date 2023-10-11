import { Sidebar } from "@/components/Sidebar"
import { InterceptionTable } from "@/components/InterceptionTable";
import { useState, useEffect } from "react";
import data from './data.json';
import { EditPermision } from "@/components/Dialogs/EditPermision";
import axios from "axios";

//Interface para saber de qué tipo es la respuesta del axios
interface MyData {
  applies: boolean;
  responsability_id: number;
  mode_id: number;
  space_id: number;
  id: number;
}

const Home = () => {
  const [checkedCells, setCheckedCells] = useState<{ [key: string]: boolean }>({});
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [rows, setRows] = useState<string[]>([]);
  const [columns, setColumns] = useState<string[]>([]);

  useEffect(() => {
    // Realizar una solicitud HTTP para obtener los datos de la API
    axios.get('http://localhost:8007/api/responsability-by-mode?skip=0&limit=50').then((response) => {
      if (response.status === 200) {
        // Filtrar los datos por el modo deseado
        console.log(response.data)
        const filteredData: MyData[] = response.data.filter((item: MyData) => item.mode_id === 1);
        
        // Obtener la lista de filas y columnas
        const rows = filteredData.map((item: MyData) => item.responsability_id.toString());
        const columns = Array.from(new Set(filteredData.map((item: MyData) => item.space_id.toString())));

        // Crear un objeto con el estado inicial de las casillas marcadas
        const initialCheckedCells: { [key: string]: boolean } = {};
        filteredData.forEach((item: MyData) => {
          if (item.applies) {
            initialCheckedCells[`${item.responsability_id}-${item.space_id}`] = true;
          }
        });

        // Configurar los estados de las filas, columnas y las casillas marcadas
        setRows(rows);
        setColumns(columns);
        setCheckedCells(initialCheckedCells);
      }
    });
  }, []);

  const handleCheckboxChange = (responsability: string, space: string) => {
    // Aquí puedes realizar cualquier acción que necesites cuando se cambia una casilla
    setDialogOpen(true);
  };

  return (
    <div className="bg-black h-full flex text-white">
      <Sidebar />
      <main className="w-full p-2 bg-main">
        <div className="flex flex-col items-center px-6">
          <div className="py-6">
            <h1 className="text-gray-title font-bold text-4xl">
              Gestión de Permisos
            </h1>
          </div>
          <InterceptionTable
            title="Alquiler"
            rows={rows}
            columns={columns}
            initialCheckedCells={checkedCells}
            onCheckboxChange={handleCheckboxChange}
          />
          <EditPermision open={dialogOpen} setDialogOpen={setDialogOpen} />
        </div>
      </main>
    </div>
  );
};

export default Home;