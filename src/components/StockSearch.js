import tickerList from "../components/tickerList"
import { Dropdown } from 'semantic-ui-react'
import React from "react"
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import ToStockPage from "./toStockPage";

class StockSearch extends React.Component {
        constructor() {
                super();
                this.state={
                        stockList: [],
                        open: false
                }
        }
        openHandeler (data){
                console.log(data)
                if (this.state.stockList.length < 6){
                        this.setState({open: true});
                }
                else{
                        this.closeHandeler();
                }
        }
        closeHandeler(){
                this.setState({open: false});
        }
        addStock(data) {
                console.log(data.value)
                this.setState({stockList: data.value})
        }
        render() {
                console.log(this.state.stockList)
                return (
                    <div style={{fontSize: 15, textAlign: "center", margin: "0 0 0.5em"}}>
                    <Dropdown
                        placeholder={"Stock"}
                        compact
                        multiple
                        onOpen={(e, data) => this.openHandeler(data)}
                        onClose={(e, data) => this.closeHandeler()}
                        open={this.state.open}
                        closeOnChange={this.state.stockList.length > 4}
                        search={this.state.stockList.length < 6}
                        selection={this.state.stockList.length < 6}
                        options={tickerList}
                        onChange={(e, data) => this.addStock(data)}
                    >

                    </Dropdown>
                            <ToStockPage props={this.state.stockList}/>
                    </div>
                )
        }
}


export default StockSearch