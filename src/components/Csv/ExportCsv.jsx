import { CSVLink } from 'react-csv'

const ExportCsv = ({ usuario, gastos = [] }) => {  
    if (!usuario || !gastos) return null;

    const headers = [
        { label: "Categoría", key: "categoria" },
        { label: "Monto", key: "monto" },
        { label: "Fecha", key: "fecha" }
    ];

    const datosCsv = gastos.map(gasto => ({
        categoria: gasto.categoria?.nombreCategoria || "Sin categoría", 
        monto: gasto.cantidadGasto || 0,
        fecha: gasto.createdAt ? new Date(gasto.createdAt).toLocaleDateString() : "Fecha no disponible"
    }));

    const isDisabled = datosCsv.length === 0

    return (
        <CSVLink data={datosCsv} headers={headers} filename={`gastos_${usuario?.gmailUsuario || "usuario"}.csv`}>
            <button className={`p-2 font-semibold rounded-lg  ${isDisabled ? 'bg-gray-300 text-gray-500cursor-not-allowed' : 'bg-sky-500 ring-sky-700 hover:ring-2 hover:bg-sky-700 text-white'}`} 
            disabled={isDisabled}>Exportar en CSV</button>
        </CSVLink>
    );
}

export default ExportCsv