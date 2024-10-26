import React, { useEffect, useState } from "react";
import "../../assets/css/style.css";
import Navbar from "../Pages/Navbar";
import { useParams } from "react-router-dom";
import api from "../../utils/axios-custom";
import { Progress } from "antd";

export default function Sidebar() {
  const { couserId } = useParams();
  const [lessons, setLessons] = useState([]);
  const [activeItem, setActiveItem] = useState();
  const [progress, setProgress] = useState(0);
  const [lessonLearned, setLessonLearned] = useState();
  const fetchData = async () => {
    try {
      const response = await api.get(`/api/Lesson/Course/${couserId}`);
      if (response.data) {
        const data = response.data.map((lesson, index) => ({
          ...lesson,
          lessonNumber: index + 1,
        }));
        setLessons(data);
        setActiveItem(data[0]);
        setProgress(0); // Initialize progress
        setLessonLearned([data[0].lessonId]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [couserId]);

  useEffect(() => {
    if (lessons.length > 0 && activeItem) {
      const currentIndex = lessons.findIndex(
        (lesson) => lesson.lessonId === activeItem.lessonId
      );
      setProgress(((currentIndex + 1) / lessons.length) * 100);
    }
  }, [lessons]);

  const handleLessonClick = (lesson) => {
    setActiveItem(lesson);
    const lessonId = lessonLearned.find((item) => item === lesson.lessonId);
    if (lessonId) return;
    setLessonLearned([...lessonLearned, lesson.lessonId]);
    setProgress((lessonLearned / lessons.length) * 100);
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
