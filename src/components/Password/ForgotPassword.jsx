import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { forgotPassword, sendVerification } from "../../redux/actions";
import Input from "../UI/input";
import ErrorMessage from "../UI/ErrorMessage";
import Swal from "sweetalert2";

const ForgotPassword = () => {
    const [gmailUsuario, setGmailUsuario] = useState("");
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [visible, setVisible] = useState(false)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleSendVerification = async(e) => {
        e.preventDefault();

        if (!gmailUsuario) {
            return setError("Ingrese un gmail");
        }

        setIsLoading(true);

        try {
            const response = await dispatch(sendVerification(gmailUsuario))

            if(response.success){
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
            }else{
                setError(response.message);
            }
        } catch (error) {
            setError("Ocurrió un error inesperado.");
        }finally {
            setIsLoading(false)
        }
        
    }

    const handleSendEmail = async(e) => {
        e.preventDefault()

        if(!gmailUsuario){
            return setError('Ingrese un gmail')
        }

        setIsLoading(true)

        try {
            const response = await dispatch(forgotPassword(gmailUsuario))

            if(response.success){
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
            }else{
                if(response.message === "El usuario debe estar verificado"){
                    setVisible(true)
                }
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
            <form onSubmit={handleSendEmail}
            className="flex flex-col gap-4 border-gray-200 border-2 p-4 md:p-8 lg:p-10 rounded-md w-80 md:w-form-md lg:w-form-lg">
                <h2 className="font-bold text-center text-xl">Recuperar contraseña</h2>
                <Input
                    type="mail"
                    placeholder="Introduzca el gmail para enviar correo de recuperacion"
                    value={gmailUsuario}
                    onChange={(e) => setGmailUsuario(e.target.value)}
                />
                <ErrorMessage message={error} />
                {visible && (
                        <span className="w-auto flex justify-center"><button
                            type="button"
                            onClick={handleSendVerification}
                            disabled={isLoading}
                            className={`text-xl font-bold rounded-md bg-sky-500 px-5 py-2.5 text-white hover:bg-sky-700 transition-all ${
                                isLoading ? "opacity-50 cursor-not-allowed" : ""
                            }`}>Enviar correo de verificación</button></span>
                    )}
                <span className="w-auto flex justify-center"><button type="submit" disabled={isLoading}
                className={`text-xl font-bold rounded-md bg-sky-500 px-5 py-2.5 text-white hover:bg-sky-700 transition-all ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}>{isLoading ? "Cargando..." : "Enviar cambio de contraseña"}</button></span>
                <h1 className="font-semibold">Ya tienes cuenta?{" "}<a href="/login" className="text-sky-500 hover:text-sky-700 transition-all">Iniciar sesion</a></h1>
            </form>)}
        </div>
    )
}

export default ForgotPassword