import { useState } from "react";
import { ToastContainer } from "react-toastify";
import logo from "../images/logo.png";
import { Spinner } from "react-bootstrap";
import { useUserAuth } from "../components/authUtils";
import { showToastSuccess, showToastFail } from "../components/toasters";

function RegisterPage() {
    const [loader, LoaderOn] = useState('REGISTER');
    const { UserRegister } = useUserAuth();
    const [state, setState] = useState({
        username: '',
        email: '',
        password: '',
    });

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

    const handleSubmit = (event) => {
        event.preventDefault();
        LoaderOn("");

        UserRegister(state.username, state.email, state.password).then(response => {
            if(response.data.status === 'success') {
                showToastSuccess("Account Registered");
                LoaderOn("REGISTER");
            } else {
                showToastFail("Registration Failed");
                LoaderOn("REGISTER");
            }
        });
    }

    return (
        <div className="register-body d-inline-flex vh-100 vw-100">
            <ToastContainer />

            <div className="logo-container">
                <img src={ logo } alt="" className="logo"/>
            </div>

            <div className="d-flex justify-content-center align-items-center login-form-container w-50">

                <form onSubmit={handleSubmit} className="row w-75">
                    <h1 className="registerText mb-5">REGISTER</h1>
                    <input
                        className="username-txtbox"
                        name="username"
                        id="username"
                        type="text"
                        maxLength={16}
                        placeholder="Username"
                        value={state.username}
                        onChange={handleChange}
                        required/>

                    <input
                        className="email-txtbox"
                        name="email"
                        id="email"
                        type="email"
                        placeholder="Email"
                        value={state.email}
                        onChange={handleChange}
                        required/>

                    <input
                        className="password-txtbox"
                        name="password"
                        id="password"
                        type="password"
                        placeholder="Password"
                        value={state.password}
                        onChange={handleChange}
                        required/>

                    <p className="text-center mt-4 mb-5 p-register-text">Already have an account?
                        <a href="/login"><b>Login Now!!</b></a>
                    </p>

                    <button 
                        type="submit"
                        className="register-button fw-bold"
                        disabled={loader === ""}>
                            {loader === "" && <Spinner animation="border" variant="dark" />}
                            {loader}
                    </button>
                </form>

            </div>

        </div>

    );
}
export default RegisterPage;