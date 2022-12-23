import React, { useEffect, useState } from 'react'

import Order from '../Order/Order'
import axios from '../../axios.orders'

export default function Orders() {

  const [orders, setOrders] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios.get('/orders.json')
      .then(res => {
        let fetchedorders = [];
        for (let key in res.data) {
          fetchedorders.push({
            id: key,
            order: res.data[key]
          })
        }
        setOrders(fetchedorders)
      }).catch(error => {
        console.log(error)
      })
  }, [])

  return (
    <div>
      {
        orders?.map(order => (
          <Order
            key={order.id} 
            salad={order.order.ingredients.salad}
            meat={order.order.ingredients.meat}
            bacon={order.order.ingredients.bacon}
            cheese={order.order.ingredients.cheese}
            price={order.order.price} />
        ))
      }
    </div>
  )
}
