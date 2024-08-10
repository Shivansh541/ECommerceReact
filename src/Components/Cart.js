import React from 'react';
import '../CSS/Cart.css'
import { Link, useNavigate } from 'react-router-dom';
const Cart = (props) => {
  const navigate = useNavigate()
  const plusbtn = (id) => {
    const product = props.products.find(product => product._id === id);
    if (product) {
      var qty = props.cart[id].qty + 1
      props.cart[id] = {
        qty: qty,
        product: product
      }
      localStorage.setItem(`cart_${props.user.email}`, JSON.stringify(props.cart))
    }
  }
  const minusbtn = (id) => {
    const product = props.products.find(product => product._id === id);
    if (product) {
      var qty = props.cart[id].qty - 1;
      if (qty === 0) {
        const updatedCart = { ...props.cart };
        delete updatedCart[id];
        localStorage.setItem(`cart_${props.user.email}`, JSON.stringify(updatedCart));
      } else {
        const updatedCart = {
          ...props.cart,
          [id]: {
            qty: qty,
            product: product
          }
        };
        localStorage.setItem(`cart_${props.user.email}`, JSON.stringify(updatedCart));
      }
    }
  };
  var totalPrice = 0, totalDisPrice = 0;
  Object.keys(props.cart).map((productId) => {
    const product = props.cart[productId].product
    totalPrice += product.price * props.cart[productId].qty
    totalDisPrice += (Math.floor(product.price - 0.3 * product.price) - 1) * props.cart[productId].qty
    return 0
  })
  var qty = 0
  return (
    <section className="cart">
      <h1>My Cart</h1>
      {Object.keys(props.cart).length===0?<div><h1>Your cart is Empty</h1>Go Back to <Link to='/'>Home</Link></div>:Object.keys(props.cart).map((productId) => {
        const product = props.cart[productId].product;
        return (
          <div className="box" key={productId}>
            <img onClick={() => { navigate(`/product/${product._id}`) }} src={product.image} alt="loading" />
            <div className="col">
              <Link to={`/product/${product._id}`}>
                <h1>{`${product.name}`}</h1>
                <h3><span className='price'>M.R.P: ₹{product.price}</span>/{`₹${Math.floor(product.price - 0.3 * product.price) - 1}`} <span>30% off</span></h3>
              </Link>
              <div className="buttons">
                <div className='qty'><button onClick={() =>
                  minusbtn(product._id)} className='btn'>-</button><span>{props.cart[product._id].qty}</span><button onClick={() => { plusbtn(product._id) }} className='btn'>+</button></div>
                <button onClick={() => { props.buyNow({ [product._id]: { product: product, qty: 1 } }); navigate('/order') }} className='btn'>Buy Now</button>
              </div>
            </div>
          </div>
        );
      })}
      <div className="bill">
        <h1>My Cart Details</h1>
        {Object.keys(props.cart).map((productId) => {
          const product = props.cart[productId].product;
          qty++
          return (<p key={productId} className='prods'>{qty}. {product.name}  - {`₹${Math.floor(product.price - 0.3 * product.price) - 1}`} &#x2715; {`${props.cart[product._id].qty}`} = {`₹${(Math.floor(product.price - 0.3 * product.price) - 1) * (props.cart[product._id].qty)}`}  </p>
          )
        })}
        <div className="flex">

          <h4>Price ({qty} items): {`₹${totalPrice}`}</h4>
          <h4>Discount: {`-₹${totalPrice - totalDisPrice}`}</h4>
          <h4>Delivery Charges - <span>₹40</span>/<span>Free</span></h4>
        </div>
        <div className="row">

          <h3>Total Amount: {`₹${totalDisPrice}`}</h3>
          <button onClick={() => { props.buyNow(props.cart); navigate('/placeorder') }} className="placeOrder">Place Order</button>
        </div>
      </div>
    </section>
  );
};

export default Cart;
