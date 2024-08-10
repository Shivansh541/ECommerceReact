import React, { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../CSS/Login.css'
const Login = (props) => {
    const host = 'http://localhost:5000'
    const [credentials, setCredentials] = useState({ email: "", password: "" })
    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault()
        const response = await fetch(`${host}/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ 'email': credentials.email, 'password': credentials.password })
        });
        const json = await response.json()
        if (json.success) {
            console.log('successfully logged in')
            localStorage.setItem('token', json.authToken)
            navigate('/account')
        }
    }
    const onchange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    const showPassword = (e, inputField) => {
        const type = inputField.current.type;
        if (type === "password") {
          inputField.current.type = "text";
          e.target.classList.remove("fa-eye");
          e.target.classList.add("fa-eye-slash");
        } else {
          inputField.current.type = "password";
          e.target.classList.remove("fa-eye-slash");
          e.target.classList.add("fa-eye");
        }
      };
    
      const passref1 = useRef(null);
    return (
        <div className='login'>
            <h1>Login to ShopNest</h1>
            <form onSubmit={handleSubmit}>
                <input type="email" name='email' id="email" onChange={onchange} aria-describedby="emailHelp" placeholder='Enter Your Email Here' required minLength={5} />
                <div className="pass">
                    <input ref={passref1} onChange={onchange} autoComplete='on' type="password" id='password' name='password' placeholder='Enter Password' required minLength={8} />
                    <i onClick={(e) => showPassword(e, passref1)} className='fas fa-eye'></i>
                </div>
                <div className="buttons">
                    <button type="submit" className="btn" >Submit</button>
                    <Link to="/signup">Signup</Link>
                </div>
            </form>
        </div>
    )
}

export default Login
