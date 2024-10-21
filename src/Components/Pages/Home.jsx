import React, { useEffect } from "react";
import Navbar from "./Navbar";
import Slide from "./Slide";
import Service from "./Service";
import About from "./About";
import Courses from "./Courses";
import Team from "./Team";
import Testimonial from "./Testimonial";
import Footer from "./Footer";
import Spinner from "./Spinner";
import Contact from "./Contact";
import BotpressChatbot from "../Ebook/BotpressChatbot";
import axios from "axios";
import api from "../../utils/axios-custom";

export default function Home() {
  const getData = async () => {
    const response = await api.get("/api/lesson"); // Add your API URL here
    const data = await response.data;
    console.log(data);
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <Spinner />
      <Navbar />
      <Slide />
      <Service />
      <About />
      <Courses />
      <Team />
      <Testimonial />
      <Footer />
      <a href="#" className="btn btn-primary back-to-top">
        <i className="bi bi-arrow-up"></i>
      </a>
    </>
  );
}
