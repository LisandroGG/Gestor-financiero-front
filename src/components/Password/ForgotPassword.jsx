import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { forgotPassword } from "../../redux/actions";

const ForgotPassword = () => {
    const [gmailUsuario, setGmailUsuario] = useState(""); 
    
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleSendEmail = async(e) => {
        e.preventDefault()

        if(!gmailUsuario){
            return alert('Ingrese un gmail')
        }

        await dispatch(forgotPassword(gmailUsuario, navigate))
    }
    
    return(
        <div>
            <h2>Recuperar contraseña</h2>
            <form onSubmit={handleSendEmail}>
                <input
                    type="mail"
                    placeholder="Introduzca el gmail para enviar correo de recuperacion"
                    value={gmailUsuario}
                    onChange={(e) => setGmailUsuario(e.target.value)}
                />
                <button type="submit">Enviar cambio de contraseña</button>
            </form>
        </div>
    )
}

export default ForgotPassword