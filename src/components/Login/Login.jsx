import { useState } from "react"
import { useDispatch } from "react-redux"
import { loginUsuario } from "../../redux/actions";
import Swal from "sweetalert2";
import Input from "../UI/input";
import ErrorMessage from "../UI/ErrorMessage";


const Login = () =>{
    const [gmailUsuario, setGmail] = useState("");
    const [contraseñaUsuario, setContraseña] = useState("")
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const dispatch = useDispatch()

    const handleSubmit = async (e) => {
        e.preventDefault()

        if(!gmailUsuario || !contraseñaUsuario){
            setError("Todos los campos deben ser obligatorios")
            return;
        }

        setIsLoading(true);

        const loginData = {
            gmailUsuario: gmailUsuario.trim(),
            contraseñaUsuario: contraseñaUsuario.trim(),
        }
        
        try {
            const response = await dispatch(loginUsuario(loginData));

            if(response.success){
                Swal.fire({
                        icon: "success",
                        title: response.message,
                        showConfirmButton: false,
                        timer: 2000,
                        timerProgressBar: true,
                    });
            }else {
                setError(response.message);
            }

        } catch (error) {
            setError("Ocurrió un error inesperado.");
        }finally {
            setIsLoading(false)
        }
    }


    return(
        <div className="min-h-screen grid place-content-center">
            {isLoading ? (
        <>
        <img src="/assets/LoadingGif.gif" alt="Cargando..." className="w-20 h-20 mx-auto" />
        <p>Por favor, espera unos segundos.</p>
        </>
    ) : (
            <form onSubmit={handleSubmit}
            className="flex flex-col gap-4 border-gray-200 border-2 p-4 md:p-8 lg:p-10 rounded-md w-80 md:w-form-md lg:w-form-lg">
                <h1 className="text-2xl font-bold">Iniciar sesion</h1>
                <Input
                    type="mail"
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
                <span className="w-auto flex justify-center"><button type="submit" 
                disabled={isLoading}
                className={`text-xl font-bold rounded-md bg-sky-500 px-5 py-2.5 text-white hover:bg-sky-700 transition-all ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}>{isLoading ? "Cargando..." : "Iniciar Sesion"}</button></span>
            <div className="flex flex-col sm:flex-row text-center justify-between">
            <h1 className="font-semibold">¿No tienes una cuenta? <a href="/register" className="text-sky-500 hover:text-sky-700 transition-all"> Registrate</a></h1>
            <h1 className="font-semibold"><a href="/forgotPassword" className="text-sky-500 hover:text-sky-700 transition-all">Olvide mi contraseña</a></h1>
            </div>
            </form>)}
        </div>
    )
}

export default Login