import { useEffect, useState } from "react";
import api from "../../utils/axios-custom";
import Coursestructure from "../Course/Coursestructure";
import { useAccount } from "../../redux/slice/accountSlice";

export default function Cources() {
  const [mernCourses, setMernCourses] = useState([]);
  const [programingCourses, setProgramingCourses] = useState([]);
  const { user } = useAccount();
  const getAllCourse = async () => {
    try {
      const resCourse = await api.get("/api/Course/all-course");
      const resCategory = await api.get("/api/Category/all-Category");
      const getAllPusrchase = await api.get(
        "/api/UserCourse/get-all-UserCourse"
      );
      const courseData = await resCourse.data;
      const categoryData = await resCategory.data;
      const allCourseByCategory = categoryData.map((category) => {
        const courseGroup = courseData
          .filter((course) => course.cateId === category.idcategory)
          .map((course) => {
            const coursePurchased = getAllPusrchase.data.find(
              (coursePurchased) =>
                coursePurchased.courseId === course.courseId &&
                coursePurchased.userId === user.UserId
            );
            return {
              ...course,
              isPuchrase: coursePurchased ? true : false,
            };
          });
        return {
          categroyId: category.idcategory,
          categoryName: category.name,
          courses: courseGroup,
        };
      });

      setMernCourses(allCourseByCategory);
    } catch (error) {
      console.error("Error fetching course data:", error);
    }
  };
  useEffect(() => {
    getAllCourse();
    setProgramingCourses(JSON.parse(localStorage.getItem("ProgramingCourses")));
  }, []);

  return (
    <>
      {mernCourses.map((course) => (
        <div className="container-xxl py-5" key={course.categroyId}>
          <div className="container">
            <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
              <h6 className="section-title bg-white text-center text-primary px-3">
                {course.categoryName}
              </h6>
            </div>
            <div
              className="row g-4 justify-content-center"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "1rem",
              }}
            >
              {course.courses.map((course) => (
                <Coursestructure key={course.courseId} course={course} />
              ))}
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
