import React, { useEffect, useState } from "react";
import "../../assets/css/style.css";
import Navbar from "../Pages/Navbar";
import { useParams } from "react-router-dom";
import api from "../../utils/axios-custom";
import { Progress } from "antd";
import { useAccount } from "../../redux/slice/accountSlice";

export default function Sidebar() {
  const { couserId } = useParams();
  const [lessons, setLessons] = useState([]);
  const [activeItem, setActiveItem] = useState();
  const [progress, setProgress] = useState(0);
  const [lessonLearned, setLessonLearned] = useState();
  const [userCourse, setUserCourse] = useState();
  const account = useAccount();
  const fetchData = async () => {
    try {
      const response = await api.get(`Lesson/Course/${couserId}`);
      if (response.data) {
        const data = response.data.map((lesson, index) => ({
          ...lesson,
          lessonNumber: index + 1,
        }));
        setLessons(data);
        setActiveItem(data[0]);
        setLessonLearned([data[0].lessonId]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchAllUserCourse = async () => {
    const getAllPusrchase = await api.get("UserCourse/get-all-UserCourse");
    const purchasedCourse = await getAllPusrchase.data;
    if (purchasedCourse) {
      const userCourse = purchasedCourse.find(
        (coursePurchased) =>
          coursePurchased.courseId === parseInt(couserId) &&
          coursePurchased.userId === account.user.UserId
      );
      setUserCourse(userCourse);
    }
  };

  useEffect(() => {
    fetchData();
    fetchAllUserCourse();
  }, [couserId]);

  useEffect(() => {
    if (userCourse?.certificate) {
      setProgress(100);
    }
  }, [userCourse]);

  useEffect(() => {
    if (userCourse?.certificate) return;
    if (lessons?.length > 0 && lessonLearned?.length > 0) {
      setProgress((lessonLearned?.length / lessons.length) * 100);
    }
  }, [lessons?.length, lessonLearned?.length]);

  const handleFinishCourse = async () => {
    if (progress === 100 && userCourse?.certificate === false) {
      try {
        if (userCourse) {
          const response = await api.post(
            `UserCourse/edit-UserCourse-Certificate?UserCourseId=${userCourse?.id}`
          );
          if (response.data) {
            alert("Course completed");
          }
        }
      } catch (error) {
        console.error("Error complete course:", error);
      }
    }
  };

  useEffect(() => {
    handleFinishCourse();
  }, [progress]);

  const handleLessonClick = (lesson) => {
    setActiveItem(lesson);
    if (userCourse.certificate) return;
    const lessonId = lessonLearned.find((item) => item === lesson.lessonId);
    if (lessonId) return;
    setLessonLearned([...lessonLearned, lesson.lessonId]);
  };

  return (
    <>
      <Navbar />
      <div className="layout">
        <aside className="sidebar">
          <div className="sidebar-header">
            <h2 className="sidebar-title">Lessons</h2>
          </div>
          <nav className="sidebar-nav">
            <ul className="sidebar-menu">
              {lessons.map((lesson) => (
                <li
                  key={lesson.lessonId}
                  className={`sidebar-item ${
                    activeItem.lessonId === lesson.lessonId ? "active" : ""
                  }`}
                  onClick={() => handleLessonClick(lesson)}
                >
                  <div className="sidebar-item-content">
                    <span>Lesson {lesson?.lessonNumber}</span>
                    {activeItem.lessonId === lesson.lessonId && (
                      <span className="sidebar-icon">→</span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </nav>
          <div style={{ textAlign: "center" }}>
            <Progress percent={progress} type="circle" />
          </div>
        </aside>

        <main className="main-content">
          <LessonContent lesson={activeItem} />
        </main>
      </div>
    </>
  );
}

function LessonContent({ lesson }) {
  return (
    <div className="lesson-content">
      <h1 className="lesson-title">Lesson {lesson?.lessonNumber}</h1>
      <div className="lesson-image">
        <img src={lesson?.picture} alt={`Lesson ${lesson?.lessonId}`} />
      </div>
      <div className="lesson-detail">
        <p>{lesson?.detail}</p>
      </div>
    </div>
  );
}
