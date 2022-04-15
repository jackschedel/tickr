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
import {Dropdown, Button} from "semantic-ui-react";
import tickerList from "../components/tickerList";

class AreaRechartComponent extends React.Component {
    constructor() {
        super();
        this.state = {
            stockList: ["APL", "A", "GM"],
            data: "Adjusted CLose"
        }
    }
    data = [
        {
            "name": "Jan 2019",
            "APL": 3432,
            "A": 2342,
            "GM": 9402
        },
        {
            "name": "Feb 2019",
            "APL": 2342,
            "A": 3246,
            "GM": 2329
        },
        {
            "name": "Mar 2019",
            "APL": -4565,
            "A": 4556,
            "GM": 2302
        },
        {
            "name": "April 2019",
            "APL": 6654,
            "A": 4465,
            "GM": 4390,
        },
        {
            "name": "May 2019",
            "APL": 8765,
            "A": 4553,
            "GM": 2131,
        },
        {
            "name": "June 2019",
            "APL": 4328,
            "A": 1024,
            "GM": 2432
        },
        {
            "name": "July 2019",
            "APL": 7904,
            "A": 3742,
            "GM": 6490
        },
        {
            "name": "Aug 2019",
            "APL": 2892,
            "A": 1901,
            "GM": 4322
        },
        {
            "name": "Sept 2019",
            "APL": 7590,
            "A": 2090,
            "GM": 4902
        },
        {
            "name": "Nov 2019",
            "APL": 2389,
            "A": 4900,
            "GM": 6062
        }
    ]

    changeStock(stock, data) {
        var temp = this.state.stockList;
        temp[temp.indexOf(stock.dataKey)]=data.value;
        this.setState({stockList: temp},() => {
            console.log(this.state.stockList);
        });
    }

    removeStock(stock) {
        var temp = this.state.stockList;
        console.log(temp);
        var index = temp.indexOf(stock.dataKey);
        if(index>-1) {
            temp.splice(index, 1);
        }
        this.setState({stockList: temp}, () => {
            console.log(this.state.stockList);
        });
    }

    renderLegend = (props) => {
        let payload = props.payload;
        return (
                    payload.map((stock) => (
                        <div align={"middle"}>
                            <div  style={{fontSize: 15, color: stock.color, textAlign: "center", margin: "0 0 0.5em"}}>
                            <Button.Group>
                                <Button
                                    style={{height: '20px', width : '20px', fontSize: 8, backgroundColor: '#33343d'}}
                                    compact
                                    content='X'
                                    focusable
                                    negative
                                    onClick={() => this.removeStock(stock)}
                                    />
                            </Button.Group>
                            {'  '}
                            <Dropdown
                                search
                                scrolling
                                lazyLoad
                                closeOnChange
                                options={tickerList}
                                value={stock.dataKey}
                                onChange={(e, data) => this.changeStock(stock, data)}
                            ></Dropdown>
                            </div>               
                        </div>
                    ))
        )
    }

    renderLines(){
        let colorList = ["#c7c7c7", "#5a8ab5", "#9527F2","#9E205C","#1C9D94","#A06746"];
        let outputList = [];
        for (let i = 0; i < colorList.length && i < this.state.stockList.length; i++) {
            outputList.push({
                stock: this.state.stockList[i],
                color: colorList[i]
                }
            )
        }
        return(
            outputList.map((pair) => (
                <Line key={pair.stock} type="natural" dataKey={pair.stock} stroke={pair.color} strokeWidth="3"/>
            ))
        )
    }

    render() {
        return(
        <div className="Graph">
            <LineChart width={800} height={450} data={this.data} stackOff
                       margin={{
                           top: 20,
                           right: 20,
                           left: 20,
                           bottom: 5,
                       }}>
                <XAxis dataKey="name" strokeWidth="5" stroke="#c4d6e6" xAxisId="0" XAxis interval={0}/>
                <XAxis dataKey="4" strokeWidth={3} orientation="top" stroke="#424455" xAxisId="1" tickCount={0} tickSize="0" strokeDasharray="7 7"/>
                <YAxis domain={['dataMin', 'dataMax']} strokeWidth="5" stroke="#c4d6e6" yAxisId={0}/>
                <YAxis domain={['dataMin', 'dataMax' + 100]} strokeWidth="4" orientation="right" stroke="#424455" yAxisId={1} strokeDasharray="7 7"/>
                <CartesianGrid fill="#31323b" strokeWidth="0"/>
                {this.renderLines()}
                <Legend orientation={"horizontal"} content={this.renderLegend}/>
                <ReferenceLine y={0} stroke="#50536a"/>
                <Tooltip />
            </LineChart>
        </div>
        )
    };
}

export default AreaRechartComponent;