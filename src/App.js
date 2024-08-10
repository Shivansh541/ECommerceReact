import './App.css';
import Home from './Components/Home';
import Navbar from './Components/Navbar';

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom'
import Product from './Components/Product';
import { useEffect, useState } from 'react';
import Account from './Components/Account';
import Signup from './Components/Signup';
import Login from './Components/Login';
import Query from './Components/Query';
import Cart from './Components/Cart';
import Category from './Components/Category';
import Order from './Components/Order';
import PlaceOrder from './Components/PlaceOrder';
import MyOrders from './Components/MyOrders';
import Contact from './Components/Contact';
function App() {
  const host = 'http://localhost:5000'
  const [user, setUser] = useState({})
  const getUser = async () => {
    const response = await fetch(`${host}/api/auth/getuser`, {
      method: "POST",
      headers: {
        "auth-token": localStorage.getItem('token'),
      },
    });
    const user =await response.json();
    setUser(user)
  }
  useEffect(() => {
    if (localStorage.getItem('token')) {
      getUser()
    }
  })

  const [products, setProducts] = useState([])
  const [filteredProducts, setFilterProducts] = useState([])
  useEffect(() => {
    const getProd = async () => {
      const response = await fetch(`${host}/api/products/fetchallproducts`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const prod = await response.json()
      setProducts(prod)
    }
    getProd()
  }, [])
  const getFilteredProd = (filteredProducts) => {
    setFilterProducts(filteredProducts)
  }

  if (localStorage.getItem(`cart_${user.email}`) === null) {
    var cart = {}
  }
  else {
    cart = JSON.parse(localStorage.getItem(`cart_${user.email}`))
  }
  const [orderBox,setOrderBox] = useState({})
  const buyNow = (products) => {
    if(localStorage.getItem('token')){
      setOrderBox(products)
    }
    else{
      alert('Please login or create an account')
    }
  }
  
  return (
    <Router>
      <Navbar getFilteredProd={getFilteredProd} products={products} cart={cart} />
      <Routes>
        <Route exact path='/' element={<Home buyNow={buyNow} user={user} products={products} />} />
        <Route exact path='/product/:id' element={<Product buyNow={buyNow} products={products} user={user} />} />
        <Route exact path='/account' element={<Account getUser={getUser} user={user} />} />
        <Route exact path='/signup' element={<Signup />} />
        <Route exact path='/login' element={<Login />} />
        <Route exact path='/contact' element={<Contact />} />
        <Route exact path='/query' element={<Query buyNow={buyNow} products={filteredProducts} user={user} />} />
        <Route exact path='/cart' element={<Cart buyNow={buyNow} user={user} products={products} cart={cart} />} />
        <Route exact path='/category/:category' element={<Category buyNow={buyNow} products={products} user={user} />} />
        <Route exact path='/order' element = {<Order cart={cart} products = {orderBox} user={user}/>}/>
        <Route exact path='/placeorder' element = {<PlaceOrder cart={cart} products = {orderBox} user={user}/>}/>
        <Route exact path='/myOrders' element={<MyOrders user={user}/>}/>
      </Routes>
    </Router>
  );
}

export default App;
