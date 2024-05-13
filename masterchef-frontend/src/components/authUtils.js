import backend_api from "../backend_api/api";
import { showToastSuccess, showToastFail } from "../components/toasters";
import { useNavigate } from "react-router-dom";
import { setAuthToken } from "../backend_api/api";


export const useUserAuth = () => {
    const navigate = useNavigate();

    //Function for logging out the user
    const UserLogout = async (navigate, logout) => {
    await backend_api.post('/logout').then(response => {
        if(response.data.status === 'success') {
            showToastSuccess("Logout Successfully");
            logout();
            navigate("/login");
        } else {
            showToastFail("Logout Failed");
        }
    });
    }

    //Function for logging in the user
    const UserLogin = async (email, password, login) => {
        await backend_api.post('/login', {
            email,
            password
        }).then(response => {
            if(response.data.status === "success") {
                showToastSuccess("Login Successfully");
                setAuthToken(response.data.token);
                login(response.data.token, response.data.username, response.data.id);
                navigate("/home");
            }
        });
    }

    //Function for registering a user
    const UserRegister = async (username, email, password) => {
        const response = await backend_api.post('/register', {
            username,
            email,
            password,
        });
        return response.data.status;
    }

    return { UserLogin, UserLogout, UserRegister };
}