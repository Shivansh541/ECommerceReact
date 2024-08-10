import React, { useEffect, useRef, useState } from 'react';
import '../CSS/Home.css';
import { Link, useNavigate } from 'react-router-dom';

const Home = (props) => {
    const navigate = useNavigate()
    const [productsByCategory, setProductsByCategory] = useState({});
    const containerRefs = useRef([]);
    const scrollLeft = (index) => {
        if (containerRefs.current[index].current) {
            containerRefs.current[index].current.scrollLeft -= 600; // Adjust as needed based on box width
        }
    };

    const scrollRight = (index) => {
        if (containerRefs.current[index].current) {
            containerRefs.current[index].current.scrollLeft += 600; // Adjust as needed based on box width
        }
    };
    useEffect(() => {
        const groupedProducts = props.products.reduce((acc, product) => {
            if (!acc[product.category]) {
                acc[product.category] = [];
            }
            acc[product.category].push(product);
            return acc;
        }, {});
        setProductsByCategory(groupedProducts);
        // Assign refs for each container
        containerRefs.current = Array(Object.keys(groupedProducts).length).fill().map(() => React.createRef());
        
    }, [props.products])
    // if (localStorage.getItem(`cart_${props.user.email}`) === null) {
    //     var cart = {}
    // }
    // else {
    //     cart = JSON.parse(localStorage.getItem(`cart_${props.user.email}`))
    // }
    // const addtocart = (id) => {
    //     const product = props.products.find(product => product._id === id);
    //     if (localStorage.getItem('token')) {
    //         if (product) {
    //             if (cart[id] !== undefined) {
    //                 var qty = cart[id].qty + 1
    //                 cart[id] = {
    //                     qty: qty,
    //                     product: product
    //                 }
    //             }
    //             else {
    //                 qty = 1
    //                 cart[id] = {
    //                     qty: qty,
    //                     product: product
    //                 }
    //             }
    //             localStorage.setItem(`cart_${props.user.email}`, JSON.stringify(cart))
    //         }
    //     }
    //     else {
    //         alert('Please login to add this product to cart')
    //     }
    // }

    // const plusbtn = (id) => {
    //     const product = props.products.find(product => product._id === id);
    //     if (localStorage.getItem('token')) {
    //         if (product) {
    //             var qty = cart[id].qty + 1
    //             cart[id] = {
    //                 qty: qty,
    //                 product: product
    //             }
    //             localStorage.setItem(`cart_${props.user.email}`, JSON.stringify(cart))
    //         }
    //     }
    //     else {
    //         alert('Please login to add this product to cart')
    //     }
    // }
    // const minusbtn = (id) => {
    //     const product = props.products.find(product => product._id === id);
    //     if (localStorage.getItem('token')) {
    //         if (product) {
    //             var qty = cart[id].qty - 1;
    //             if (qty === 0) {
    //                 const updatedCart = { ...cart };
    //                 delete updatedCart[id];
    //                 localStorage.setItem(`cart_${props.user.email}`, JSON.stringify(updatedCart));
    //             } else {
    //                 const updatedCart = {
    //                     ...cart,
    //                     [id]: {
    //                         qty: qty,
    //                         product: product
    //                     }
    //                 };
    //                 localStorage.setItem(`cart_${props.user.email}`, JSON.stringify(updatedCart));
    //             }
    //         }
    //     }
    //     else {
    //         alert('Please login to add product to cart')
    //     }
    // };
    return (
        <section className="home">
            {Object.entries(productsByCategory).map(([category, products], index) => (
                <div key={index} className="container">
                    <div className="flex">
                        <h1 className='cat'>{category}</h1>
                        <div className='viewbtn' onClick={()=>{navigate(`/category/${category}`)}}>Click to View All</div>
                    </div>
                    <img className='lbtn' onClick={() => scrollLeft(index)} src="Background/PngItem_16881.png" alt="" />
                    <div ref={containerRefs.current[index]} className="row">
                        {products.map((product, i) => (
                            <div className="box" key={i}>
                                <Link to={`/product/${product._id}`} >
                                    <img src={product.image} alt="loading" />
                                    <h1>{`${product.name}`.substring(0,40)}...</h1>
                                    <h3><span className='price'>M.R.P: ₹{product.price}</span>/{`₹${Math.floor(product.price - 0.3 * product.price) - 1}`} <span>30% off</span></h3>
                                </Link>
                                {/* <div className="buttons">
                                    {cart[product._id] ? <div className='qty'><button onClick={() =>
                                        minusbtn(product._id)} className='btn'>-</button><span>{cart[product._id].qty}</span><button onClick={() => { plusbtn(product._id) }} className='btn'>+</button></div> : <button onClick={() => { addtocart(product._id) }} className='btn'>Add to Cart</button>}
                                    <button onClick={()=>{props.buyNow({[product._id]:{product:product,qty:1}});navigate('/order')}} className='btn'>Buy Now</button>
                                </div> */}
                            </div>

                        ))}
                    </div>
                    <img className='rbtn' onClick={() => scrollRight(index)} src="Background/PngItem_16881.png" alt="" />
                </div>
            ))}
        </section>
    );
};

export default Home;
