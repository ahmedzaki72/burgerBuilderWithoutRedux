import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../Ui/Button/Button';
import './CheckoutSummary.css';

const checkoutSummary = (props) => {
    return ( 
        <div className="CheckoutSummary">
           <h1>We hope taste well !</h1>
           <div style={{width : "400px", height : "300px", margin : "auto" }}>
              <Burger ingredients={props.ingredient}/>
           </div>
           <Button btnType="Danger" clicked={props.checkoutCancel}>CANCEL</Button>
           <Button btnType="Success" clicked={props.checkoutContinue}>CONTINUE</Button>
        </div>
     );
}
 
export default checkoutSummary;