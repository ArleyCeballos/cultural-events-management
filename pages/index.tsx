import { Sidebar } from "@/components/Sidebar"
import { InterceptionTable } from "@/components/InterceptionTable";
import { useState, useEffect } from "react";
import data from './data.json'; // Asegúrate de que la ruta al archivo es correcta

const Home = () => {
  const [checkedCells, setCheckedCells] = useState({});

  // Convertir el JSON a un formato utilizable
  useEffect(() => {
    const initialCheckedCells: {[key: string]: boolean} = {}; // Declarar el tipo aquí
    data.forEach((item: {[key: string]: string}) => { // Declarar el tipo aquí
      Object.keys(item).forEach((key) => {
        if (key !== 'Responsabilidad' && item[key] === 'x') {
          initialCheckedCells[`${item.Responsabilidad}-${key}`] = true;
        }
      });
    });
    setCheckedCells(initialCheckedCells);
  }, []);

  const handleCheckboxChange = (row: string, column: string) => {
    // Implementa la lógica para manejar el cambio de casilla de verificación aquí
    // Por ejemplo, puedes actualizar el estado checkedCells aquí
  };

  const rows = data.map(item => item.Responsabilidad);
  const columns = Object.keys(data[0]).filter(key => key !== 'Responsabilidad');

  return (
    <div className="bg-black h-full flex text-white">
      <Sidebar />
      <main className="w-full p-2 bg-white">
        <InterceptionTable

          title="Alquiler"
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