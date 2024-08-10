import React, {useState} from 'react'
import '../CSS/Contact.css'
import { Link } from 'react-router-dom'
const Contact = () => {
    const [credentials, setCredentials] = useState({name: "",email: "", phone: "",msg:""})
    const handleSubmit = async (e)=>{
        e.preventDefault()
        const response = await fetch(`http://localhost:5000/api/contact/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({'name':credentials.name,'email': credentials.email,'phone':credentials.phone,msg:credentials.msg})
        });
        alert('Form Submitted')
        const json = await response.json()
        console.log(json)
    }
    const onchange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    return (
        <section className='contact' id="contact">
            <h1>Contact Me</h1>
            <form onSubmit={handleSubmit} action="">
                <input required min={3} type="text" id='name' name='name' onChange={onchange} placeholder='Enter Your Name' />
                <input required type="email" id='email' name='email' onChange={onchange} placeholder='Enter Your Email' />
                <input required min={10} type="tel" id='phone' name='phone' onChange={onchange} placeholder='Enter Your Phone Number' />
                <textarea required min={3} name="msg" id="msg" cols="30" rows="10" onChange={onchange} placeholder='Enter Your Message Here'></textarea>
                <button className='btn' type="submit">Submit</button>
            </form>
            <div className="links">
                <Link target='_blank' to="https://www.facebook.com/profile.php?id=100015161857215"><img src="/logos/facebook.png" alt="loading" /></Link>
                <Link target='_blank' to="https://www.instagram.com/thiz_is_shivansh/"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Instagram_logo_2022.svg/2048px-Instagram_logo_2022.svg.png" alt="" /></Link>
                <Link target='_blank' to="http://wa.me/+918528841011"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/512px-WhatsApp.svg.png?20220228223904" alt="" /></Link>
            </div>
        </section>
    )
}

export default Contact
