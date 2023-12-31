import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { clearLocalShoppingCart, getDatabaseCart, removeFromDatabaseCart } from '../../utilities/databaseManager';
import fakeData from '../../fakeData';
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../Cart/Cart';
import happyImage from '../../images/giphy.gif';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';

const Review = () => {
    const [cart, setCart] = useState([]);
    const [orderPlaced, setOrderPlaced] = useState(false);
    const history = useHistory();
    const handleProceedCheckout = () => {
        history.push('/shipment');
    };

    const removeProduct = (productKey) => {
        const nreCart = cart.filter(pd => pd.key !== productKey);
        setCart(nreCart);
        removeFromDatabaseCart(productKey);
    }
    useEffect(() => {
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);

        const cartProducts = productKeys.map(key => {
            const product = fakeData.find(pd => pd.key === key);
            product.quantity = savedCart[key];
            return product;
        });
        setCart(cartProducts);
    }, []);
    let thankYou;
    if(orderPlaced) {
        thankYou = <img src={happyImage} alt="" />
    }
    return (
        <div className='twin-container'>
            <div className='product-container'>
                {
                    cart.map(pd => <ReviewItem removeProduct={removeProduct} key={pd.key} product={pd}></ReviewItem>)
                }
                {
                    thankYou
                }
            </div>
            <div className='cart-container'>
                <Cart cart={cart}><button onClick={handleProceedCheckout} className='main-button'>Proceed Checkout</button></Cart>
            </div>
        </div>
    );
};

export default Review;