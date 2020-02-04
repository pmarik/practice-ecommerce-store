import React from 'react';
import './cart-dropdown.styles.scss';

import CustomButton from '../custom-button/CustomButton.component';

const CartDropdown = () => (
    <div className="cart-dropdown">
        <div className="cart-items">
            <CustomButton>Go To Checkout</CustomButton>
        </div>
    </div>
)


export default CartDropdown;

