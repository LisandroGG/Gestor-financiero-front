import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUsuario } from "../../redux/actions";
import Input from "../UI/input";
import ErrorMessage from "../UI/ErrorMessage";

const Register = () => {
    const [nombreUsuario, setNombre] = useState("");
    const [gmailUsuario, setGmail] = useState("");
    const [contraseñaUsuario, setContraseña] = useState("");
    const [error, SetError] = useState("")
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nombreUsuario || !gmailUsuario || !contraseñaUsuario) {
        SetError("Todos los campos son obligatorios")
        return;
    }

    const userData = {
        nombreUsuario: nombreUsuario,
        gmailUsuario: gmailUsuario,
        contraseñaUsuario: contraseñaUsuario,
    };

    const response = await dispatch(registerUsuario(userData));

    if (response.success) {
        navigate("/login");
    } else {
        console.log(response.message)
        SetError(response.message)
    }
    };

    return (
        <div className="min-h-screen grid place-content-center">
        <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 border-gray-200 border-2 p-4 rounded-md w-72"
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
            <button
                type="submit"
                className="text-xl font-bold rounded-md bg-sky-500 px-5 py-2.5 text-white hover:bg-sky-700 transition-all"
            >
            Crear Cuenta
            </button>
            <h1 className="font-semibold">Ya tienes cuenta?{" "}
                <a href="/login" className="text-black hover:text-sky-700 transition-all">
                Iniciar sesion
                </a>
            </h1>
        </form>
    </div>
    );
};

export default Register;