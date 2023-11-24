import CartContext from '../../context/CartContext'

import './index.css'

const CartPrice = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      const totalItems = cartList.length
      const totalPriceArr = cartList.map(each => each.price * each.quantity)

      const getTotalPrice = arr => {
        let sum = 0
        arr.forEach(element => {
          sum += element
        })
        return sum
      }

      return (
        <div className="cart-price-bg">
          <div className="cart-price-container">
            <h1 className="order-total-h1">
              Order Total: {getTotalPrice(totalPriceArr)}{' '}
            </h1>
            <p className="order-total-p">{totalItems} Items in cart</p>
            <button type="button" className="buy-btn">
              Buy
            </button>
          </div>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default CartPrice
