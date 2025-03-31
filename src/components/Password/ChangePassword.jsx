import { useSearchParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { changePassword } from "../../redux/actions";
import Input from "../UI/Input";
import ErrorMessage from "../UI/ErrorMessage";
import Swal from "sweetalert2";

const ChangePassword = () => {

    const [searchParams] = useSearchParams()
    const token = searchParams.get("token")
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [nuevaContraseña, setNuevaContraseña] = useState("")

    const handleChangePassword = async(e) => {
        e.preventDefault()

        if (!nuevaContraseña) {
            return setError("Ingrese una contraseña");
        }

        setIsLoading(true)

        try {
            const response = await dispatch(changePassword(token, nuevaContraseña))

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
        }finally{
            setIsLoading(false)
        }
    }

    return(
        <div className="min-h-screen grid place-content-center bg-fondoBody">
            {isLoading ? (
                <>
                <img src="/assets/LoadingGif.gif" alt="Cargando..." className="w-20 h-20 mx-auto" />
                <p>Por favor, espera unos segundos.</p>
                </>
            ) : (
            <form onSubmit={handleChangePassword}
            className="flex flex-col gap-4 bg-fondo border-gray-300 border-2 p-4 md:p-8 lg:p-10 rounded-md w-80 md:w-form-md lg:w-form-lg">
            <h1 className="text-3xl font-bold text-center text-sky-500">Ingrese su nueva contraseña</h1>
            <img src="assets/logo.svg" alt="logo" loading="lazy" className="h-[200px] md:h-[300px] lg:h-[400px] drop-shadow-lg"/>
                <Input 
                    type='password'
                    placeholder="Nueva contraseña"
                    value={nuevaContraseña}
                    onChange={(e) => setNuevaContraseña(e.target.value)}
                />
                <ErrorMessage message={error} />
                <span className="w-auto flex justify-center"><button type="submit" disabled={isLoading}
                className={`text-xl font-bold rounded-md bg-sky-500 ring-sky-700 hover:ring-2 px-5 py-2.5 text-white hover:bg-sky-700 transition-all ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}>{isLoading ? "Cargando..." : "Actualizar contraseña"}</button></span>
            </form>)}
        </div>
    )
}

export default ChangePassword;