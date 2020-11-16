import React from "react";
import { IRegisterState } from "./Register";

interface IProps {
    data: IRegisterState;
    handleChange: (target:
                       EventTarget & HTMLInputElement |
                       EventTarget & HTMLTextAreaElement) => void;
    onSubmit: () => void;
}

const RegisterView = (props: IProps) => (
    <form>
        <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input value={props.data.email} name="email" onChange={(e) => props.handleChange(e.target)} type="text" className="form-control" id="email" aria-describedby="emailHelp" />
        </div>
        <div className="form-group">
            <label htmlFor="firstName">first name</label>
            <input value={props.data.firstName} name="firstName" onChange={(e) => props.handleChange(e.target)} type="text" className="form-control" id="firstName" aria-describedby="textHelp" />
        </div>
        <div className="form-group">
            <label htmlFor="lastName">last name</label>
            <input value={props.data.lastName} name="lastName" onChange={(e) => props.handleChange(e.target)} type="text" className="form-control" id="lastName" aria-describedby="textHelp" />
        </div>
        <div className="form-group">
            <label htmlFor="password">Password</label>
            <input value={props.data.password}  name="password" onChange={(e) => props.handleChange(e.target)} type="password" className="form-control" id="password" aria-describedby="passwordHelp" />
        </div>
        <div className="form-group">
            <label htmlFor="nameOfBase">Your new Base name</label>
            <input value={props.data.nameOfBase} name="nameOfBase" onChange={(e) => props.handleChange(e.target)} type="text" className="form-control" id="nameOfBase" aria-describedby="textHelp" />
        </div>
        <div>
            <button type="button" onClick={(e) => props.onSubmit()} >Register</button>
        </div>
    </form>
);

export default RegisterView;
