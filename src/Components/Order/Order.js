import React from 'react'

import './Order.css'

export default function Order(props) {
  return (
    <div className='Order'>
        <h3>Ingredients : <br/>Salad {props.salad}, Meat {props.meat}, Bacon : {props.bacon}, Cheese : {props.cheese}</h3>
        <h4>Total Price : <strong>USD {props.price}</strong></h4>
    </div>
  )
}
