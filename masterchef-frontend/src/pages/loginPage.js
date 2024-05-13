import { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import logo from "../images/logo.png";
import { Spinner } from "react-bootstrap";
import { useAuth } from "../components/authProvider";
import { useUserAuth } from "../components/authUtils";

function LoginPage() {
    const { login } = useAuth();
    const { UserLogin } = useUserAuth();
    const [loader, LoaderOn] = useState('LOGIN');
    const [state, setState] = useState({
        email: '',
        password: '',
    });

    const handleSubmit = async (event) => {
        event.preventDefault();
        LoaderOn("");
        await UserLogin(state.email, state.password, login);
        LoaderOn("LOGIN");
    };

    const handleChange = (event) => {
        const field = event.target.name;
        setState((prevState) => ({
            ...prevState,
            [field]: event.target.value,
            errors: {
                ...prevState.errors,
                [field]: '',
            }
        }));
    };

    useEffect(() => {
        const rootDiv = document.getElementById('root');

        if (rootDiv) {
            rootDiv.style.overflow = 'hidden';
        }

        return () => {
            if (rootDiv) {
                rootDiv.style.overflow = '';
            }
        };
    }, []); 

    return(
        <div className="login-body d-inline-flex vh-100 vw-100">
            <ToastContainer />

            <div className="logo-container">
                <img src={ logo } alt="" className="logo"/>
            </div>

            <div className="d-flex justify-content-center align-items-center login-form-container w-50">
                <form onSubmit={handleSubmit} className="row w-75">
                    <h1 className="loginText mb-5">LOGIN</h1>
                    <input
                        className="email-txtbox bg-transparent"
                        name="email" 
                        type="email" 
                        placeholder="Email" 
                        id="email"
                        value={state.email}
                        onChange={handleChange}
                        required />
                    <input
                        className="password-txtbox bg-transparent"
                        name="password"
                        type="password"
                        maxLength={16}
                        placeholder="Password"
                        id="password"
                        value={state.password}
                        onChange={handleChange}
                        required />
                    <p className="text-center mt-4 mb-5 p-login-text">Don't have any account yet??
                        <a href="/register"><b>Click Here!!</b></a>
                    </p>

                    <button 
                        type="submit" 
                        className="login-button fw-bold"
                        disabled={loader === ""}>
                            {loader === "" && <Spinner animation="border" variant="dark" />}
                            {loader}
                    </button>
                </form>

            </div>
                
        </div>
    );
}

export default LoginPage;