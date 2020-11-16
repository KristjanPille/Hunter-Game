import React from "react";
import {ILoginState} from "./Login";

interface IProps {
    data: ILoginState;
    handleChange: (target:
                       EventTarget & HTMLInputElement |
                       EventTarget & HTMLTextAreaElement) => void;
    onSubmit: () => void;
}

const LoginView = (props: IProps) => (
    <form>
        <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input value={props.data.email} name="email" onChange={(e) => props.handleChange(e.target)} type="text" className="form-control" id="email" aria-describedby="emailHelp" />
        </div>
        <div className="form-group">
            <label htmlFor="password">Password</label>
            <input value={props.data.password}  name="password" onChange={(e) => props.handleChange(e.target)} type="password" className="form-control" id="password" aria-describedby="passwordHelp" />
        </div>
        <div>
            <button type="button" onClick={(e) => props.onSubmit()} >Log in</button>
        </div>
    </form>
);

export default LoginView;
