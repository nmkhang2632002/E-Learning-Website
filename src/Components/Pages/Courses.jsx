import { useEffect, useState } from "react";
import Coursestructure from "../Course/Coursestructure";

// API
// import { GetCourses } from "../../apis/Coures/course";

// FAKE DATA
import { FreeCourses } from "../../apis/FakeData/Courses/FreeCourse";
// import { MernStackCourses } from "../../apis/FakeData/Courses/Mern";
// import { FullStackCourses } from "../../apis/FakeData/Courses/FullStack";
// import { ProgramingCourses } from "../../apis/FakeData/Courses/Programing";


export default function Cources() {

  // API
  // const [courses, setCourses] = useState([]);

  // FAKE DATA
  const [mernCourses, setMernCourses] = useState([]);
  const [programingCourses, setProgramingCourses] = useState([]);
  const [fullStackCourses, setFullStackCourses] = useState([])
  const [freeCourses, setFreeCourses] = useState([]);

  console.log('====================================');
  console.log("Free Courses", freeCourses);
  console.log('====================================');

  // useEffect API
  // useEffect(() => {
  //   fetchCourses();
  // }, [])

  // useEffect FAKE DATA
  useEffect(() => {
    setMernCourses(JSON.parse(localStorage.getItem('MernStackCourses')));
    setFullStackCourses(JSON.parse(localStorage.getItem('FullStackCourses')));
    setProgramingCourses(JSON.parse(localStorage.getItem('ProgramingCourses')));
    setFreeCourses(JSON.parse(localStorage.getItem('FreeCourses')));
  }, [])


  // API GET COURSES FUNCTION
  // const fetchCourses = async () => {

  //   try {
  //     const res = await GetCourses();
  //     // console.log("res", res);

  //     // fetch successfully
  //     const dataCourses = res?.data || []
  //     setCourses(dataCourses);
  //   } catch (error) {
  //     console.log("Error fetching Courses:", error);
  //   }
  // }


  return (
    <>
      {/* ************** MERN-STACK COURSES ***************/}
      <div className="container-xxl py-5">
        <div className="container">
          <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
            <h6 className="section-title bg-white text-center text-primary px-3">
              Mern-Stack
            </h6>
            <h1 className="mb-5">Premier Courses</h1>
          </div>
          <div className="row g-4 justify-content-center">
            <Coursestructure course={mernCourses} />
          </div>
        </div>
      </div>

      {/* ************** Full-Stack COURSES ***************/}
      <div className="container-xxl py-5">
        <div className="container">
          <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
            <h6 className="section-title bg-white text-center text-primary px-3">
              Full-Stack
            </h6>
            <h1 className="mb-5">Premier Courses</h1>
          </div>
          <div className="row g-4 justify-content-center">
            <Coursestructure course={fullStackCourses} />
          </div>
        </div>
      </div>

      {/* ************** PROGRAMING COURSES ***************/}
      <div className="container-xxl py-5">
        <div className="container">
          <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
            <h6 className="section-title bg-white text-center text-primary px-3">
              Programing
            </h6>
            <h1 className="mb-5">Premier Courses</h1>
          </div>
          <div className="row g-4 justify-content-center">
            <Coursestructure course={programingCourses} />
          </div>
        </div>
      </div>

      {/* ************** FREE COURSES ***************/}
      <div className="container-xxl py-5">
        <div className="container">
          <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
            <h6 className="section-title bg-white text-center text-primary px-3">
              Category
            </h6>
            <h1 className="mb-5">Free Courses</h1>
          </div>
          <div className="row g-4 justify-content-center">
            <Coursestructure course={freeCourses} />
          </div>
        </div>
      </div>

    </>
  );
}
