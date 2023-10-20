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
  mode_name: string
  id: number;
}

const Home = () => {
  const [checkedCells, setCheckedCells] = useState<{ [key: string]: boolean }>({});
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [rows, setRows] = useState<string[]>([]);
  const [keyId, setkeyID] = useState<string[]>([]);
  const [columns, setColumns] = useState<string[]>([]);
  const [modeId, setModeId] = useState<number | null>(null); // Estado para almacenar el modeId
  const [modeName, setmodeName] = useState("");
  const [selectedCellKey, setSelectedCellKey] = useState("")
  const [idUpdate, setIdUpdate] = useState<number | null>(null); // variable para guardar el Id del elemento a modificar
  const [responseData, setResponseData] = useState<MyData[]>([]); // Declara responseData en el alcance del componente


  const handleConfirm = () => {
    // Realizar el cambio y la solicitud PATCH aquí
    if (idUpdate !== null) {
      // Buscar el elemento correspondiente en responseData
      const itemToUpdate = responseData.find((item) => item.id === idUpdate);

      if (itemToUpdate) {
        // Crear una copia del elemento con applies actualizado
        const updatedItem = { ...itemToUpdate, applies: !itemToUpdate.applies };

        // Realizar la solicitud PATCH para cambiar el valor
        axios.patch(`http://localhost:8007/api/responsability-by-mode/${idUpdate}`, updatedItem)
          .then((response) => {
            if (response.status === 200) {
              // Actualización exitosa, actualiza responseData con el nuevo elemento
              setResponseData((prevData) =>
                prevData.map((item) => (item.id === idUpdate ? updatedItem : item))
              );

              // Actualiza el estado del checkbox correspondiente
              setCheckedCells((prevCheckedCells) => ({
                ...prevCheckedCells,
                [`${itemToUpdate.responsability_name}-${itemToUpdate.space_name}`]: updatedItem.applies,
              }));
            }
          })
          .catch((error) => {
            // Manejo de errores en caso de que la solicitud falle
            console.error('Error al actualizar:', error);
          });
      }
    }
  };

  const handleCellClick = (cellKey: string) => {
    setSelectedCellKey(cellKey);
  };

  const onCardOptionClick = (modeId: number) => {
    setModeId(modeId)
  };

  const handleCheckboxChange = (responsability: string, space: string) => {

    /// Verifica si modeId no es null antes de buscar el ID correspondiente
    if (modeId !== null) {
      // Buscar el ID correspondiente en los datos
      const id = findIdByCriteria(responseData, modeId, responsability, space);

      // Asignar el ID encontrado a idUpdate
      setIdUpdate(id);
    }

    setDialogOpen(true);

  };

  function findIdByCriteria(data: MyData[], modeId: number, responsabilityName: string, spaceName: string): number | null {
    for (const item of data) {
      if (modeId !== null && item.mode_id === modeId && item.responsability_name === responsabilityName && item.space_name === spaceName) {
        return item.id;
      }
    }
    return null;
  }

  useEffect(() => {
    // Realizar una solicitud HTTP para obtener los datos de la API
    if (modeId !== null) {
      axios.get(`http://localhost:8007/api/responsability-by-mode?skip=0&limit=125&mode_id=${modeId}`).then((response) => {
        if (response.status === 200) {
          // Obtenga todos los datos sin filtrar
          const responseData: MyData[] = response.data;
          setResponseData(responseData); // Actualiza responseData en el estado del componente
          // Obtener la lista de filas y columnas
          const rows = Array.from(new Set(responseData.map((item: MyData) => item.responsability_name.toString())));
          const columns = Array.from(new Set(responseData.map((item: MyData) => item.space_name.toString())));


          //Obtener key para la tabla con los id de cada elemento
          const keyId = Array.from(new Set(responseData.map((item: MyData) => item.id.toString())));

          //Obtener title para la tabla
          const modeName = responseData.length > 0 ? responseData[0].mode_name : "Modo Desconocido";
          setmodeName(modeName);

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
          setkeyID(keyId);
        }
      });
    }
  }, [modeId]);

  return (
    <div className="bg-black h-full flex text-white">
      <Sidebar onCardOptionClick={onCardOptionClick} />
      <main className="w-full p-2 bg-main">
        <div className="flex flex-col items-center px-6">
          <div className="py-6 flex flex-col items-center">
            <h1 className="text-gray-title font-bold text-4xl">Gestión de Responsabilidades</h1>
            <h1 className="capitalize text-gray-title font-bold text-4xl">{modeName}</h1>
          </div>
          <InterceptionTable
            title="Responsabilidad"
            keyId={keyId}
            rows={rows}
            columns={columns} // Deben ser 5 espacios
            initialCheckedCells={checkedCells}
            onCheckboxChange={handleCheckboxChange}
            onCellClick={handleCellClick}
          />
          <EditPermision open={dialogOpen} setDialogOpen={setDialogOpen} responsabilidad={selectedCellKey} onConfirm={handleConfirm} />
        </div>
      </main>
    </div>
  );
};

export default Home;