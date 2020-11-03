import React from "react";
import {IHunterBase} from "../domain/IHunterBase";

export interface IAppContext {
    jwt: string | null;
    userName: string;
    setUserName: (userName: string) => void;
}

export const AppContextInitialState : IAppContext = {
    jwt: localStorage.getItem('jwt'),
    userName: 'foobar',
    setUserName: (x) => {},
}

export const AppContext = React.createContext<IAppContext>(AppContextInitialState);

export const AppContextProvider = AppContext.Provider;
export const AppContextConsumer = AppContext.Consumer;
