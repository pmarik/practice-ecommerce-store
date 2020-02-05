import React from 'react';
import './cart-dropdown.styles.scss';
import { connect } from 'react-redux';

import CustomButton from '../custom-button/CustomButton.component';
import CartItem from '../cart-item/CartItem.component';
import { selectCartItems } from '../../redux/cart/cart.selectors'

const CartDropdown = ({ cartItems }) => (
    <div className="cart-dropdown">
        <div className="cart-items">
            {cartItems.map(cartItem => <CartItem key={cartItem.id} item={cartItem} />) }
        </div>
        <CustomButton>Go To Checkout</CustomButton>
    </div>
)

const mapStateToProps = (state) => ({
    cartItems: selectCartItems(state)
})


export default connect(mapStateToProps)(CartDropdown);

