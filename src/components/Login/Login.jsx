import { useState } from "react"
import { useDispatch } from "react-redux"
import { loginUsuario } from "../../redux/actions";


const Login = () =>{
    const [gmailUsuario, setGmail] = useState("");
    const [contraseñaUsuario, setContraseña] = useState("")

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

            <h1>¿No tienes una cuenta?<a href="/register"> Registrarse</a></h1>
            <h1><a href="/forgotPassword">Olvide mi contraseña</a></h1>
        </div>
    )
}

export default Login