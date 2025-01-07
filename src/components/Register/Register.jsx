import { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUsuario } from "../../redux/actions"; // Asegúrate de importar la acción correctamente

const Register = () => {
    const [nombreUsuario, setNombre] = useState("");
    const [gmailUsuario, setGmail] = useState("");
    const [contraseñaUsuario, setContraseña] = useState("");
    const dispatch = useDispatch();

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
    
        console.log("Datos a enviar:", userData);
    
        await dispatch(registerUsuario(userData));
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
        </div>
    );
};

export default Register;