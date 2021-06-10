import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { AppBar, Tabs, Tab, Container } from "@material-ui/core";

function Header() {
    const [selected, setSelected] = useState(0);
    const history = useHistory();

    return (
        <>
            <AppBar style={{ position: "relative" }}>
                <Container style={{
                    display: "flex",
                    justifyContent: "space-between"
                }}>
                    <span style={{cursor: "pointer"}} onClick={() => history.push("/")} className="logo">VidLearn</span>
                    <span className="tabs">
                        <Tabs
                            style={{ display: "inline-flex" }}
                            value={selected}
                            onChange={(_, i) => setSelected(i)}
                        >
                            <Tab style={{display: "none"}}></Tab>
                            <Tab onClick={() => history.push("/account")} label="Account"></Tab>
                            <Tab onClick={() => history.push("/setting")} label="Settings"></Tab>
                        </Tabs>
                    </span>
                </Container>
            </AppBar>
        </>
    );
}

export default Header;
