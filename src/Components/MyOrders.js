import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
const MyOrders = (props) => {
  const [orders, setOrders] = useState([])
  useEffect(() => {
    const or = []
    const on = () => {
      if (props.user && props.user.Orders) {
        props.user.Orders.map(order => (
          Object.keys(order).map(product => {
            const prod = order[product];
            or.push(prod)
            return (
              setOrders(or)
            )
          })
        ))
      }
    }
    on()
  }, [props.user])
  const navigate = useNavigate()
  return (
    <section className="cart">
      <h1>My Orders</h1>
      {orders.map((prod,i) => {
        const product = prod.product;
        return (
          <div className="box" key={i}>
            <img onClick={() => { navigate(`/product/${product._id}`) }} src={product.image} alt="loading" />
            <div className="col">
              <Link to={`/product/${product._id}`}>
                <h1>{`${product.name}`}</h1>
                <h3><span className='price'>M.R.P: ₹{product.price}</span>/{`₹${Math.floor(product.price - 0.3 * product.price) - 1}`} <span>30% off</span></h3>
              </Link>
            </div>
          </div>
        );
      })}

    </section>
  )
}
export default MyOrders
