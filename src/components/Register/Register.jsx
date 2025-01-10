import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUsuario } from "../../redux/actions"; // Asegúrate de importar la acción correctamente

const Register = () => {
    const [nombreUsuario, setNombre] = useState("");
    const [gmailUsuario, setGmail] = useState("");
    const [contraseñaUsuario, setContraseña] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!nombreUsuario || !gmailUsuario || !contraseñaUsuario) {
            return;
        }
    
        const userData = {
            nombreUsuario: nombreUsuario,
            gmailUsuario: gmailUsuario,
            contraseñaUsuario: contraseñaUsuario,
        };
    
        const response = await dispatch(registerUsuario(userData));

        if(response.success){
            navigate('/login')
        }else{
            console.log('Error al registrar usuario')
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    placeholder="Nombre" 
                    value={nombreUsuario} 
                    onChange={(e) => setNombre(e.target.value)} 
                />
                <input 
                    type="email" 
                    placeholder="Gmail" 
                    value={gmailUsuario} 
                    onChange={(e) => setGmail(e.target.value)} 
                />
                <input 
                    type="password" 
                    placeholder="Contraseña" 
                    value={contraseñaUsuario} 
                    onChange={(e) => setContraseña(e.target.value)} 
                />
                <button type="submit">Registrarse</button>
            </form>
            <h1>Ya tienes cuenta? <a href="/login">Iniciar sesion</a></h1>
        </div>
    );
};

export default Register;