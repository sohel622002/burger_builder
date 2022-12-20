import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import CheckOutSummery from "../../Components/Order/CheckOutSummery/CheckOutSummery";

class Checkout extends Component {

    state = {
        ingredients: {
            salad: 1,
            bacon: 1,
            cheese: 0,
            meat: 0
        },
        countinueHandler : false,
        calcleHandler : false
    }

    continueOrderHandler = () => {
    
    }

    cancleOrderHandler = () => {
        this.setState({calcleHandler : true})
    }

    render() {
        return (
            <>
                {this.state.calcleHandler ? <Navigate to="/" /> : null}
                <CheckOutSummery 
                    ingredients={this.state.ingredients}
                    continueOrder={this.continueOrderHandler}
                    cancleOrder={this.cancleOrderHandler}/>
            </>
        )
    }
}

export default Checkout;