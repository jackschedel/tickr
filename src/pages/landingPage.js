import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../dick.png";
import StockSearch from "../components/StockSearch";
import Time from "../components/Time";

const LandingPage = () => {
    let navigate = useNavigate();
    return (<div className="App">
        <header className="App-header">
            <img className={"logo"} src={logo} alt={"tickr logo"}/>
            <p style={{margin: "0 0 0"}}>Welcome to tickr</p>
            <StockSearch></StockSearch>
            <Time></Time>
            <div align={"center"}>
                <Button style= {{fontSize: 18, backgroundColor: "#5a8ab5", color: "#2a2b32", outlineWidth: 0}}  type="submit" onClick={() => navigate('/Stock')}>
                    Get Data
                </Button>
            </div>
        </header>
    </div>)
}
export default LandingPage