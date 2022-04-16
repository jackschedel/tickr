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
import axios from "axios";

class AreaRechartComponent extends React.Component {
    constructor(prop) {
        super();
        this.state = {
            stockList: prop.props.stockList,
            data: prop.props.title,
            responseData: [],
            loaded: false
        }
    }

    componentWillReceiveProps(nextProps, nextContext){
        this.setState({data: nextProps.props.title, loaded: false})
    }
    getData(currStock, data){
        console.log(data)
        axios.get('http://localhost:80', {
            params: {
                Reason: "stockData",
                Statistic: data,
                Ticker: currStock,
                Resolution: 35,
                StartDate: "",
                EndDate: ""
            }
        })
            .then(response => {
                let output = response.data
                this.setState({responseData: output, loaded: true})
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    }

    addStock(data) {
        var temp = this.state.stockList;
        const index = temp.indexOf(data.value);
        if (index===-1) {
            temp.push(data.value);
        }
        this.setState({stockList: temp, loaded: false}, () => {
        })
    }

    changeStock(stock, data) {
        var temp = this.state.stockList;
        const index = temp.indexOf(stock.dataKey);
        if (index>-1) {
            temp[index]=data.value;
        }
        this.setState({stockList: temp, loaded: false},() => {
        });
    }

    removeStock(stock) {
        var temp = this.state.stockList;
        const index = temp.indexOf(stock.dataKey);
        if(index>-1) {
            temp.splice(index, 1);
        }
        this.setState({stockList: temp, loaded: false}, () => {
        });
    }

    renderLegend = (props) => {
        let payload = props.payload;
        return (
                    payload.map((stock) => (
                        <div align={"middle"}>
                            <div  style={{fontSize: 15, color: stock.color, textAlign: "middle", margin: "0 0 0.5em"}}>
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
                            >

                            </Dropdown>
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

    renderAdd() {
        if (this.state.stockList.length >= 6) {
            return (
                <div align={"middle"}>
                <Dropdown
                    disabled
                    button
                    style={{height: '30px', width: '55px', fontSize: 12, backgroundColor: 'teal', color: "white"}}
                    color = "white"
                    text = "+"
                    selection
                    compact
                    />
            </div>
            )
        }
        return (
            <div align={"middle"}>
                <Dropdown
                    button
                    style={{height: '30px', width: '55px', fontSize: 12, backgroundColor: 'teal', color: "white"}}
                    color = "white"
                    text = "+"
                    selection
                    search
                    scrolling
                    lazyLoad
                    onChange={(e, data) => this.addStock(data)}
                    closeOnChange
                    options={tickerList}
                    compact
                    />
            </div>
        )
    }

    render() {
        if (!this.state.loaded) {
            this.getData(this.state.stockList, this.state.data)
        }
        console.log(this.state.responseData)
        return(
        <div className="Graph">
            <LineChart width={800} height={450} data={this.state.responseData} stackOff
                       margin={{
                           top: 20,
                           right: 20,
                           left: 20,
                           bottom: 5,
                       }}>
                <XAxis dataKey="Name" strokeWidth="5" stroke="#c4d6e6" xAxisId="0" XAxis/>
                <XAxis dataKey="4" strokeWidth={3} orientation="top" stroke="#424455" xAxisId="1" tickCount={0} tickSize="0" strokeDasharray="7 7"/>
                <YAxis scale={"auto"} strokeWidth="5" stroke="#c4d6e6" yAxisId={0}/>
                <YAxis scale={"auto"} strokeWidth="4" orientation="right" stroke="#424455" yAxisId={1} strokeDasharray="7 7"/>
                <CartesianGrid fill="#31323b" strokeWidth="0"/>
                {this.renderLines()}
                <Legend content={this.renderLegend}/>
                <ReferenceLine y={0} stroke="#50536a"/>
                <Tooltip />
            </LineChart>
            {this.renderAdd()}
        </div>
        )
    };
}

export default AreaRechartComponent;