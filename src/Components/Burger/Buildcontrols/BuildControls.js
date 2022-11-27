
import React from "react";  

import BuildControl from "./BuildControl/BuildControl";
import classes from "./BuildControls.module.css"

const controls = [
    { label: "Salad", type : "salad"},
    { label: "Cheese", type : "cheese"},
    { label: "Meat", type : "meat"},
    { label: "Bacon", type : "bacon"}
]

const buildControls = ( props ) => (
    <div>
        <p>Current Price: <strong>{props.price.toFixed(2)}</strong>$</p>
        {controls.map(ctrl => (
            <BuildControl 
            key={ctrl.label} 
            label={ctrl.label}
            added={() => props.ingredientAdded(ctrl.type)}
            removed={() => props.ingredientRemoved(ctrl.type)}
            disable={props.disable[ctrl.type]}/>
        ))}
        <button 
        className={classes.OrderButton}
        disabled={!props.purchable}
        onClick={props.purchasing}>ORDER NOW</button>
    </div>
)

export default buildControls;