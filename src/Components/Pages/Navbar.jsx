import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { doLogoutAction } from '../../redux/slice/slice';

export default function Navbar() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // set biến 'account' chứa all
  const account = useSelector(state => state?.account?.user?.user);

  // console.log("account", account);

  // set biến 'userSelector' chứa thông tin đã đăng nhập
  const accountInfo = useSelector(state => state?.account?.user?.user);

  // // check biến 'account' đã authenticated là TRUE chưa.
  // const isAuthenticated = account.isAuthenticated;

  // console.log("accountInfo", accountInfo);


  // Function xử lý thoát đăng nhập
  const handleLogOut = () => {

    // console.log('Button Logout clicked')
    // localStorage.removeItem('Token');
    dispatch(doLogoutAction());
    navigate('/');
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-white navbar-light shadow sticky-top p-0">
        <Link
          to="/"
          className="navbar-brand d-flex align-items-center px-4 px-lg-5"
        >
          <h2 className="m-0 text-primary">
            <i className="fa fa-book me-3"></i>EDY-LEARNING
          </h2>
        </Link>
        <button
          type="button"
          className="navbar-toggler me-4"
          data-bs-toggle="collapse"
          data-bs-target="#navbarCollapse"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarCollapse">
          <div className="navbar-nav ms-auto p-4 p-lg-0">
            <NavLink
              exact
              to="/"
              className="nav-item nav-link"
              activeClassName="active"
            >
              Home
            </NavLink>
            <NavLink
              to="/about"
              className="nav-item nav-link"
              activeClassName="active"
            >
              About
            </NavLink>
            <NavLink
              to="/courses"
              className="nav-item nav-link"
              activeClassName="active"
            >
              Courses
            </NavLink>
            <div className="nav-item dropdown">
              <NavLink
                to="/pages"
                className="nav-link dropdown-toggle"
                data-bs-toggle="dropdown"
              >
                Pages
              </NavLink>
              <div className="dropdown-menu fade-down m-0">
                <NavLink
                  to="/team"
                  className="dropdown-item"
                  activeClassName="active"
                >
                  Our Team
                </NavLink>
                <NavLink
                  to="/testimonial"
                  className="dropdown-item"
                  activeClassName="active"
                >
                  Testimonial
                </NavLink>
                <NavLink
                  to="/feedback"
                  className="dropdown-item"
                  activeClassName="active"
                >
                  Feedback
                </NavLink>
              </div>
            </div>
            <NavLink
              to="/contact"
              className="nav-item nav-link"
              activeClassName="active"
            >
              Contact
            </NavLink>
          </div>

          {account?.isAuthenticated === true ? (
            <>
              <NavLink
                to="/profile"
                className="nav-item nav-link"
                activeClassName="active"
              >
                Welcome, {accountInfo.username}
              </NavLink>

              <button
                className="btn btn-primary py-4 px-lg-5 d-none d-lg-block"
                onClick={() => handleLogOut()}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/signin">
                <button
                  className="btn btn-primary py-4 px-lg-5 d-none d-lg-block"
                // onClick={() => loginWithRedirect()}
                >
                  Join Now<i className="fa fa-arrow-right ms-3"></i>
                </button>
              </Link>
            </>
          )}
        </div>
      </nav>
    </>
  );
}
