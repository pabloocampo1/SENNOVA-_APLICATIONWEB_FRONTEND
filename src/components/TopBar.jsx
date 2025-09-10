
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';


const TopBar = () => {
    const {logout} = useAuth()
    const navigate = useNavigate();



    const closeSesion = async () => {
        logout()
       return navigate("/signIn")
    }

    return (
        <div>
            <button onClick={() =>  closeSesion()}>cerrar sesion</button>
        </div>
    );
};

export default TopBar;