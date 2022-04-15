import { Dropdown } from 'semantic-ui-react'
import React from "react"
import Months from "../components/Months";

class Time extends React.Component {
        constructor() {
                super();
                this.state={
                        timeRange: [],
                        open: false
                }
        }
        openHandeler (data){
                console.log(data)
                if (this.state.timeRange.length <= 2){
                        this.setState({open: true});
                }
                else{
                        this.closeHandeler();
                }
        }
        closeHandeler(){
                this.setState({open: false});
        }
        addTime(data) { //--
                console.log(data.value)
                this.setState({timeRange: data.value})
        }
        render() {
                console.log(this.state.timeRange)
                return (
                    <div style={{fontSize: 15, textAlign: "center", margin: "0 0 0.8em"}}>
                    <Dropdown
                        placeholder={"Time"}
                        compact
                        multiple
                        onOpen={(e, data) => this.openHandeler(data)}
                        onClose={(e, data) => this.closeHandeler()}
                        open={this.state.open}
                        closeOnChange={this.state.timeRange.length >= 2}
                        search={this.state.timeRange.length < 2}
                        selection={this.state.timeRange.length < 2}
                        options={Months}
                        onChange={(e, data) => this.addTime(data)}
                    >

                    </Dropdown>
                    </div>
                )
        }
}


export default Time