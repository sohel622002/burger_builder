import React from "react";

import classes from "./BuildControl.module.css";



const buildControl = (props) => (
    <div className={classes.BuildControl}>
        <div>{props.label}</div>
        <div>
        <button className={classes.Less}
        onClick={props.removed}
        disabled={props.disable}>Less</button>
        <button 
        className={classes.More} 
        onClick={props.added}>More</button>
        </div>
    </div>
)

export default buildControl;