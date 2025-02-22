import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";

const VerificarCuenta = () => {
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState("");

    const LOCAL = import.meta.env.VITE_LOCAL;

    useEffect(() => {
        if (token) {
            axios.get(`${LOCAL}/usuarios/verificar?token=${token}`, { withCredentials: true })
                .then(() => {
                    setMessage("¡Cuenta verificada con éxito! Redirigiendo...");
                    setTimeout(() => {
                        navigate("/login");
                    }, 1000);
                })
                .catch(error => {
                    setError(error.response?.data?.message || "Error al verificar la cuenta. Redirigiendo...");
                    setTimeout(() => {
                        navigate("/login");
                    }, 1000);
                })
                .finally(() => {
                    setLoading(false);
                });
        } else {
            setError("Token no válido. Redirigiendo...");
            setTimeout(() => {
                navigate("/login");
            }, 3000);
        }
    }, [token, navigate, LOCAL]);

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-2xl font-bold">Verificando cuenta...</h1>
            {loading ? (
                <p>Por favor, espera unos segundos.</p>
            ) : error ? (
                <p className="text-red-500 font-bold">{error}</p>
            ) : (
                <p className="text-green-500 font-bold">{message}</p>
            )}
        </div>
    );
};

export default VerificarCuenta;