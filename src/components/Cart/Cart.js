import React from 'react';


const Cart = (props) => {
    const cart = props.cart;

    let total = 0;
    for(let i = 0; i < cart.length; i++) {
        const product = cart[i];
        total = total + product.price + product.quantity;
    }
    let shipping = 0;
    if (total > 35) {
        shipping = 0;
    } else if (total > 15) {
        shipping = 4.99;
    } else if (total > 0 ) {
        shipping = 12.99;
    }
const tex = total / 10;
const result = (total + shipping + Number(tex)).toFixed(2);
const formatNumber = num => {
    const precision = num.toFixed(2);
    return Number(precision);
}
    return (
        <div>
            <h4>Order Summary</h4>
            <p>Items Order {cart.length}</p>
            <p>Product Price : {formatNumber(total)}</p>
            <p><small>Shipping Cost : {formatNumber(shipping)}</small></p>
            <p><small>Tex + VAT :{formatNumber(tex)}</small></p>
            <p>Total Price : {result}</p>
            <br />
            {
                props.children
            }
        </div>
    );
};

export default Cart;