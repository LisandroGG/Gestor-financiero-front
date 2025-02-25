import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUsuario } from "../../redux/actions";
import Input from "../UI/input";
import ErrorMessage from "../UI/ErrorMessage";
import Swal from 'sweetalert2';

const Register = () => {
    const [nombreUsuario, setNombre] = useState("");
    const [gmailUsuario, setGmail] = useState("");
    const [contraseñaUsuario, setContraseña] = useState("");
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nombreUsuario || !gmailUsuario || !contraseñaUsuario) {
        setError("Todos los campos son obligatorios")
        return;
    }

    setIsLoading(true);

    const userData = {
        nombreUsuario: nombreUsuario,
        gmailUsuario: gmailUsuario,
        contraseñaUsuario: contraseñaUsuario,
    };

    try {
        const response = await dispatch(registerUsuario(userData));

        if (response.success) {
            setError("");
            Swal.fire({
                icon: "success",
                title: response.message,
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                willClose: () => {
                    navigate("/login");
            },
            });
        } else {
            setError(response.message);
        }
        } catch (error) {
            setError("Ocurrió un error inesperado.");
        } finally {
            setIsLoading(false);
    }
    };

    return (
        <div className="min-h-screen grid place-content-center">
            {isLoading ? (
        <>
        <img src="/assets/LoadingGif.gif" alt="Cargando..." className="w-20 h-20 mx-auto" />
        <p>Por favor, espera unos segundos.</p>
        </>
    ) : (
        <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 border-gray-200 border-2 p-4 rounded-md w-72 md:w-[500px] lg:w-[800px]"
        >
            <h1 className="text-2xl font-bold">Crear una cuenta</h1>
            <Input
                type="text"
                placeholder="Introduzca su nombre"
                value={nombreUsuario}
                onChange={(e) => setNombre(e.target.value)}
            />
            <Input
                type="text"
                placeholder="Introduzca su gmail"
                value={gmailUsuario}
                onChange={(e) => setGmail(e.target.value)}
            />
            <Input
                type="password"
                placeholder="Introduzca su contraseña"
                value={contraseñaUsuario}
                onChange={(e) => setContraseña(e.target.value)}
            />
            <ErrorMessage message={error} />
            <span className="w-auto flex justify-center"><button
            type="submit"
            disabled={isLoading}
            className={`text-xl font-bold rounded-md bg-sky-500 px-5 py-2.5 text-white hover:bg-sky-700 transition-all ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            >
            {isLoading ? "Cargando..." : "Crear Cuenta"}
            </button></span>
            <h1 className="font-semibold">
            Ya tienes cuenta?{" "}
            <a href="/login" className="text-sky-500 hover:text-sky-700 transition-all">
            Iniciar sesion
            </a>
            </h1>
        </form>)}
    </div>
    );
};

export default Register;