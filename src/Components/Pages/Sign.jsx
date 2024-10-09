import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'

export default function Sign() {
    return (
        <>
            <Navbar />

            <div className=" m-4 ">
                <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
                    <h6 className="section-title bg-white text-center text-primary px-3">Sign In Page</h6>
                    <h1 className="mb-5">Sign In</h1>
                </div>
                <div className="singin container" style={{ height: "50vh", minWidth: "70%" }}>

                    <form method='post' action='http://localhost:8080/signIn/'>
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                            <input type="email" name='email' className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                            <input type="password" name='pwd' className="form-control" id="exampleInputPassword1" />
                        </div>
                        <div className='text-center'>
                            <button type="button" className="btn btn-primary  me-4 animated slideInLeft"> Login </button>
                            <button className="btn btn-primary animated slideInRight"><Link to="/register" style={{ color: "white" }}>Sign Up</Link></button>
                        </div>
                    </form>
                </div>
            </div>

            <Footer />
        </>
    )
}
