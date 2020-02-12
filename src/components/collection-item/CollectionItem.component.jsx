import React from 'react';
import CustomButton from '../custom-button//CustomButton.component';
import { connect } from 'react-redux';
import { addItem } from '../../redux/cart/cart.actions';

import './collection-item.styles.scss';
import styled from 'styled-components';

const Price = styled.span`
    width: 10%;
`;

const CollectionItem = ({ item, addItem }) => {
    
    const { name, price, imageUrl } = item;

    return (
    <div className="collection-item">
        <div
            className="image"
            style={{
                backgroundImage: `url(${imageUrl})`
            }}
        />
        <div className="collection-footer">
            <span className='name'>{name}</span>
            {/* <span className='price'>{price}</span> */}
            <Price>{price}</Price>
        </div>
        <CustomButton onClick={() => addItem(item)} inverted>Add to Cart</CustomButton>
    </div>
)};

const mapDispatchToProps = dispatch => ({
    addItem: item => dispatch(addItem(item))
})

export default connect(null, mapDispatchToProps)(CollectionItem);