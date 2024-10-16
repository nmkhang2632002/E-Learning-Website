export const FreeCourses = [
    {
        id: 1,
        time: "0.6s",
        img: "/img/nodejs.jpg",
        readlink: "https://en.wikipedia.org/wiki/nodejs",
        join: "/courses/mern/express",
        price: "$free",
        review: 85,
        title: "Node JS Tutorials",
        teachername: "Basant",
        duration: "1.50 Hrs",
        totalstudent: "35",
        purchased: false
    },
    {
        id: 2,
        time: "0.1s",
        img: "/img/react.jpg",
        readlink:
            "https://en.wikipedia.org/wiki/Outline_of_web_design_and_web_development",
        join: "/courses/mern/react",
        price: "$free",
        review: 285,
        title: "React Js Tutorials",
        teachername: "Basant",
        duration: "1.50 Hrs",
        totalstudent: "35",
        purchased: false
    },
]

// Save the MernStackCourses array to LocalStorage
localStorage.setItem('FreeCourses', JSON.stringify(FreeCourses));

console.log(FreeCourses);