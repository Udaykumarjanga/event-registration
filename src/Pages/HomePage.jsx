import React, { useState } from 'react'
import "../Css/HomePage.css"
import logo from "../Images/logo.png"
import landingVideo from "../Images/landing-bg-video.mp4"
import service1 from "../Images/event1.jpg"
import service2 from "../Images/event2.jpg"
import service3 from "../Images/event3.jpg"
import service4 from "../Images/event4.jpg"
import correct from "../Images/correct.gif"


export default function HomePage() {
    const [registrationScreen, setRegistrationScreen] = useState(false)
    const [registrationNumber, setRegistrationNumber] = useState(0)
    const [data, setData] = useState({ name: "", email: "", contact: "", event: "celebrity-event" })
    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    

    const paymentHandler = async (e) => {
        e.preventDefault()
        const paymentResponse = await fetch('https://backend-grq8.onrender.com/order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const order = await paymentResponse.json()
        console.log(order);

        var options = {
            "key": "rzp_test_x60STtj7ClWCoL",
            "amount": "49900",
            "currency": "INR",
            "name": "Event Registration",
            "description": "Entry Fee For Event!!",
            "image": logo,
            "order_id": order.id,
            "handler": function (response) {
                console.log(response.razorpay_payment_id);
                console.log(response.razorpay_order_id);
                console.log(response.razorpay_signature)
                if (response.razorpay_payment_id) {
                    const handleSubmit = async(e) => {
                            console.log(data);
                            try{
                                const response = await fetch("https://backend-grq8.onrender.com/user-registration" , {
                                    method:'POST',
                                    headers:{
                                        'Content-Type':'application/json'
                                    },
                                    body:JSON.stringify(data)
                                })
                                const json = await response.json()
                                if(json.success){
                                    setRegistrationNumber(json.data.registrationNumber)
                                    setRegistrationScreen(true)
                                    setData({name: "", email: "", contact: "", event: "celebrity-event"})
                                }
                                else{
                                    alert("Failed To Register")
                                }
                            }catch(err){
                                console.log(err);
                            }
                        }
                    handleSubmit()
                }
                else {
                    alert("Payment Failed");
                }
            },
            "prefill": {
                "name": data.name,
                "email": data.email,
                "contact": data.contact
            },
            "notes": {
                "address": ""
            },
            "theme": {
                "color": "#3399cc"
            }
        };
        var rzp1 = new window.Razorpay(options);
        rzp1.open();
        e.preventDefault();
    }

    const handleClosingOfRegistrationScreen = () => {
        setRegistrationScreen(false)
    }
    return (
        <div className='home-page'>
            <div className='navbar'>
                <a href='#' className="navbar-left">
                    <img src={logo} alt="" />
                </a>
                <div className="navbar-right">
                    <a href="#events" className='link-a'>Events</a>
                    <a href="#about" className='link-a'>About Us</a>
                    <a href="#registration" className='link-a btn-a'>Registration</a>
                </div>
            </div>
            <div className="landing-section">
                <video src={landingVideo} autoPlay muted loop></video>
                <h1>Enjoy The <span> Charged Event </span>with your bestfriends !!</h1>
                <p>Whether you're a party animal, a music enthusiast, or a gaming pro, we've got something special for you. Our event registration platform is designed to make it easy for you to discover, explore, and register for the hottest events on campus.</p>
                <hr />
                <h4>ALL THE EVENT AT JUST <span> @499</span></h4>
                <a href="#events" className="btn-a link-a">Explore More</a>
            </div>
            <div className="event-section" id='events'>
                <div className='service-card'>
                    <img src={service1} alt="" />
                    <h3>Celebrity Concert Event</h3>
                    <p>Get ready to witness an unforgettable night filled with music, lights, and superstar vibes! Our Celebrity Concert Event brings you the hottest acts from the music industry right to your campus. Imagine the excitement of seeing your favorite artists perform live, creating memories that will last a lifetime.</p>
                    <a href="#registration" className="btn-a link-a">Register Now</a>
                </div>
                <div className='service-card'>
                    <img src={service2} alt="" />
                    <h3>Singing Event</h3>
                    <p>Join us for an evening filled with melodious tunes, heartfelt performances, and plenty of opportunities to connect with fellow music lovers. From soulful ballads to upbeat pop hits, our Singing Event welcomes singers of all genres and styles to take the spotlight and share their unique voices with the world.</p>
                    <a href="#registration" className="btn-a link-a">Register Now</a>
                </div>
                <div className='service-card'>
                    <img src={service3} alt="" />
                    <h3>E-Sports Event</h3>
                    <p>Attention all gamers and e-sports enthusiasts! Get ready to level up your gaming experience with our thrilling E-Sports Event. Whether you're a hardcore gamer or just love to dabble in the virtual world, this event is your opportunity to compete, connect, and conquer alongside fellow gaming aficionados.</p>
                    <a href="#registration" className="btn-a link-a">Register Now</a>
                </div>
                <div className='service-card'>
                    <img src={service4} alt="" />
                    <h3>The Party Never Stops</h3>
                    <p>Get ready to dance the night away at our legendary Club Night event! Step into a world of pulsating beats, neon lights, and non-stop fun as we transform [Your College Name] into the hottest club destination on campus.</p>
                    <a href="#registration" className="btn-a link-a">Register Now</a>
                </div>
            </div>
            <div className="about-section" id='about'>
                <div className="about-section-left">
                    <h2>Encourage Your Presence By Stepping Into The Best Events !!</h2>
                    <h3>Don't Miss The Moment</h3>
                </div>
                <div className="about-section-right">
                    <p>Have questions, suggestions, or feedback? We want to hear from you! Reach out to us via email or direct message on social media, and our team will be happy to assist you. Your input helps us create events that cater to your interests and preferences, so don't hesitate to get in touch.</p>
                    <a href="https://wa.me/918742920558" className="btn-a link-a" target='_blank'>Connect With Us</a>
                </div>
            </div>
            <div className="registration-section" id='registration'>
                <h1>Register <span> Yourself</span></h1>
                <form className="registration-form" onSubmit={paymentHandler}>
                    <div className="input-box">
                        <p>Your Name</p>
                        <input type="text" name='name' value={data.name} className="input-field" required onChange={handleChange} />
                    </div>
                    <div className="input-box">
                        <p>Your Email</p>
                        <input type="email" name='email' value={data.email} className="input-field" required onChange={handleChange} />
                    </div>
                    <div className="input-box">
                        <p>Your Phone Number</p>
                        <input type="number" name='contact' value={data.contact} className="input-field" required onChange={handleChange} />
                    </div>
                    <div className="input-box">
                        <p>Select Event</p>
                        <select name="event" className='input-field' required onChange={handleChange} value={data.event}>
                            <option value="celebrity-event">Celebrity Concert Event</option>
                            <option value="singing-event">Singing Event</option>
                            <option value="e-sport-event">E-Sports Event</option>
                            <option value="party-never-stops">The Party Never Stops</option>
                        </select>
                    </div>
                    <input type="submit" value="Complete Registration" className='btn-a' />
                </form>
            </div>
            <footer className="footer">
                <h4>This Website is Designed & Developed By <span>Sachin Jha</span></h4>
            </footer>


            {registrationScreen && <div className="registration-number-screen">
                <div className="registration-number-box">
                    <img src={correct} alt="" />
                    <h3>Registration Successfull</h3>
                    <p>Here is your Registration Number , please took screenshot or save it anywhere. You can only be allowed to enter after verifying your registration number</p>
                    <h3>{registrationNumber}</h3>
                    <button className="btn-a" onClick={handleClosingOfRegistrationScreen}>Done</button>
                </div>
            </div>}
        </div>
    )
}
