import React, { useState, useEffect } from 'react';
import { getDatabaseCart } from '../../utilities/databaseManager';
import fakeData from '../../fakeData';


const Review = () => {
    const [cart, setCartItems] = useState([]);
    useEffect( () => {
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        
        
        const cartProducts = productKeys.map( key => {
            const product = fakeData.find( pd => pd.key === key );
            product.quantity = savedCart[key];
            return product;
        } );
        
        setCartItems(cartProducts);
    }, [] );

    return (
        <div>
            <h2>Cart Item: {cart.length}</h2>
        </div>
    );
};

export default Review;