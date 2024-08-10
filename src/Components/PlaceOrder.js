import React, { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import '../CSS/Order.css'
const Order = (props) => {
    const host = 'http://localhost:5000'
    const [cities, setCities] = useState({});
    const [selectedState, setSelectedState] = useState('');
    const [selectedCity, setSelectedCity] = useState('');
    const newAdd = useRef(null)
    const billref = useRef(null)
    const orderConfirmed = useRef(null)
    useEffect(() => {
        const fetchCitiesInIndia = async () => {
            try {
                const response = await fetch('cities.json');
                const data = await response.json();
                setCities(data);
            } catch (error) {
                console.error('Error fetching cities:', error);
            }
        };

        fetchCitiesInIndia();
    }, []);

    const handleStateChange = (event) => {
        setSelectedState(event.target.value);
        // Reset selected city when state changes
        setSelectedCity('');
        onchange(event)
    };

    const handleCityChange = (event) => {
        setSelectedCity(event.target.value);
        onchange(event)
    };
    const address = useRef(null)
    const [credentials, setCredentials] = useState({
        name: props.user.name,
        phone: props.user.phone,
        address: props.user.address,
        city: props.user.city,
        state: props.user.state,
        zipcode: props.user.zipcode
    })
    const handleSubmit = async () => {
        console.log(credentials)
        const response = await fetch(`${host}/api/order/placeOrder`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                product: props.products,
                user: props.user,
                address: {
                    name: credentials.name,
                    phone: credentials.phone,
                    address: credentials.address,
                    city: credentials.city,
                    state: credentials.state,
                    zipcode: credentials.zipcode
                }
            })
        });
        const json = await response.json()
        const response2 = await fetch(`${host}/api/auth/addOrders/${props.user._id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token'),
            },
            body: JSON.stringify({
                product: props.products,
            })
        });
        const json2 = await response2.json()
        console.log(json2)
        localStorage.removeItem(`cart_${props.user.email}`)
        orderConfirmed.current.classList.add('show')
        newAdd.current.style.display = 'none'
        address.current.style.display = 'none'
        billref.current.style.display = 'none'
        console.log(json)
    }
    const onchange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    var totalPrice = 0, totalDisPrice = 0;
    Object.keys(props.products).map((productId) => {
        const product = props.products[productId].product
        totalPrice += product.price * props.products[productId].qty
        totalDisPrice += (Math.floor(product.price - 0.3 * product.price) - 1) * props.products[productId].qty
        return 0
    })
    var qty = 0
    return (
        <section className="orderBox">
            <div ref={address} onClick={() => { address.current.classList.add('show') }} className='address show'>
                <h1>Address</h1>
                <p><b>Name: </b>{props.user.name}</p>
                <p><b>Mobile Number: </b>{props.user.phone}</p>
                <p><b>Address: </b>{props.user.address}</p>
                <p><b>City: </b>{props.user.city}</p>
                <p><b>State: </b>{props.user.state}</p>
                <p><b>Zipcode: </b>{props.user.zipcode}</p>

                <p>Do You want to Place Order on this Address?</p>
                <input onClick={handleSubmit} type="radio" name='placeOrder' />YES
                <input onClick={() => { newAdd.current.classList.add('show'); address.current.style.display = 'none' }} type="radio" name='placeOrder' />NO
            </div>
            <div ref={newAdd} className='signup newAddress'>
                <h1>Enter New Address</h1>
                <form>
                    <input onChange={onchange} type="text" id='name' name='name' placeholder='Enter Your Name' required minLength={3} />
                    <input onChange={onchange} type="text" id='phone' name='phone' placeholder='Enter Your Phone Number' required minLength={10} maxLength={13} />
                    <input onChange={onchange} type="text" id='address' name='address' placeholder='Enter Your Address' required />
                    <select required id='state' name='state' value={selectedState} onChange={handleStateChange}>
                        <option value="">Select State</option>
                        {Object.keys(cities).sort().map((state, index) => (
                            <option key={index} value={state}>{state}</option>
                        ))}
                    </select>
                    <select required id='city' name='city' value={selectedCity} onChange={handleCityChange} disabled={!selectedState}>
                        <option value="">Select City</option>
                        {selectedState && cities[selectedState].sort().map((city, cityIndex) => (
                            <option key={cityIndex} value={city}>{city}</option>
                        ))}
                    </select>
                    <input required onChange={onchange} type="text" name='zipcode' id='zipcode' placeholder='Enter Your Zipcode' />
                    <button className='btn' type='button' onClick={handleSubmit}>Submit</button>
                </form>
            </div>
            <div ref={orderConfirmed} className="success">
                <i className="fa-solid fa-circle-check"></i>
                <h1>Order Confirmed</h1>
                <p>Your order has been successfully placed!</p>
                <p>Go to your <Link to="/account">Account</Link> to track your order.</p>
            </div>
            <div ref={billref} className="bill">
                <h1>Order Price Details</h1>
                {Object.keys(props.products).map((productId) => {
                    const product = props.products[productId].product;
                    qty++
                    return (<p key={productId} className='prods'>{qty}. {product.name}  - {`₹${Math.floor(product.price - 0.3 * product.price) - 1}`} &#x2715; {`${props.products[product._id].qty}`} = {`₹${(Math.floor(product.price - 0.3 * product.price) - 1) * (props.products[product._id].qty)}`}  </p>
                    )
                })}
                <div className="flex">

                    <h4>Price: {`₹${totalPrice}`}</h4>
                    <h4>Discount: {`-₹${totalPrice - totalDisPrice}`}</h4>
                    <h4>Delivery Charges - <span>₹40</span>/<span>Free</span></h4>
                </div>
                <div className="row">
                    <h3>Discounted Price: {`₹${totalDisPrice}`}</h3>
                </div>
            </div>
        </section>
    )
}

export default Order

