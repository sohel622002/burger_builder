import React  from "react";

import classes from "./OrderSummary.module.css";

const OrderSummary = (props) => {

    // console.log('[OrderSummary] Renders')
    const ingredientSummary = Object.keys(props.ingredients)
        .map(igKey => {
            return <li key={igKey}>
                <span style={{ textTransform: "capitalize" }}>
                    {igKey}
                </span> : {props.ingredients[igKey]}
            </li>
        })
    return (
        <div className={classes.OrderSummaryBox}>
            <h4>Your Order</h4><hr />
            <p>A Delicious Burger with the Flollowing Ingredients</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p>Order Price : {props.price.toFixed(2)}</p>
            <p>Continue To Checkout?</p>
            <div>
                <button 
                    className={classes.Cancle}
                    onClick={props.canclepurchase}>CANCLE</button>
                <button 
                    className={classes.Contnue}
                    onClick={props.contnuepurchase}
                    >CONTNUE</button>
            </div>
        </div>
    )
}

export default React.memo(OrderSummary);