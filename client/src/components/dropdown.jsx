import React, { useState } from "react";
import PropTypes from "prop-types";
import {
    TextField
} from "@material-ui/core";
import {
    Autocomplete
} from "@material-ui/lab";
import { get_search_results } from "../../../tmp/tmp/src/services/alphavantage";

// The value chosen will be made available to parent through setStockSymbol
function DropDown({ setStockSymbol, style = {} }) {
    const [search, setSearch] = useState("");
    const [options_array, setOptionsArray] = useState([]);

    function handleInputChange(e) {
        if(Number.isNaN(e.target.value))  return; // ignore change caused due to selecting an option

        setSearch(e.target.value);
        get_search_results(e.target.value)
            .then(data => setOptionsArray(data))
            .catch(err => {
                // basic error handling
                console.error(err);
            });
    }

    return (
        <Autocomplete
            freeSolo
            id="stock-select"
            fullWidth
            onChange={(_, val) => setStockSymbol(val.symbol)}
            onInputChange={handleInputChange}
            className="dropbox"
            options={options_array}
            getOptionLabel={(opt) => (opt ? `${opt.name.substr(0, 15)} (${opt.symbol}; ${opt.type})` : "")}
            style={{ width: "40%", ...style }}
            renderInput={(params) => (
                <TextField
                    {...params}
                    value={search}
                    label="Select Stock"
                    margin="normal"
                    InputProps={{ ...params.InputProps, type: "search" }}
                />
            )}
        />
    );

    // return (
    //         <Select
    //         defaultValue=""
    //         onChange={handleChange}
    //         displayEmpty
    //         >
    //             <MenuItem style={{color: "black"}} value="Loading..." disabled><em style={{color: "black"}} >Loading...</em></MenuItem>
    //             {
    //                 dropdown_list.map((val,i) => (
    //                     <MenuItem value={val} key={i} style={{color: "black"}}>
    //                         {val}
    //                     </MenuItem>)
    //                 )
    //             }
    //         </Select>
    // );
}

DropDown.propTypes = {
    setStockSymbol: PropTypes.func,
    style: PropTypes.object
};

export default DropDown;
