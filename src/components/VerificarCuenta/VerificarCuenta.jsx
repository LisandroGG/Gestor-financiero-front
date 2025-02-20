import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";

const VerificarCuenta = () => {
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");
    const navigate = useNavigate();

    const LOCAL = import.meta.env.VITE_LOCAL;

    useEffect(() => {
        if (token) {
            axios.get(`${LOCAL}/usuarios/verificar?token=${token}`, { withCredentials: true,})
                .then(() => {
                    navigate("/login");
                })
                .catch(error => {
                    alert(error.response?.data?.message || "Error al verificar la cuenta.");
                    navigate("/login");
                });
        } else {
            alert("Token no válido.");
            navigate("/login");
        }
    }, [token, navigate]);

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-2xl font-bold">Verificando cuenta...</h1>
            <p>Por favor, espera unos segundos.</p>
        </div>
    );
}

export default VerificarCuenta