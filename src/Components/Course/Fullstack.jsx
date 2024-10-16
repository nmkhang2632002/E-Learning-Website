import { useEffect, useState } from "react";
import Navbar from "../Pages/Navbar";
import Footer from "../Pages/Footer";
import Coursestructure from "./Coursestructure";
import { FullStackCourses } from "../../apis/FakeData/Courses/FullStack";

export default function Fullstack() {

  const [fullStackCourses, setFullStackCourses] = useState([])

  useEffect(() => {
    setFullStackCourses(FullStackCourses);
  }, [])



  return (
    <>
      <Navbar />
      <div className="container-xxl py-5">
        <div className="container">
          <div className="text-center wow fadeInUp" data-wow>
            <h6 className="section-title bg-white text-center text-primary px-3">
              Courses
            </h6>
            <h1 className="mb-5">Full Stack Web Devlopment Courses</h1>
          </div>

          <div className="row g-4 justify-content-center">
            <Coursestructure course={fullStackCourses} />
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
