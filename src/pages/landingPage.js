import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../dick.png";

const LandingPage = () => {
    let navigate = useNavigate();
    return (<div className="App">
        <header className="App-header">
            <img className={"logo"} src={logo} alt={"tickr logo"}/>
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>Welcome to tickr</Form.Label>
                    <Form.Control type="name" placeholder="Enter Stock Ticker"/>
                </Form.Group>
                <Button style= {{backgroundColor: "#5a8ab5", color: "#2a2b32", outlineWidth: 0}}  type="submit" onClick={() => navigate('/Stock')}>
                    Get Data
                </Button>
            </Form>
        </header>
    </div>)
}
export default LandingPage