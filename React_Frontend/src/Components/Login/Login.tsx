import React, { useEffect, useState } from "react";
import LoginView from "./LoginView";
import { useHistory } from "react-router"
import {AccountApi} from "../../services/AccountApi";

export interface ILoginState {
    redirect: boolean;
    email: string;
    password: string;
}

const LoginForm = () => {

    let history = useHistory()
    const [state, setState] = useState(
        {
            redirect: false,
            email: '',
            password: '',
        } as ILoginState
    );

    const handleChange = (target:
                              EventTarget & HTMLInputElement |
                              EventTarget & HTMLSelectElement |
                              EventTarget & HTMLTextAreaElement) => {

        const t1 = target as HTMLInputElement;
        console.log(t1.name, '-', t1.value, t1.type, t1.checked, t1);

        if (target.type === 'text' || target.type === 'password') {
            setState({ ...state, [target.name]: target.value });
        }
    }

    const onSubmit = () => {
        const callApi = async () => {
            const data = await AccountApi.login(state.email, state.password);
            if (data.statusCode === 200){
                localStorage.setItem('jwt', data.data!.token);
                localStorage.setItem('email', state.email);
                state.redirect = true;
            }
            if(state.redirect){
                history.push("/")
                window.location.reload();
            }
        };
        callApi();
    }

    return (
        <>
            <h1>Login Form</h1>
            <LoginView data={state} handleChange={handleChange} onSubmit={onSubmit} />
        </>
    );
}

export default LoginForm;
