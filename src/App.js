import {Component} from 'react'
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  addCartItem = product => {
    const {id} = product
    const {cartList} = this.state
    const duplicateItem = cartList.filter(each => each.id === id)
    return duplicateItem.length === 0
      ? this.setState(prevState => ({
          cartList: [...prevState.cartList, product],
        }))
      : null
  }

  deleteCartItem = id => {
    this.setState(prevState => ({
      cartList: prevState.cartList.filter(each => each.id !== id),
    }))
  }

  removeAllItem = () => {
    this.setState({cartList: []})
  }

  incrementProductQuantity = id => {
    this.setState(prevState => ({
      cartList: prevState.cartList.map(each => {
        const {quantity} = each
        if (id === each.id) {
          return {...each, quantity: quantity + 1}
        }
        return each
      }),
    }))
  }

  decrementProductQuantity = id => {
    this.setState(prevState => ({
      cartList: prevState.cartList.map(each => {
        const {quantity} = each
        if (id === each.id) {
          return {...each, quantity: quantity > 1 ? quantity - 1 : quantity}
        }
        return each
      }),
    }))
  }

  render() {
    const {cartList} = this.state

    return (
      <BrowserRouter>
        <CartContext.Provider
          value={{
            cartList,
            addCartItem: this.addCartItem,
            deleteCartItem: this.deleteCartItem,
            removeAllItem: this.removeAllItem,
            incrementProductQuantity: this.incrementProductQuantity,
            decrementProductQuantity: this.decrementProductQuantity,
          }}
        >
          <Switch>
            <Route exact path="/login" component={LoginForm} />
            <ProtectedRoute exact path="/" component={Home} />
            <ProtectedRoute exact path="/products" component={Products} />
            <ProtectedRoute
              exact
              path="/products/:id"
              component={ProductItemDetails}
            />
            <ProtectedRoute exact path="/cart" component={Cart} />
            <Route path="/not-found" component={NotFound} />
            <Redirect to="not-found" />
          </Switch>
        </CartContext.Provider>
      </BrowserRouter>
    )
  }
}

export default App
