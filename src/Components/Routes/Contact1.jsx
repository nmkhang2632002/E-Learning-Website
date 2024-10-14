import React from 'react'
import Navbar from '../Pages/Navbar'
import Header from '../Pages/Header'
import Footer from '../Pages/Footer'
import Contact from '../Pages/Contact'
import Spinner from '../Pages/Spinner'

export default function Contact1() {
  return (
    <>
      <Spinner />
      <Navbar />
      <Header name="Contact" />
      <Contact />
      <Footer />
    </>
  )
}
