import logo from "../images/logo.png";
import { showToastSuccess } from "../components/toasters";
import { setAuthToken } from "../backend_api/api";
import { useAuth } from "../components/authProvider";
import { useUserAuth } from "../components/authUtils";
import { useNavigate } from "react-router-dom";

function Header({ modalOpen }) {
    const username = localStorage.getItem('username');
    const { UserLogout } = useUserAuth();
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async (event) => {
        event.preventDefault();
        showToastSuccess("Logging Out");
        await UserLogout(navigate, logout);
        setAuthToken();
    }

    return (
        <div className="header-container d-flex">
            
            <div className="header-row1">
                <img src= { logo } alt="" className="home-logo"/>
                    
                <a href="/home" className="align-self-center text-decoration-none home-nav">HOME</a>
            </div>

            <div className="header-buttons d-flex align-content-center justify-content-end">
                <button className="logout-button" onClick={ handleLogout }>LOGOUT</button>

                {username === 'admin' && (
                    <button className="post-modal-button" onClick={ modalOpen }>POST</button>
                )}
            </div>

        </div>
    );
}

export default Header;