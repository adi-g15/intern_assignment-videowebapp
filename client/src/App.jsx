import React, {useEffect, useState} from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Header from "./components/header";
import MainPage from "./page/index";
import AccountPage from "./page/account";
import SettingPage from "./page/setting";

export default function App() {

    useEffect(() => {
        // todo: Fetch list of stock symbols/name
    }, []);

    return (
            <BrowserRouter>
                <Header />
                <Switch>
                    <Route exact path="/account" component={() => <AccountPage/>} />
                    <Route exact path="/setting" component={() => <SettingPage/>} />
                    <Route path="/" component={() => <MainPage/>} />
                </Switch>
            </BrowserRouter>
    );
}
