import { useState } from "react"
import { useDispatch } from "react-redux"
import { loginUsuario } from "../../redux/actions";
import { useNavigate } from "react-router-dom";


const Login = () =>{
    const [gmailUsuario, setGmail] = useState("");
    const [contraseñaUsuario, setContraseña] = useState("")

    const navigate = useNavigate();

    const dispatch = useDispatch()

    const handleSubmit = async (e) => {
        e.preventDefault()

        if(!gmailUsuario || !contraseñaUsuario){
            return;
        }
        const loginData = {
            gmailUsuario: gmailUsuario.trim(),
            contraseñaUsuario: contraseñaUsuario.trim(),
        }
    
        await dispatch(loginUsuario(loginData))
        navigate('/')
    }


    return(
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="mail"
                    placeholder="Introduzca su gmail"
                    value={gmailUsuario}
                    onChange={(e) => setGmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Introduzca su contraseña"
                    value={contraseñaUsuario}
                    onChange={(e) => setContraseña(e.target.value)}
                />
                <button type="submit">Iniciar sesion</button>
            </form>

        </div>
    )
}

export default Login