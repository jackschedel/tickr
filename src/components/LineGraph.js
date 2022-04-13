import React from "react";
import {
    Area,
    Line,
    ReferenceLine,
    LineChart,
    AreaChart,
    CartesianGrid,
    Legend,
    Tooltip,
    XAxis,
    YAxis,
    CartesianAxis
} from "recharts";
import {NavDropdown} from "react-bootstrap";

class AreaRechartComponent extends React.Component {
    constructor(stocks) {
        super();
        this.state = {
            stockList: stocks
        }
    }
    data = [
        {
            "name": "Jan 2019",
            "Product A": 3432,
            "Procuct B": 2342
        },
        {
            "name": "Feb 2019",
            "Product A": 2342,
            "Procuct B": 3246
        },
        {
            "name": "Mar 2019",
            "Product A": -4565,
            "Procuct B": 4556
        },
        {
            "name": "Apr 2019",
            "Product A": 6654,
            "Procuct B": 4465
        },
        {
            "name": "May 2019",
            "Product A": 8765,
            "Procuct B": 4553
        }
    ]
    renderLegend() {
        return (
            <ul>
                {
                    this.state.stockList.map((stock) => (
                        <div className="DataDrop">
                            <NavDropdown
                                color = "#C4D6E6"
                                style = {{fontSize: "xx-large", font: "Roboto"}}
                                id={stock}
                                title={stock}
                                menuVariant="dark"
                            >
                                {this.getOptions()}
                            </NavDropdown>
                        </div>
                    ))
                }
            </ul>
        );
    }

    render() {
        return(
        <div className="Graph">
            <LineChart width={800} height={450} data={this.data}
                       margin={{
                           top: 20,
                           right: 20,
                           left: 20,
                           bottom: 5,
                       }}>
                <XAxis dataKey="name" strokeWidth="5" stroke="#c4d6e6" xAxisId="0"/>
                <XAxis dataKey="4" strokeWidth={3} orientation="top" stroke="#424455" xAxisId="1" tickCount={0} tickSize="0" strokeDasharray="7 7"/>
                <YAxis strokeWidth="5" stroke="#c4d6e6" yAxisId={0}/>
                <YAxis strokeWidth="4" orientation="right" stroke="#424455" yAxisId={1} strokeDasharray="7 7"/>>
                <Legend content={this.renderLegend}/>
                <CartesianGrid fill="#31323b" strokeWidth="0"/>
                <ReferenceLine y={0} stroke="#50536a" />
                <Line type="monotone" dataKey="Product A" stroke="#c7c7c7" strokeWidth="3"/>
                <Line type="monotone" dataKey="Procuct B" stroke="#5a8ab5" strokeWidth="3"/>
            </LineChart>
        </div>
        )
    };
}

export default AreaRechartComponent;