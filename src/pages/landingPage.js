import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../dick.png";
import StockSearch from "../components/StockSearch";
import Time from "../components/Time"


const LandingPage = () => {
    let navigate = useNavigate();
    return (<div className="App">
        <header className="App-header">
            <img className={"logo"} src={logo} alt={"tickr logo"}/>
            <p style={{margin: "0 0 0"}}>Welcome to tickr</p>
            <Time></Time>
            <StockSearch></StockSearch>
        </header>
    </div>)
}
export default LandingPage