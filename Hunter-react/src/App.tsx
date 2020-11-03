import React, { useState } from "react";
import Header from "./Components/shared/Header";
import Home from "./Components/Home";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { AppContextProvider, AppContextInitialState, IAppContext, AppContextConsumer } from "./context/AppContext";
import LoginForm from "./Components/Login/Login";
import RegisterForm from "./Components/Register/Register";
import HunterBase from "./Components/HunterBase/HunterBase";
import AttackBase from "./Components/AttackBase/AttackBase";

const App = () => {
    const setJwt = (jwt: string) => {
        setAppState({...appState, jwt: jwt});
    };

    const setUserName = (userName: string) => {
        console.log('setUserName', userName);
        setAppState({...appState, userName: userName});
    }

    const initialAppState = {
        ...AppContextInitialState,
        setJwt,
        setUserName,
    } as IAppContext;

    const [appState, setAppState] = useState(initialAppState);

    return (
        <AppContextProvider value={appState}>
            <Router>

                <Header />
                <div className="container">
                        <Switch>
                        <Route exact path="/">
                            <Home />
                        </Route>
                        <Route path="/Login">
                            <LoginForm />
                        </Route>
                        <Route path="/Register">
                            <RegisterForm />
                        </Route>
                        <Route path="/HunterBase" >
                            <HunterBase />
                        </Route>
                            <Route path="/AttackBase" >
                                <AttackBase />
                            </Route>
                        <h1>404</h1>
                        </Switch>
                </div>
            </Router>
        </AppContextProvider>
    )
};
export default App;
