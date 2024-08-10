import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../CSS/Product.css'

const Product = (props) => {
    const location = useLocation();
    const id = location.pathname.split('/').pop();
    const [prod, setProd] = useState({});

    useEffect(() => {
        const product = props.products.find(product => product._id === id);
        if (product) {
            setProd(product);
        }
    }, [id, props.products]);
    if (localStorage.getItem(`cart_${props.user.email}`) === null) {
        var cart = {}
    }
    else {
        cart = JSON.parse(localStorage.getItem(`cart_${props.user.email}`))
    }
    const addtocart = (id) => {
        const product = props.products.find(product => product._id === id);
        if (localStorage.getItem('token')) {
            if (product) {
                if (cart[id] !== undefined) {
                    var qty = cart[id].qty + 1
                    cart[id] = {
                        qty: qty,
                        product: product
                    }
                }
                else {
                    qty = 1
                    cart[id] = {
                        qty: qty,
                        product: product
                    }
                }
                localStorage.setItem(`cart_${props.user.email}`, JSON.stringify(cart))
            }
        }
        else {
            alert('Please login to add this product to cart')
        }
    }

    const plusbtn = (id) => {
        const product = props.products.find(product => product._id === id);
        if (localStorage.getItem('token')) {
            if (product) {
                var qty = cart[id].qty + 1
                cart[id] = {
                    qty: qty,
                    product: product
                }
                localStorage.setItem(`cart_${props.user.email}`, JSON.stringify(cart))
            }
        }
        else {
            alert('Please login to add this product to cart')
        }
    }
    const minusbtn = (id) => {
        const product = props.products.find(product => product._id === id);
        if (localStorage.getItem('token')) {
            if (product) {
                var qty = cart[id].qty - 1;
                if (qty === 0) {
                    const updatedCart = { ...cart };
                    delete updatedCart[id];
                    localStorage.setItem(`cart_${props.user.email}`, JSON.stringify(updatedCart));
                } else {
                    const updatedCart = {
                        ...cart,
                        [id]: {
                            qty: qty,
                            product: product
                        }
                    };
                    localStorage.setItem(`cart_${props.user.email}`, JSON.stringify(updatedCart));
                }
            }
        }
        else {
            alert('Please login to add product to cart')
        }
    };
    const navigate = useNavigate()
    return (
        <section className="prodView">
            <img src={prod.image && prod.image[0] !== 'h' ? `/${prod.image}` : prod.image} alt="loading" />
            <div>
                <h1>{prod.name}</h1>
                <h3><span className='price'>M.R.P: ₹{prod.price}</span>/{`₹${Math.floor(prod.price - 0.3 * prod.price) - 1}`} <span>30% off</span></h3>
                <div className="buttons">
                    {cart[prod._id] ? <div className='qty'><button onClick={() =>
                        minusbtn(prod._id)} className='btn'>-</button><span>{cart[prod._id].qty}</span><button onClick={() => { plusbtn(prod._id) }} className='btn'>+</button></div> : <button onClick={() => { addtocart(prod._id) }} className='btn'>Add to Cart</button>}
                    <button onClick={()=>{props.buyNow({[prod._id]:{product:prod,qty:1}});navigate('/order')}} className='btn'>Buy Now</button>
                </div>
                <h2>More about the product:</h2>
                <p>{prod.description}</p>
            </div>

        </section>
    );
};

export default Product;
