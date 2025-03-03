import { useState, useEffect } from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

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

    const [screenSize, setScreenSize] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setScreenSize(window.innerWidth);

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const outerRadius = screenSize >= 1024 ? 150 : screenSize >= 768 ? 120 : 110;
    const innerRadius = screenSize >= 1024 ? 110 : screenSize >= 768 ? 90 : 80;

    return (
        <div className='w-[250px] h-[350px] lg:w-[500px] lg:h-[500px]'>
            <ResponsiveContainer>
                <PieChart>
                    <Tooltip />
                    <Legend />
                    <Pie
                        data={chartData}
                        cx="50%"
                        cy="50%"
                        outerRadius={outerRadius}
                        innerRadius={innerRadius}
                        dataKey="value"
                        paddingAngle={5}
                    >
                        {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                        ))}
                    </Pie>
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default GastosGraficos;