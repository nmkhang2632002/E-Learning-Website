export const FullStackCourses = [
    {
        id: 1,
        time: "0.1s",
        img: "/img/HTML.jpg",
        readlink: "https://en.wikipedia.org/wiki/html",
        join: "/courses/fullstack/html",
        price: "120.000VND",
        title: "HTML5 Tutorials",
        teachername: "Basant",
        review: 210,
        duration: "3.11 Hrs",
        totalstudent: "50",
        purchased: true
    },
    {
        id: 2,
        time: "0.3s",
        img: "/img/CSS.jpg",
        readlink: "https://en.wikipedia.org/wiki/css",
        join: "/courses/fullstack/css",
        price: "150.000VND",
        title: "CSS Tutorials",
        review: 237,
        teachername: "Basant",
        duration: "1.00 Hrs",
        totalstudent: "35",
        purchased: true
    },
    {
        id: 3,
        time: "0.5s",
        img: "/img/JavaScript.jpg",
        readlink: "https://en.wikipedia.org/wiki/javascript",
        join: "/courses/fullstack/javascript",
        price: "100.000VND",
        title: "JavaScript Tutorials",
        review: 174,
        teachername: "Basant",
        duration: "4.20 Hrs",
        totalstudent: "45",
        purchased: true
    },
    {
        id: 4,
        time: "0.7s",
        img: "/img/sql.jpg",
        readlink: "https://en.wikipedia.org/wiki/sql",
        join: "/courses/fullstack/sql",
        price: "169.00VND",
        title: "MySQL Tutorials",
        review: 123,
        teachername: "Basant",
        duration: "3.16 Hrs",
        totalstudent: "35",
        purchased: true
    },
]

// Save the FullStackCourses array to LocalStorage
localStorage.setItem('FullStackCourses', JSON.stringify(FullStackCourses));