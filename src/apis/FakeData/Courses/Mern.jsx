export const MernStackCourses = [
    {
        id: 1,
        time: "0.3s",
        img: "/img/mongodb.jpg",
        readlink: "https://en.wikipedia.org/wiki/mongodb",
        join: "/courses/mern/mongodb",
        price: "89.00VND",
        review: 156,
        title: "Mongodb Tutorials",
        teachername: "Basant",
        duration: "1.50 Hrs",
        totalstudent: "35",
        purchased: true
    },
    {
        id: 2,
        time: "0.5s",
        img: "/img/express.jpg",
        readlink: "https://en.wikipedia.org/wiki/expressjs",
        join: "/courses/mern/express",
        price: "49.00VND",
        review: 115,
        title: "Express Js Tutorials",
        teachername: "Basant",
        duration: "1.50 Hrs",
        totalstudent: "35",
        purchased: true
    },
]

// Save the MernStackCourses array to LocalStorage
localStorage.setItem('MernStackCourses', JSON.stringify(MernStackCourses));