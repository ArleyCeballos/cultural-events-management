import { Sidebar } from "@/components/Sidebar"
import { InterceptionTable } from "@/components/InterceptionTable";
import { useState, useEffect } from "react";
import data from './data.json';
import { EditPermision } from "@/components/Dialogs/EditPermision";
import axios from "axios";

const Home = () => {

  interface Modes {
    name: string
    id: number
  }

  interface List {
    applies: boolean,
    responsability_id: string,
    mode_id: number,
    space_id: number,
    id: number
  }

  const params = {
    skip: 0,
    limit: 25,
    applies: null,
    responsability: null,
    space_id: null,
    mode_id: 1
  }

  const getModes = (): Modes[] => {
    axios.get("http://localhost:8007/api/contractual-modes/").then((response) => {
      return response.data
    })
  }

  let modes: Modes[] = getModes()

  let data2: List[] = []

  let response = axios.get("http://localhost:8007/api/responsability-by-mode", {
    params: params,
    paramsSerializer: {
      indexes: null,
    },
  }).then((response) => {
    data2 = response.data
  })

  let responseModes = 

  const [checkedCells, setCheckedCells] = useState({});

  const [dialogOpen, setDialogOpen] = useState<boolean>(false)

  useEffect(() => {
    const initialCheckedCells: { [key: string]: boolean } = {}; // Declarar el tipo aquí

    data2.forEach((list) => {
      initialCheckedCells[`${list.responsability_id}-${list.mode_id}`] = list.applies
    })
    setCheckedCells(initialCheckedCells);
  }, []);

  const handleCheckboxChange = (permiso: string, espacio: string) => {
    setDialogOpen(true);
  };
  const rows = data2.map(item => item.responsability_id);
  const columns = modes.map((mode) => mode.name)

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
  )
}
export default Home