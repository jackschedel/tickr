import React from "react";
import LineGraph from "../components/LineGraph";
import DropDownData from "../components/DropDownData";

const Stonks = () => {
    let data = "APL"
    return(
        <div className='App'>
            <header className='App-header'>
                <DropDownData></DropDownData>
                <LineGraph></LineGraph>
            </header>
        </div>

    )
}
export default Stonks;