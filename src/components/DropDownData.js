import React from 'react';
import {Dropdown, DropdownButton, NavDropdown} from "react-bootstrap";
import LineGraph from "./LineGraph";

class DropDownData extends React.Component {
    constructor(prop) {
        super();
        console.log(prop.stockList)
        this.state = {
            title: "Adjusted Close",
            stockList: prop.stockList
        }
    }
    items = ["Adjusted Close", "Open", "Close", "Low", "High", "Volume"]

    changeValue(text) {
        this.setState({title: text})
    }
    getOptions(){
        let options = [];
        for (let i = 0; i <= this.items.length; i++){
            if (this.items[i] !== this.state.title) {
                options.push(<NavDropdown.Item key={i}>
                    <div onClick={(e) => this.changeValue(this.items[i])}>{this.items[i]}</div>
                </NavDropdown.Item>)
            }
        }
        return(
            options
        )
    }

    render() {
        console.log(this.state.title)
        return (
            <div>
            <div className="DataDrop">
                <NavDropdown
                    color = "#C4D6E6"
                    style = {{fontSize: "xx-large", font: "Roboto"}}
                    id="DropDownData"
                    title={this.state.title}
                    menuVariant="dark"
                >
                    {this.getOptions()}
                </NavDropdown>
            </div>
                <LineGraph props={this.state}></LineGraph>
            </div>
        )
    }
}
export default DropDownData