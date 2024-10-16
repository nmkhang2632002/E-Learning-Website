import { useEffect, useState } from "react";
import Navbar from "../Pages/Navbar";
import Footer from "../Pages/Footer";
import Coursestructure from "./Coursestructure";
import { ProgramingCourses } from "../../apis/FakeData/Courses/Programing";


export default function Programming() {

  const [programingCourses, setProgramingCourses] = useState([]);


  useEffect(() => {
    setProgramingCourses(ProgramingCourses);
  }, [])


  return (
    <>
      <Navbar />
      <div className="container-xxl py-5">
        <div className="container">
          <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
            <h6 className="section-title bg-white text-center text-primary px-3">
              Courses
            </h6>
            <h1 className="mb-5">Programming Languages Tutorials</h1>
          </div>
          <div className="row g-4 justify-content-center">
            <Coursestructure course={programingCourses} />
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
