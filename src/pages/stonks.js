import React from "react";
import LineGraph from "../components/LineGraph";
import DropDownData from "../components/DropDownData";
import {useLocation} from "react-router-dom";

const Stonks = (props) => {
    let data = "APL"
    const location = useLocation();
    let stocks = location.state.stockList.prop.props
    return(
        <div className='App'>
            <header className='App-header'>
                <DropDownData></DropDownData>
                <LineGraph stockList={stocks}></LineGraph>
            </header>
        </div>

    )
}
export default Stonks;