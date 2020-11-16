import React, { useEffect, useState } from "react";
import HeaderView from "./HeaderView";

export interface IHeader {
    redirect: boolean;
}
const Logout = () => {
    localStorage.removeItem('jwt');
    localStorage.removeItem('email');
    refreshPage();
}

const refreshPage = ()=>{
    window.location.reload();
}

const Header = () => {
    return (
        <>
            <HeaderView  Logout={Logout}/>
        </>
    );
}
export default Header;
