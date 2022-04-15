import {Link, useNavigate} from 'react-router-dom';
import Button from "react-bootstrap/Button";
import React from "react";

function ToStockPage(prop){
    let navigate = useNavigate()
    const toStock=()=>{
        navigate('/stock',{state: {stockList: {prop}}});
    }
    return(
    <div align={"center"} style={{margin: "5px 0 0"}}>
        <Button style= {{backgroundColor: "#5a8ab5", color: "#2a2b32", outlineWidth: 0}}  type="submit" onClick={() => {toStock()}}>
            Get Data
        </Button>
    </div>
    )
}
export default ToStockPage