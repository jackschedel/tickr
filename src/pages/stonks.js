import React from "react";
import LineGraph from "../components/LineGraph";
import DropDownData from "../components/DropDownData";
import {useLocation} from "react-router-dom";

const Stonks = (props) => {
    let data = "APL"
    const location = useLocation();
    let stocks = location.state.stockList.prop.props
    return(
        <div className='App' align={"center"}>
            <header className='App-header'>
                <DropDownData stockList={stocks}></DropDownData>
            </header>
        </div>

    )
}
export default Stonks;