import CartContext from '../../context/CartContext'

import './index.css'

const ClearAllCartItem = () => (
  <CartContext.Consumer>
    {value => {
      const {removeAllItem} = value

      const clearCartList = () => {
        removeAllItem()
      }

      return (
        <div className="remove-All-bg">
          <h1 className="cart-heading">My Cart</h1>
          <button type="button" className="remove-btn" onClick={clearCartList}>
            Remove All
          </button>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default ClearAllCartItem
