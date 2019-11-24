import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-order';

class Orders extends Component {
    state = { 
        orders : [],
        loading : true
     }
 
     componentDidMount () {
        axios.get('order.json').then( res => {
            const fetchOrder = []
            for(let key in res.data) {
                fetchOrder.push({
                   ...res.data[key],
                   id : key
                })
            }
            this.setState({loading : false, orders : fetchOrder})
        }).catch( error => {
            this.setState({loading : false})
        })
     }
    render() { 
        
        return ( 
            <div> 
                {this.state.orders.map( order => {
                  return  <Order
                   key={order.id}
                   ingredients={order.ingredients}
                   price={order.price}
                  />
                })}
            </div>
        );
    }
}
 
export default Orders;