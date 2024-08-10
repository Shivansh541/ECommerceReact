import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const Navbar = (props) => {
    const navigate = useNavigate()
    const location = useLocation()
    const handleClick = (left) => {
        document.querySelector(':root').style.setProperty('--left', `${left}%`)
    }
    const [query, setQuery] = useState("")
    const search = () => {
        // Filter products based on the query
        const filteredProducts = props.products.filter(product => {
            // Convert query and product properties to lowercase for case-insensitive search
            const queryLowerCase = query.toLowerCase();
            const nameLowerCase = product.name.toLowerCase();
            const descriptionLowerCase = product.description.toLowerCase();
            const categoryLowerCase = product.category.toLowerCase();

            // Check if the product name, description, or category contains the query
            return (
                nameLowerCase.includes(queryLowerCase) ||
                descriptionLowerCase.includes(queryLowerCase) ||
                categoryLowerCase.includes(queryLowerCase)
            );
        });
        navigate('/query')
        props.getFilteredProd(filteredProducts)
    };

    const onchange = (e) => {
        setQuery(e.target.value)
        search()

    }
    if(window.outerWidth<431){
        switch (location.pathname) {
            case "/": handleClick(7)
                break
            case '/contact': handleClick(29)
                break
            case '/cart': handleClick(52)
                break
            case '/account': handleClick(75.5)
                break
            case '/login': handleClick(75.5)
                break
            case '/signup': handleClick(75.5)
                break
            case '/myOrders': handleClick(75.5)
                break
            default: handleClick(7)
        }
    }
    else{
        switch (location.pathname) {
            case "/": handleClick(16);document.title = 'ShopNest'
                break
            case '/contact': handleClick(37.5);document.title = 'ShopNest - Contact'
                break
            case '/cart': handleClick(59.5);document.title = 'ShopNest - Cart'
                break
            case '/account': handleClick(82.5); document.title = 'ShopNest - Account'
                break
            case '/login': handleClick(82.5); document.title = 'ShopNest - Login'
                break
            case '/signup': handleClick(82.5); document.title = 'ShopNest - Signup'
                break
            case '/myOrders': handleClick(82.5);document.title = 'ShopNest - My Orders'
                break
            default: handleClick(16)
        }
    }
    const [totalItems,setTotalItems] = useState(null)
    useEffect(()=>{
        const getTotalItems = () => {
            let qty = 0
            Object.keys(props.cart).map(productId => {
                qty ++;
                return 0
            })
            setTotalItems(qty)        }
        getTotalItems()
    })
    return (
        <>
            <nav className='navbar'>
                <h1 >ShopNest</h1>
                <ul className="leftnav">
                    <li className="list "><Link className={location.pathname === '/' ? "active" : ""} to="/">Home</Link></li>
                    <li className="list "><Link className={location.pathname === '/contact' ? "active" : ""} to="/contact">Contact</Link></li>
                    <li className="list "><Link className={location.pathname === '/cart' ? "active" : ""} to="/cart">Cart({`${totalItems}`})</Link></li>
                    <li className="list "><Link className={location.pathname === '/account' ? "active" : ""} to="/account">Account</Link></li>
                </ul>
                <div className="rightnav ">
                    <input onChange={onchange} type="text" id='search' name='search' placeholder='Search' />
                    <button onClick={search} className='btn'>Search</button>
                </div>
            </nav>

        </>

    )
}

export default Navbar
