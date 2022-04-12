import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import React from "react";
import logo from "../dick.png";

const landingPage = () => {
    return (<div className="App">
        <header className="App-header">
            <img src={logo} alt={"tickr logo"}/>
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>Get Ticker Data</Form.Label>
                    <Form.Control type="name" placeholder="Enter Stock Ticker"/>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Get Data
                </Button>
            </Form>
        </header>
    </div>)
}
export default landingPage