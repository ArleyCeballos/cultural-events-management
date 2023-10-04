import { NavBar } from "@/components/NavBar"
import { Sidebar } from "@/components/Sidebar"
import { InterceptionTable } from "@/components/InterceptionTable";
import { useState } from "react";

const rows = ['Permiso 1', 'Permiso 2', 'Permiso 3'];
const columns = ['Espacio 1', 'Espacio 2', 'Espacio 3', 'Espacio 4'];

const initialCheckedCells = {
  'Permiso 1-Espacio 2': true,
  'Permiso 2-Espacio 1': true,
  'Permiso 3-Espacio 3': true,
};

const Home = () => {
  const [checkedCells, setCheckedCells] = useState(initialCheckedCells);

  const handleCheckboxChange = (row: string, column: string) => {
    // Implementa la lógica para manejar el cambio de casilla de verificación aquí
    // Por ejemplo, puedes actualizar el estado checkedCells aquí
  };

  return (
    <div className="bg-black h-screen flex text-white">
      <Sidebar />
      <main className="w-full p-2">
        <NavBar />
        <InterceptionTable
          rows={rows}
          columns={columns}
          initialCheckedCells={checkedCells} // Pasa el estado inicial de las casillas
          onCheckboxChange={handleCheckboxChange} // Si deseas manejar cambios en las casillas
        />
        <section></section>
        <footer></footer>
      </main>
    </div>
  )
}
export default Home