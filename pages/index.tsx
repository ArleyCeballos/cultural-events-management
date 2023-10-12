import { Sidebar } from "@/components/Sidebar"
import { InterceptionTable } from "@/components/InterceptionTable";
import { useState, useEffect } from "react";
import data from './data.json';
import { EditPermision } from "@/components/Dialogs/EditPermision";
import axios from "axios";
import { title } from "process";

// Interface para saber de qué tipo es la respuesta del axios
interface MyData {
  applies: boolean;
  responsability_id: number;
  mode_id: number;
  space_id: number;
  responsability_name: string;
  space_name: string
  id: number;
}

const Home = () => {
  const [checkedCells, setCheckedCells] = useState<{ [key: string]: boolean }>({});
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [rows, setRows] = useState<string[]>([]);
  const [columns, setColumns] = useState<string[]>([]);
  const [modeId, setModeId] = useState<number | null>(null); // Estado para almacenar el modeId

  const onCardOptionClick = (modeId: number) => {
    setModeId(modeId)
    console.log(modeId)
  };

  useEffect(() => {
    // Realizar una solicitud HTTP para obtener los datos de la API
    if (modeId !== null){
      axios.get(`http://localhost:8007/api/responsability-by-mode?skip=0&limit=750&mode_id=${modeId}`).then((response) => {
      if (response.status === 200) {
        // Obtenga todos los datos sin filtrar
        const responseData: MyData[] = response.data;

        //Obtener title para la tabla
        //const title = responseData[1]?.responsability_name;


        // Obtener la lista de filas y columnas
        const rows = Array.from(new Set(responseData.map((item: MyData) => item.responsability_name.toString())));
        const columns = Array.from(new Set(responseData.map((item: MyData) => item.space_name.toString()))); 

        // Crear un objeto con el estado inicial de las casillas marcadas
        const initialCheckedCells: { [key: string]: boolean } = {};
        responseData.forEach((item: MyData) => {
          if (item.applies) {
            initialCheckedCells[`${item.responsability_name}-${item.space_name}`] = true;
          }
        });

        // Configurar los estados de las filas, columnas y las casillas marcadas
        setRows(rows);
        setColumns(columns);
        setCheckedCells(initialCheckedCells);
      }
    });
    }
  }, [modeId]);

  const handleCheckboxChange = (responsability: string, space: string) => {
    // Aquí puedes realizar cualquier acción que necesites cuando se cambia una casilla
    setDialogOpen(true);
  };

  return (
    <div className="bg-black h-full flex text-white">
      <Sidebar onCardOptionClick={onCardOptionClick} />
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
            columns={columns} // Deben ser 5 espacios
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