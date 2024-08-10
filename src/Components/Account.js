import React, { useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../CSS/Account.css'
const Account = (props) => {
  // const boxref = useRef()
  const navigate = useNavigate()
  useEffect(() => {
    if (localStorage.getItem('token')) {
    }
    else {
      navigate('/login')
    }
  }, [navigate,props])
  return (
    <>
    
    <section className='account'>
      <h1>Personal Information</h1>
      <div className="info">
        <p>{props.user.name}</p>
        <h2>Mobile Number</h2>
        <p>{props.user.phone}</p>
        <h2>Email Address</h2>
        <p>{props.user.email}</p>
        <h2>Gender</h2>
        <p>{props.user.gender}</p>
      </div>
      <h1>Address</h1>
      <div className="addresses">
        <div className="address">
          <div className="name">
            <h3>{props.user.name}</h3>
            <h3>{props.user.phone}</h3>
          </div>
          <p>{props.user.address},{props.user.city},{props.user.state} - {props.user.zipcode}</p>
          {/* <div onMouseEnter={()=>{boxref.current.classList.add('show')}} onMouseLeave={() => boxref.current.classList.remove('show')} className="dots">
            <p></p>
            <p></p>
            <p></p>
          </div>
          <div onMouseEnter={()=>{boxref.current.classList.add('show')}} onMouseLeave={() => boxref.current.classList.remove('show')} ref={boxref}  className="box">
            <p onClick={editBtn}>Edit</p>
            <p onClick={deleteBtn}>Delete</p>
          </div> */}
        </div>
      </div>
      <div className="buttons">

        <Link to="/myOrders">My Orders</Link>
        <button onClick={() => {
          localStorage.removeItem('token');
          navigate('/login')
        }} className='btn'>Logout</button>
      </div>
    </section>
    </>
  )
}

export default Account
