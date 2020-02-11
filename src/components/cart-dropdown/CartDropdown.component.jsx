import React from 'react';
import './cart-dropdown.styles.scss';
import { connect } from 'react-redux';

import CustomButton from '../custom-button/CustomButton.component';
import CartItem from '../cart-item/CartItem.component';
import { selectCartItems } from '../../redux/cart/cart.selectors'
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';
import { toggleCartHidden } from '../../redux/cart/cart.actions.js';

const CartDropdown = ({ cartItems, history, dispatch }) => (
    <div className="cart-dropdown">
        <div className="cart-items">
          {
            cartItems.length ?
            (cartItems.map(cartItem => <CartItem key={cartItem.id} item={cartItem} />))
            : (<span className="empty-message">Your cart is empty</span>)
          }
        </div>
        <CustomButton onClick={() => {
          history.push('/checkout');
          dispatch(toggleCartHidden());
        } } >Go To Checkout</CustomButton>
    </div>
)

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems
})


export default withRouter(connect(mapStateToProps)(CartDropdown));
