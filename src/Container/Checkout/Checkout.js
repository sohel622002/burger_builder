import React, { useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

import CheckOutSummery from "../../Components/Order/CheckOutSummery/CheckOutSummery";
import Spinner from "../../Components/UI/Spinner/Spinner";
import './Checkout.css'

import axios from '../../axios.orders'

function Checkout() {

    const [ingredients, setIngredients] = useState();
    const [price, setPrice] = useState();
    const [cancleOrder, setCancelOrder] = useState(false);
    const [contnueOrder, setContnueOrder] = useState(false);
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [address, setAddress] = useState();


    const burgeringredients = useLocation();
    const navigae = useNavigate();

    useEffect(() => {
        setIngredients(burgeringredients.state.ingredients)
        setPrice(burgeringredients.state.price)
    }, [burgeringredients])


    const continueOrderHandler = () => {
        setContnueOrder(true)
    }

    const cancleOrderHandler = () => {
        setCancelOrder(true)
    }

    const purchaseHandler = () => {
        setLoading(true);

        const order = {
            ingredients: ingredients,
            price: price.toFixed(2),
            customerDetail: {
                name: name,
                address: address,
                pincode: 380001,
                email: email
            },
            deliveryMethod: 'fastest'
        }

        axios.post('/orders.json', order)
            .then(response => {
                setLoading(false)
            })
            .catch(err => {
                setLoading(false)
                alert(err.message)
            });
        
            navigae('/')
    }


    return (
        <>
            {loading ? <Spinner /> : <>
                {cancleOrder ? <Navigate to="/" /> : null}
                {ingredients ? (<CheckOutSummery
                    ingredients={ingredients}
                    continueOrder={continueOrderHandler}
                    cancleOrder={cancleOrderHandler} />) : 'Loading...'
                }
                {contnueOrder ?
                    <div className='contact_Form'>
                        <input type='text' placeholder='Enter You Name' onChange={(e) => setName(e.target.value)}/>
                        <input type='Email' placeholder='Enter You Email' onChange={(e) => setEmail(e.target.value)}/>
                        <input type='Address' placeholder='Enter You Address' onChange={(e) => setAddress(e.target.value)}/>
                        <h3>Total Price : {price.toFixed(2)}</h3>
                        <button className='form_btn' onClick={purchaseHandler}>CONTINUE</button>
                    </div> : null}
            </>
            }
        </>
    )
}

export default Checkout;