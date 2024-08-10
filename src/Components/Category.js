import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import '../CSS/Query.css'
const Query = (props) => {
  // if (localStorage.getItem(`cart_${props.user.email}`) === null) {
  //   var cart = {}
  // }
  // else {
  //   cart = JSON.parse(localStorage.getItem(`cart_${props.user.email}`))
  // }
  // const addtocart = (id) => {
  //   const product = props.products.find(product => product._id === id);
  //   if (localStorage.getItem('token')) {
  //     if (product) {
  //       if (cart[id] !== undefined) {
  //         var qty = cart[id].qty + 1
  //         cart[id] = {
  //           qty: qty,
  //           product: product
  //         }
  //       }
  //       else {
  //         qty = 1
  //         cart[id] = {
  //           qty: qty,
  //           product: product
  //         }
  //       }
  //       localStorage.setItem(`cart_${props.user.email}`, JSON.stringify(cart))
  //     }
  //   }
  //   else {
  //     alert('Please login to add this product to cart')
  //   }
  // }

  // const plusbtn = (id) => {
  //   const product = props.products.find(product => product._id === id);
  //   if (localStorage.getItem('token')) {
  //     if (product) {
  //       var qty = cart[id].qty + 1
  //       cart[id] = {
  //         qty: qty,
  //         product: product
  //       }
  //       localStorage.setItem(`cart_${props.user.email}`, JSON.stringify(cart))
  //     }
  //   }
  //   else {
  //     alert('Please login to add this product to cart')
  //   }
  // }
  // const minusbtn = (id) => {
  //   const product = props.products.find(product => product._id === id);
  //   if (localStorage.getItem('token')) {
  //     if (product) {
  //       var qty = cart[id].qty - 1;
  //       if (qty === 0) {
  //         const updatedCart = { ...cart };
  //         delete updatedCart[id];
  //         localStorage.setItem(`cart_${props.user.email}`, JSON.stringify(updatedCart));
  //       } else {
  //         const updatedCart = {
  //           ...cart,
  //           [id]: {
  //             qty: qty,
  //             product: product
  //           }
  //         };
  //         localStorage.setItem(`cart_${props.user.email}`, JSON.stringify(updatedCart));
  //       }
  //     }
  //   }
  //   else {
  //     alert('Please login to add product to cart')
  //   }
  // };
  // const navigate = useNavigate()
  const [prod, setProd] = useState([]);
  const location = useLocation()
  const category  =location.pathname.split('/').pop()
  useEffect(()=>{
    const p=[]
    const cat = category.replace('%20',' ')
    console.log(cat)
    if(props.products){
      props.products.map(product=>{
        if(product.category===cat){
          p.push(product)
        }
        return 0
      })
    }
    console.log(p)
    setProd(p)
  },[category,props.products])

  return (
    <div className='querycont'>
      {prod.map((product, i) => (
        <div key={i} className="box">
          <Link to={`/product/${product._id}`} className="container">
            <img src={product.image && product.image[0] !== 'h' ? `/${product.image}` : product.image} alt="loading" />
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
  )
}

export default Query
