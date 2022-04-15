import React from 'react';
import {Dropdown, DropdownButton, NavDropdown} from "react-bootstrap";

class DropDownData extends React.Component {
    constructor() {
        super();

        this.state = {
            title: "Adjusted Close"
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
                let stringhref = "#action/3."
                stringhref += {i}
                options.push(<NavDropdown.Item key={i} href={stringhref}>
                    <div onClick={(e) => this.changeValue(this.items[i])}>{this.items[i]}</div>
                </NavDropdown.Item>)
            }
        }
        return(
            options
        )
    }

    render() {
        return (
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
        )
    }
}
export default DropDownData