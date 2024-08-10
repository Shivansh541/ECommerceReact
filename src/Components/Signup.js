import React, { useEffect, useRef, useState } from 'react';
import '../CSS/Signup.css'
import { useNavigate } from 'react-router-dom';
const Signup = () => {
  const [cities, setCities] = useState({});
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const host = 'http://localhost:5000'
  const [credentials, setCredentials] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
    address: "",
    city: "",
    state: "",
    zipcode: ""
  })
  const navigate = useNavigate()
  const handleSubmit = async (e, res) => {
    e.preventDefault()

    const response = await fetch(`${host}/api/auth/createuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: credentials.name,
        phone: credentials.phone,
        email: credentials.email,
        password: credentials.password,
        confirmPassword: credentials.confirmPassword,
        gender: credentials.gender,
        address: credentials.address,
        city: credentials.city,
        state: credentials.state,
        zipcode: credentials.zipcode
      })
    });
    const json = await response.json()
    if (json.success) {
      navigate('/login')
      console.log(json)
    }
    else {
      console.log(json)
    }
  }
  const onchange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }
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
  const passref2 = useRef(null);
  return (
    <div onSubmit={handleSubmit} className='signup'>
      <h1>Create a New Account</h1>
      <form>
        <input onChange={onchange} type="text" id='name' name='name' placeholder='Enter Your Name' required minLength={3} />
        <input onChange={onchange} type="text" id='phone' name='phone' placeholder='Enter Your Phone Number' required minLength={10} maxLength={13} />
        <input onChange={onchange} type="email" id='email' name='email' placeholder='Enter Your Email' required />
        <div className="pass">
          <input ref={passref1} onChange={onchange} autoComplete='on' type="password" id='password' name='password' placeholder='Enter Password' required minLength={8} />
          <i onClick={(e) => showPassword(e, passref1)} className='fas fa-eye'></i>
        </div>
        <div className="pass">
          <input ref={passref2} onChange={onchange} autoComplete='on' type="password" id='confirmPassword' name='confirmPassword' placeholder='Enter Password Again' required minLength={8} />
          <i onClick={(e) => showPassword(e, passref2)} className='fas fa-eye'></i>
        </div>
        <div className='gender'>
          <label htmlFor="gender">Gender</label>
          <input onChange={onchange} type="radio" name="gender" value="Male" /> Male
          <input onChange={onchange} type="radio" name="gender" value="Female" /> Female
        </div>
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
        <button className='btn' type='submit'>Submit</button>
      </form>
    </div>
  );
};

export default Signup;
