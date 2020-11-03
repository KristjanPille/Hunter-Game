import React, { useEffect, useState } from "react";
import RegisterView from "./RegisterView";
import { AccountApi } from "../../services/AccountApi";
import {useHistory} from "react-router";

export interface IRegisterState {
    redirect: boolean;
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    nameOfBase: string;
}

const RegisterForm = () => {

    let history = useHistory()
    const [state, setState] = useState(
        {
            redirect: false,
            email: '',
            firstName: '',
            lastName: '',
            password: '',
            nameOfBase: '',
        } as IRegisterState
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
            const data = await AccountApi.register(state.email, state.firstName, state.lastName, state.password, state.nameOfBase);
            if (data.status === 200){
                await callLogin();
            }
        };
        const callLogin = async () => {
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
            <h1>Register Form</h1>
            <RegisterView data={state} handleChange={handleChange} onSubmit={onSubmit} />
        </>
    );
}

export default RegisterForm;
