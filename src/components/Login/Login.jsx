import { useState } from "react"
import { useDispatch } from "react-redux"
//importar la funcion loginUsuario

const Login = () =>{
    const [gmailUsuario, setGmail] = useState("");
    const [contraseñaUsuario, setContraseña] = useState("")

    const dispatch = useDispatch()

    const handleSubmit = async (e) => {
        e.preventDefault()

        if(!gmailUsuario || !contraseñaUsuario){
            return;
        }
    }

    const loginData = {
        gmailUsuario: gmailUsuario,
        contraseñaUsuario: contraseñaUsuario
    }
    
    console.log("datos a enviar", loginData)

    //await dispatch(loginUsuario(loginData))

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
                <buttoon type="submit">Iniciar sesion</buttoon>
            </form>

        </div>
    )
}

export default Login