import React from 'react'

const CartContext = React.createContext({
  cartList: [],
  addCartItem: () => {},
  deleteCartItem: () => {},
  removeAllItem: () => {},
  incrementProductQuantity: () => {},
  decrementProductQuantity: () => {},
})

export default CartContext
