import React, {Component} from 'react';
import Aux from '../../../hoc/Aux/aux';
import Button from '../../Ui/Button/Button';

class OrderSummary extends Component {
     
    render() {
        const ingredientSummary = Object.keys(this.props.ingredients).map( igKey => {
            return <li key={igKey}><span style={{textTransform : 'capitalize'}}>{igKey}</span>:{this.props.ingredients[igKey]}</li>
        });
        return ( 
            <Aux>
                <h1>Your Order</h1>
                <h3>A delicious burger with following ingredients:</h3>
                <ul>
                   {ingredientSummary}
                </ul>
                <p><strong>totalPrice : {this.props.price.toFixed(2)}</strong></p>
                <p>Continue to Checkout?</p> 
                <Button btnType="Danger" clicked={this.props.purchaseCancel}>CANCEL</Button>
                <Button btnType="Success" clicked={this.props.purchaseContinue}>CONTINUE</Button>
            </Aux>
         );
    }
}
 
export default OrderSummary;