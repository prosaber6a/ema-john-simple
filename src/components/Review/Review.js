import React, { useState, useEffect } from 'react';
import { getDatabaseCart, removeFromDatabaseCart } from '../../utilities/databaseManager';
import fakeData from '../../fakeData';
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../Cart/Cart';


const Review = () => {
    const [cart, setCartItems] = useState([]);

    const removeProductItem = (productKey) => {
        console.log('remvoe clicked', productKey);
        const newCart = cart.filter( pd => pd.key !== productKey );
        setCartItems( newCart );
        removeFromDatabaseCart(productKey);
    }

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
        <div className="twin-container">

            <div className="product-container">
                {cart.map( pd => <ReviewItem key={pd.key} removeProduct={removeProductItem} product={pd}></ReviewItem> )}
            </div>
            <div className="cart-container">
                <Cart cart={cart}></Cart>
            </div>
        </div>
    );
};

export default Review;