import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const GastosGraficos = ({ gastos }) => {
    const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#FF4444", "#8E44AD", "#2ECC71", "#F39C12"];

    const data = gastos.reduce((acc, gasto) => {
        const categoria = gasto.categoria.nombreCategoria;
        const index = acc.findIndex((item) => item.name === categoria);

        if (index !== -1) {
            acc[index].value += gasto.cantidadGasto;
        } else {
            acc.push({ name: categoria, value: gasto.cantidadGasto });
        }

        return acc;
    }, []);

    const chartData = data.length > 0 ? data : [{ name: "Sin datos", value: 1 }];
    const colors = data.length > 0 ? COLORS : ["#ccc"];

    return (
        <PieChart width={400} height={400}>
            <Tooltip />
            <Legend />
            <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                outerRadius={90}
                innerRadius={60}
                dataKey="value"
                paddingAngle={5}
                //label={data.length > 0}
            >
                {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
            </Pie>
        </PieChart>
    );
};

export default GastosGraficos;