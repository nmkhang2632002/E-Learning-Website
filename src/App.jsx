import { Navigate, Route, Routes } from "react-router-dom";
import "./input.css";

import Advjava from "./Components/Course/Advjava";
import Css from "./Components/Course/Css";
import Dsa from "./Components/Course/Dsa";
import Express from "./Components/Course/Express";
import Fullstack from "./Components/Course/Fullstack";
import Html from "./Components/Course/Html";
import Javaprog from "./Components/Course/Javaprog";
import Javascript from "./Components/Course/Javascript";
import Mern from "./Components/Course/Mern";
import Mongodb from "./Components/Course/Mongodb";
import Mysql from "./Components/Course/Mysql";
import Nodejs from "./Components/Course/Nodejs";
import Programming from "./Components/Course/Programming";
import Reactjs from "./Components/Course/Reactjs";
import BotpressChatbot from "./Components/Ebook/BotpressChatbot";
import ShowBook from "./Components/Ebook/ShowBook";
import ErrorPage from "./Components/Pages/ErrorPage";
import Home from "./Components/Pages/Home";
import Profile from "./Components/Pages/Profile";
import SignUp from "./Components/Pages/Register";
import Sign from "./Components/Pages/Sign";
import Test from "./Components/Pages/Test";
import FullstackQuiz from "./Components/Quiz/FullstackQuiz";
import JavaQuiz from "./Components/Quiz/JavaQuiz";
import JavascriptQuiz from "./Components/Quiz/JavascriptQuiz";
import ReactQuiz from "./Components/Quiz/ReactQuiz";
import About1 from "./Components/Routes/About1";
import Contact1 from "./Components/Routes/Contact1";
import Courses1 from "./Components/Routes/Courses1";
import Team1 from "./Components/Routes/Team1";
import Testimonial1 from "./Components/Routes/Testimonial1";
// import Feedback from "./Components/Pages/Feedback";
import CourseLesson from "./Components/Course/CourseLesson";
import Checkout from "./Components/Pages/Checkout";
import CouresManagement from "./Components/Pages/CourseManagement";
import Dashboard from "./Components/Pages/Dashboard";
import FeedbackAll from "./Components/Pages/FeedbackAll";

import UserManagement from "./Components/Pages/UserManagement";
import UserCourse from "./Components/profile/UserCourse";
import UserProfile from "./Components/profile/UserProfile";
import Admin from "./Components/Routes/admin";
import PaymentSuccess from "./Components/Pages/PaymentSuccess";
import PaymentFail from "./Components/Pages/PaymentFail";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/about" element={<About1 />} />
        <Route path="/courses" element={<Courses1 />} />
        <Route path="/team" element={<Team1 />} />
        <Route path="/testimonial" element={<Testimonial1 />} />
        <Route path="/contact" element={<Contact1 />} />
        <Route path="/error" element={<ErrorPage />} />

        <Route path="/signin" element={<Sign />} />

        <Route path="/register" element={<SignUp />} />

        {/* Profile User Route */}
        <Route path="/profile" element={<Profile />}>
          <Route index element={<Navigate to="/profile/info" />} />

          <Route path="/profile/info" element={<UserProfile />} />
          <Route path="/profile/course" element={<UserCourse />} />
        </Route>

        <Route path="/test" element={<Test />} />
        <Route path="/test/java" element={<JavaQuiz />} />
        <Route path="/test/fullstack" element={<FullstackQuiz />} />
        <Route path="/test/javascript" element={<JavascriptQuiz />} />
        <Route path="/test/react" element={<ReactQuiz />} />

        <Route path="/courses/java" element={<Javaprog />} />
        <Route path="/courses/dsa" element={<Dsa />} />

        <Route path="/courses/mern" element={<Mern />} />
        <Route path="/courses/mern/nodejs" element={<Nodejs />} />
        <Route path="/courses/mern/express" element={<Express />} />
        <Route path="/courses/mern/react" element={<Reactjs />} />
        <Route path="/courses/mern/mongodb" element={<Mongodb />} />

        <Route path="/courses/fullstack" element={<Fullstack />} />
        <Route path="/courses/fullstack/sql" element={<Mysql />} />
        <Route path="/courses/fullstack/nodejs" element={<Nodejs />} />
        <Route path="/courses/fullstack/express" element={<Express />} />
        <Route path="/courses/fullstack/react" element={<Reactjs />} />
        <Route path="/courses/fullstack/mongodb" element={<Mongodb />} />
        <Route path="/courses/fullstack/javascript" element={<Javascript />} />
        <Route path="/courses/:couserId/lesson" element={<CourseLesson />} />
        <Route path="/courses/fullstack/html" element={<Html />} />
        <Route path="/courses/fullstack/css" element={<Css />} />

        <Route path="/cources/programming" element={<Programming />} />
        <Route path="/cources/programming/java" element={<Javaprog />} />
        <Route path="/cources/programming/advJava" element={<Advjava />} />
        <Route
          path="/cources/programming/javascript"
          element={<Javascript />}
        />
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="/payment-fail" element={<PaymentFail />} />
        <Route path="/library" element={<ShowBook />} />
        {/* <Route path="/feedback/new" element={<Feedback />} /> */}
        <Route path="/feedback" element={<FeedbackAll />} />
        <Route path="/Pay" element={<Checkout />} />

        {/* Route ADMIN */}
        <Route path="/admin" element={<Admin />}>
          {/* Redirect from /admin to /admin/dashboard */}
          <Route index element={<Navigate to="/admin/dashboard" />} />

          {/* Other routes */}
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/user-management" element={<UserManagement />} />
          <Route
            path="/admin/course-management"
            element={<CouresManagement />}
          />
        </Route>

        <Route path="*" element={<ErrorPage />} />
      </Routes>

      <BotpressChatbot />
    </>
  );
}

export default App;
