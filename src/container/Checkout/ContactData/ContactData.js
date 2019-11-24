import React, { Component } from 'react';
import Button from '../../../components/Ui/Button/Button';
import './ContactData.css';
import axios from '../../../axios-order';
import Spinner from '../../../components/Ui/Spinner/Spinner';
import Input from '../../../components/Ui/Input/Input';

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true,
                    isName: true
                },
                valid: false,
                touched : false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true,
                    isStreet: true
                },
                valid: false,
                touched : false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                value: '',
                validation: {
                    required: true,
                    isZipCode: true
                },
                valid: false,
                touched : false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true,
                    isCountry: true
                },
                valid: false,
                touched : false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-Mail'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched : false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'fastest', displayValue: 'Fastest' },
                        { value: 'cheapest', displayValue: 'Cheapest' }
                    ]
                },
                value: '',
                validation : {},
                valid: true,
            },
        },
        formIsValid: false,
        loading: false
    }

    checkValidity ( value, rules) {
        let isValid = true;
        if (rules.required) {
            isValid = value.trim() !== '' && isValid
        }
        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }
        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }
        return isValid
    }

    orderHandler = (event) => {
        event.preventDefault();
        // // alert("your continue !")
        this.setState({ loading: true })
        const formData = {}
        for(let formElementIdentifier in this.state.orderForm){
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier]
        }
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderData : formData
        }
        axios.post('order.json', order).then(Response => {
            this.setState({ loading: false });
            this.props.history.push('/');
        }).catch(err => {
            this.setState({ loading: false })
        })
    }

    inputHandleChange = (event, inputIdentifier) => {
        event.preventDefault();
       const updateOrderForm = {
           ...this.state.orderForm
       }
       const updateElementForm = {
           ...updateOrderForm[inputIdentifier]
       }
       updateElementForm.value = event.target.value;
       updateElementForm.valid = this.checkValidity(updateElementForm.value, updateElementForm.validation);
       updateElementForm.touched = true;
       updateOrderForm[inputIdentifier] = updateElementForm
       let formIsValid = true;
       for (let inputIdentifier in updateOrderForm) {
           formIsValid = updateOrderForm[inputIdentifier].valid && formIsValid;
       }
       this.setState({orderForm : updateOrderForm, formIsValid: formIsValid})
    }
    render() {
        const formElementArray = [];
        for (let key in this.state.orderForm) {
            formElementArray.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }
        let form = (
            <form onSubmit={this.orderHandler}>
                {formElementArray.map(formElement => {
                    return (
                        <Input
                            key={formElement.id}
                            elementType={formElement.config.elementType}
                            elementConfig={formElement.config.elementConfig}
                            value={formElement.config.value}
                            invalid={!formElement.config.valid}
                            shouldValidate={formElement.config.validation}
                            touched={formElement.config.touched}
                            change={(event)=> this.inputHandleChange(event,formElement.id)}
                        />
                    )
                })}
                <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
            </form>
        )
        if (this.state.loading) {
            return form = <Spinner />
        }
        return (
            <div className='ContactData'>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        );
    }
}

export default ContactData;