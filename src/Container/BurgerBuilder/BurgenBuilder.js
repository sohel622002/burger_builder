import React, { Component } from "react";

import Burger from "../../Components/Burger/Burger"
import BuildControls from "../../Components/Burger/Buildcontrols/BuildControls";
import Modal from "../../Components/UI/Modal/Modal"
import OrderSummary from "../../Components/Burger/OrderSummary/OrderSummary"
import Spinner from "../../Components/UI/Spinner/Spinner";
import axios from '../../axios.orders'

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

class BurgerBuilder extends Component {

    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        purchable: false,
        purchasing: false,
        loading: false
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

        this.setState({ loading : true });

        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customerDetail: {
                name: 'sohel shaikh',
                address: 'ismail nagar, anand',
                pincode: 380001,
                email: 'test@test.com'
            },
            deliveryMethod: 'fastest'
        }
        axios.post('/orders.json', order)
            .then(response => {
                this.setState({ loading: false, purchasing: false })
            })
            .catch(err => {
                this.setState({ loading: false, purchasing: false })
            });
    };


    render() {

        const disableInfo = {
            ...this.state.ingredients
        };
        for (let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0;
        }

        let orderSummary = <OrderSummary
            ingredients={this.state.ingredients}
            price={this.state.totalPrice}
            canclepurchase={this.canclePurchaseHandler}
            contnuepurchase={this.contnuePurchaseHandler} />

        if (this.state.loading) {
            orderSummary = <Spinner />
        }

        return (
            <>
                <Modal show={this.state.purchasing} canclePurchase={this.canclePurchaseHandler}>
                    {orderSummary}
                </Modal>
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
    }
}

export default BurgerBuilder;