import React, { Component } from 'react';
import Aux from '../../hoc/Aux/aux';
import Burger from '../../components/Burger/Burger';
import BuiltControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/Ui/modal/Model';
import OrderSummary from '../../components/Burger/OrderSummary/orderSummary';
import axios from '../../axios-order';
import Spinner from '../../components/Ui/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';


const INGREDIENT_PRICES = {
    Salad: 0.5,
    Cheese: 0.4,
    Meat: 1.3,
    Bacon: 0.7
}

class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error:false
    }

    componentDidMount () {
        axios.get('https://react-my-burger-7ed85.firebaseio.com/ingredients.json').then(response => {
            this.setState({ ingredients: response.data })
        }).catch( error => {
            this.setState({ error : true})
        })
    }

    updatePurchasableState(ingredients) {
        const sum = Object.keys(ingredients).map(igKey => {
            return ingredients[igKey]
        }).reduce((sum, ele) => {
            return sum + ele;
        }, 0)
        this.setState({ purchasable: sum > 0 })
    }

    addIngredientHandler = type => {
        const oldCount = this.state.ingredients[type]
        const updateCount = oldCount + 1
        const updateIngredients = {
            ...this.state.ingredients
        }
        updateIngredients[type] = updateCount
        const priceAddition = INGREDIENT_PRICES[type]
        const oldPrice = this.state.totalPrice
        const newPrice = oldPrice + priceAddition
        this.setState({ totalPrice: newPrice, ingredients: updateIngredients })
        this.updatePurchasableState(updateIngredients)
    }

    removeIngredientHandler = type => {
        const oldCount = this.state.ingredients[type]
        if (oldCount <= 0) {
            return;
        }
        const updateCount = oldCount - 1
        const updateIngredients = {
            ...this.state.ingredients
        }
        updateIngredients[type] = updateCount
        const priceDeduction = INGREDIENT_PRICES[type]
        const oldPrice = this.state.totalPrice
        const newPrice = oldPrice - priceDeduction
        this.setState({ totalPrice: newPrice, ingredients: updateIngredients })
        this.updatePurchasableState(updateIngredients)
    }

    purchaseHandler = () => {
        this.setState({ purchasing: true })
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false })
    }

    purchaseContinueHandler = () => {
        const queryParams = [];
        for(let  i  in  this.state.ingredients){
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
        }
        queryParams.push('price' + this.state.totalPrice)
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname : '/checkout',
            search : '?' + queryString
        })
    }

    render() {
        const disableInfo = {
            ...this.state.ingredients
        }
        for (let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0
        }
        let orderSummary = null


        let burger = this.state.error ?  <p>Ingredient can't be loading! </p> : <Spinner />
        if (this.state.ingredients) {
            burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredients} />
                    <BuiltControls
                        ingredientAdded={this.addIngredientHandler}
                        ingredientRemove={this.removeIngredientHandler}
                        disabled={disableInfo}
                        price={this.state.totalPrice}
                        purchasable={this.state.purchasable}
                        ordered={this.purchaseHandler}
                    />
                </Aux>
            );
            orderSummary = <OrderSummary
                purchaseCancel={this.purchaseCancelHandler}
                price={this.state.totalPrice}
                purchaseContinue={this.purchaseContinueHandler}
                ingredients={this.state.ingredients}
            />;
            if (this.state.loading) {
                orderSummary = <Spinner />
            }
        }
        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);