import React, { useState } from "react";
import DropDown from "./dropdown";
import {
    InputLabel,
    FormControl
} from "@material-ui/core";
import CompareTable from "./compare_table";
import { get_global_quote } from "../../../tmp/tmp/src/services/alphavantage";

export default function Compare() {
    const [stock_a_data, setStock_A_Data] = useState({});
    const [stock_b_data, setStock_B_Data] = useState({});

    function changeStock(stock_opt, new_symbol) {
        get_global_quote(new_symbol)
            .then(data => {
                switch (stock_opt) {
                    case "A": setStock_A_Data(data); break;
                    case "B": setStock_B_Data(data); break;
                    default: console.error("Wrong stock_opt passed to changeStock !");
                }
            })
            .catch(err => console.error(err));
    }

    return (
        <div>
            <div className="compare">
                <FormControl style={{ width: "50%", alignItems: "center" }}>
                    <InputLabel htmlFor="stock-select-a" style={{ position: "relative", color: "whitesmoke" }}>Stock A</InputLabel>
                    <DropDown
                        id="stock-select-a"
                        setStockSymbol={symbol => changeStock("A", symbol)}
                        style={{ width: "80%" }}
                    />
                </FormControl>
                <FormControl style={{ width: "50%", alignItems: "center" }}>
                    <InputLabel htmlFor="stock-select-b" style={{ position: "relative", color: "whitesmoke" }}>Stock B</InputLabel>
                    <DropDown
                        id="stock-select-b"
                        setStockSymbol={symbol => changeStock("B", symbol)}
                        style={{ width: "80%" }}
                    />
                </FormControl>
            </div>
            <div className="compare_table">
                    {
                        ((stock_a_data.symbol) && (stock_b_data.symbol)) ? (
                            <CompareTable
                                stock_a={stock_a_data}
                                stock_b={stock_b_data}
                            />): (<></>)
                    }
            </div>
        </div>
    );
}
