import React from 'react';
import './BuildControls.css';
import BuiltControl from './BuildControl/BuildControl';

const controls = [
    {label : 'Salad', type : 'Salad'},
    {label : 'Bacon', type : 'Bacon'},
    {label : 'Cheese', type : 'Cheese'},
    {label : 'Meat', type : 'Meat'},
]


const builtControls = (props) => {
    return ( 
        <div className="BuildControls">
        <p>currentPrice : <strong>{props.price.toFixed(2)}</strong></p>
          {controls.map(ctl => {
              return <BuiltControl
               key={ctl.label}
                label={ctl.label}
                added={()=> props.ingredientAdded(ctl.type)}
                removed={()=> props.ingredientRemove(ctl.type)}
                disabled={props.disabled[ctl.type]}
                 />
          })}
          <button 
           className="OrderButton"
           disabled={!props.purchasable} 
           onClick={props.ordered}
          >ORDER NOW</button>
        </div>
     );
}
 
export default builtControls;