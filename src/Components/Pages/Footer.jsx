import React from "react";

export default function Footer() {
  return (
    <>
      <div
        className="container-fluid bg-dark text-light footer pt-5 mt-5 wow fadeIn"
        data-wow-delay="0.1s"
      >
        <div className="container py-5">
          <div className="row g-5">
            <div className="col-lg-3 col-md-6">
              <h4 className="text-white mb-3">Quick Link</h4>
              <a className="btn btn-link" href>
                About Us
              </a>
              <a className="btn btn-link" href>
                Contact Us
              </a>
              <a className="btn btn-link" href>
                Privacy Policy
              </a>
              <a className="btn btn-link" href>
                Terms &amp; Condition
              </a>
              <a className="btn btn-link" href>
                FAQs &amp; Help
              </a>
            </div>
            <div className="col-lg-3 col-md-6">
              <h4 className="text-white mb-3">Contact</h4>
              <p className="mb-2">
                <i className="fa fa-map-marker-alt me-3" />
                Quận 9, Thành phố Hồ Chí Minh
              </p>
              <p className="mb-2">
                <i className="fa fa-phone-alt me-3" />
                +091252783
              </p>
              <p className="mb-2">
                <i className="fa fa-envelope me-3" />
                nhatnam2490@gamil.com
              </p>
              <div className="d-flex pt-2">
                <a
                  className="btn btn-outline-light btn-social"
                  href="https://www.facebook.com/profile.php?id=61566225097120"
                  target="_blank"
                >
                  <i className="fab fa-facebook-f" />
                </a>

                <a
                  className="btn btn-outline-light btn-social"
                  href="https://www.instagram.com/learnwithedy"
                  target="_blank"
                >
                  <i className="fab fa-instagram" />
                </a>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <h4 className="text-white mb-3">Gallery</h4>
              <div className="row g-2 pt-2">
                <div className="col-4">
                  <img
                    className="img-fluid bg-light p-1"
                    src="/img/course-1.jpg"
                    alt=""
                  />
                </div>
                <div className="col-4">
                  <img
                    className="img-fluid bg-light p-1"
                    src="/img/course-2.jpg"
                    alt=""
                  />
                </div>
                <div className="col-4">
                  <img
                    className="img-fluid bg-light p-1"
                    src="/img/course-3.jpg"
                    alt=""
                  />
                </div>
                <div className="col-4">
                  <img
                    className="img-fluid bg-light p-1"
                    src="/img/course-2.jpg"
                    alt=""
                  />
                </div>
                <div className="col-4">
                  <img
                    className="img-fluid bg-light p-1"
                    src="/img/course-3.jpg"
                    alt=""
                  />
                </div>
                <div className="col-4">
                  <img
                    className="img-fluid bg-light p-1"
                    src="/img/course-1.jpg"
                    alt=""
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <h4 className="text-white mb-3">Newsletter</h4>
              <p>This website is a start up project</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
