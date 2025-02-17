import { useSearchParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { changePassword } from "../../redux/actions";

const ChangePassword = () => {

    const [searchParams] = useSearchParams()
    const token = searchParams.get("token")

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [nuevaContraseña, setNuevaContraseña] = useState("")

    const handleChangePassword = async(e) => {
        e.preventDefault()

        const response = await dispatch(changePassword(token, nuevaContraseña))

        if (response.success) {
            navigate('/login');
        } else {
            alert("Error al cambiar la contraseña");
        }
    }

    return(
        <div>
            <h2>Ingrese su nueva contraseña</h2>
            <form onSubmit={handleChangePassword}>
                <input 
                    type='password'
                    placeholder="Nueva contraseña"
                    value={nuevaContraseña}
                    onChange={(e) => setNuevaContraseña(e.target.value)}
                    required
                />
                <button type="submit">Guardar nueva contraseña</button>
            </form>
        </div>
    )
}

export default ChangePassword;