import { useSearchParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { changePassword } from "../../redux/actions";
import Input from "../UI/input";
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
        <div className="min-h-screen grid place-content-center">
            {isLoading ? (
                <>
                <img src="/assets/LoadingGif.gif" alt="Cargando..." className="w-20 h-20 mx-auto" />
                <p>Por favor, espera unos segundos.</p>
                </>
            ) : (
            <form onSubmit={handleChangePassword}
            className="flex flex-col gap-4 border-gray-200 border-2 p-4 rounded-md w-72 md:w-[500px] lg:w-[800px]">
            <h2 className="font-bold text-center text-xl">Ingrese su nueva contraseña</h2>
                <Input 
                    type='password'
                    placeholder="Nueva contraseña"
                    value={nuevaContraseña}
                    onChange={(e) => setNuevaContraseña(e.target.value)}
                />
                <ErrorMessage message={error} />
                <button type="submit" disabled={isLoading}
                className={`text-xl font-bold rounded-md bg-sky-500 px-5 py-2.5 text-white hover:bg-sky-700 transition-all ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}>{isLoading ? "Cargando..." : "Actualizar contraseña"}</button>
            </form>)}
        </div>
    )
}

export default ChangePassword;