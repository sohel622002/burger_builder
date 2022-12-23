import React, { Component } from "react";

import Burger from "../../Components/Burger/Burger"
import BuildControls from "../../Components/Burger/Buildcontrols/BuildControls";
import Modal from "../../Components/UI/Modal/Modal"
import OrderSummary from "../../Components/Burger/OrderSummary/OrderSummary"
import Spinner from "../../Components/UI/Spinner/Spinner";
import withErrorHandler from "../../Components/HOC/withErrorHandler/withErrorHandler";
import axios from '../../axios.orders'
import { Navigate } from "react-router-dom";

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

class BurgerBuilder extends Component {

    state = {
        ingredients: null,
        totalPrice: 4,
        purchable: false,
        purchasing: false,
        loading: false,
        errormsg:false,
        navigateToCkeckOut : false
    }

    componentDidMount() {
        axios.get('https://my-burger-app-da6a3-default-rtdb.firebaseio.com/Ingredients.json' )
            .then( response => {
                this.setState({ ingredients: response.data });
            } )
            .catch( error => {
                this.setState({errormsg : true});
            });
    }

    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey]
            })
            .reduce((sum, el) => {
                return sum + el
            }, 0);
        this.setState({ purchable: sum > 0 })
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;

        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;

        this.setState({
            ingredients: updatedIngredients,
            totalPrice: newPrice
        });
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0) {
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;

        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;

        this.setState({
            ingredients: updatedIngredients,
            totalPrice: newPrice
        });
        this.updatePurchaseState(updatedIngredients);
    };

    pruchasingHandler = () => {
        this.setState({ purchasing: true })
    };

    canclePurchaseHandler = () => {
        this.setState({ purchasing: false })
    };

    contnuePurchaseHandler = () => {
        this.setState({navigateToCkeckOut : true})
    };


    render() {

        const disableInfo = {
            ...this.state.ingredients
        };
        for (let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0;
        }

        let orderSummary = null;

        let burger = this.state.errormsg ? <p>Ingredients can't be Loaded....!</p> : <Spinner />;

        if (this.state.ingredients) {
            burger = (
                <>
                    <Burger ingredients={this.state.ingredients} />
                    <BuildControls
                        ingredientAdded={this.addIngredientHandler}
                        ingredientRemoved={this.removeIngredientHandler}
                        disable={disableInfo}
                        purchable={this.state.purchable}
                        purchasing={this.pruchasingHandler}
                        price={this.state.totalPrice} />
                </>
            );
            orderSummary = <OrderSummary
                ingredients={this.state.ingredients}
                price={this.state.totalPrice}
                canclepurchase={this.canclePurchaseHandler}
                contnuepurchase={this.contnuePurchaseHandler}/>
        }

        if (this.state.loading) {
            orderSummary = <Spinner />
        }

        
        // console.log(this.state.loading)
        
        return (
            <>
            {this.state.navigateToCkeckOut ? <Navigate to="/checkout" state={{ingredients : this.state.ingredients, price : this.state.totalPrice}}/> : null}
                <Modal
                    show={this.state.purchasing}
                    closeModal={this.canclePurchaseHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);