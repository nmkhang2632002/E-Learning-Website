import { useEffect, useState } from "react";
import Coursestructure from "../Course/Coursestructure";

// API
import { GetAllCourses } from "../../apis/Coures/course";

// FAKE DATA
import { FreeCourses } from "../../apis/FakeData/Courses/FreeCourse";
// import { MernStackCourses } from "../../apis/FakeData/Courses/Mern";
// import { FullStackCourses } from "../../apis/FakeData/Courses/FullStack";
// import { ProgramingCourses } from "../../apis/FakeData/Courses/Programing";

export default function Cources() {
  // API
  const [allCourses, setAllCourses] = useState([]);

  // FAKE DATA
  // const [mernCourses, setMernCourses] = useState([]);
  // const [programingCourses, setProgramingCourses] = useState([]);
  // const [fullStackCourses, setFullStackCourses] = useState([])
  // const [freeCourses, setFreeCourses] = useState([]);

  // console.log('====================================');
  // console.log("allCourses", allCourses);
  // console.log('====================================');

  // useEffect API
  useEffect(() => {
    fetchCourses();
  }, [])

  // useEffect FAKE DATA
  // useEffect(() => {
  //   setMernCourses(JSON.parse(localStorage.getItem('MernStackCourses')));
  //   setFullStackCourses(JSON.parse(localStorage.getItem('FullStackCourses')));
  //   setProgramingCourses(JSON.parse(localStorage.getItem('ProgramingCourses')));
  //   setFreeCourses(JSON.parse(localStorage.getItem('FreeCourses')));
  // }, [])


  // API GET COURSES FUNCTION
  const fetchCourses = async () => {

    try {
      const res = await GetAllCourses();
      console.log("res", res);

      // fetch successfully
      const dataCourses = res?.data || []
      setAllCourses(dataCourses);
    } catch (error) {
      console.log("Error fetching Courses:", error);
    }
  }


  return (
    <>
      {/* ************** MERN-STACK COURSES ***************/}
      <div className="container-xxl py-5">
        <div className="container">
          <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
            <h6 className="section-title bg-white text-center text-primary px-3">
              Courses
            </h6>
            <h1 className="mb-5">Premier Courses</h1>
          </div>
          <div className="row g-4 justify-content-center">
            <Coursestructure course={allCourses} />
          </div>
        </div>
      </div>
    </>
  );
}
