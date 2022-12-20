import React from "react";

import Burger from "../../Burger/Burger"
import classes from './CheckOutSummery.module.css'

const CheckOutSummery = (props) => {

    return (
        <div>
            <h3>We Hope It Taste Good!</h3>
            <Burger ingredients={props.ingredients} />
            <div className={classes.buttons}>
                <button
                    className={classes.Cancle}
                    onClick={props.cancleOrder}
                >CANCLE</button>
                <button
                    className={classes.Contnue}
                    onClick={props.continueOrder}
                >CONTNUE</button>
            </div>
        </div>
    )
}
export default CheckOutSummery;