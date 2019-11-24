import React from 'react';

import './Input.css';

const input = (props) => {
    let inputElement = null
    const inputClasses = ["InputElement"];

    if (props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push("Invalid");
    }

    switch (props.elementType) {
        case ('input'):
            inputElement = <input className="InputElement" {...props.elementType}  value={props.value} onChange={props.change}/>
            break;
        case ('textarea'):
            inputElement = <textarea className="InputElement" {...props.elementType}  value={props.value} onChange={props.change}/>
            break;
            case ('select'):
                    inputElement = (
                        <select className={inputClasses.join(' ')}  value={props.value} onChange={props.change}>
                                {props.elementConfig.option.map( option => {
                                    return(
                                        <option key={option.value} value={option.value}>
                                               {option.displayValue}
                                        </option>
                                    )
                                })}
                        </select>
                    )
                    break;    
        default:
            inputElement = <input className="InputElement" {...props.elementType}  value={props.value} onChange={props.change}/>
    }
    return (
        <div className="Input">
            <label className="Label">{props.label}</label>
            {inputElement}
        </div>
    );
}

export default input;