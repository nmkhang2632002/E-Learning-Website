export const ProgramingCourses = [
    {
        id: 1,
        time: "0.1s",
        img: "/img/java.jpg",
        readlink: "https://en.wikipedia.org/wiki/java",
        join: "/cources/programming/java",
        price: "100.00VND",
        review: 285,
        title: "Java Full Course",
        teachername: "Basant",
        duration: "4.50 Hrs",
        totalstudent: "145",
        purchased: true
    },
    {
        id: 2,
        time: "0.3s",
        img: "/img/Adv_java.jpg",
        readlink: "https://en.wikipedia.org/wiki/Advance java",
        join: "/cources/programming/advJava",
        price: "20.000VND",
        review: 156,
        title: "Advance Java",
        teachername: "Basant",
        duration: "4.13 Hrs",
        totalstudent: "75",
        purchased: true
    },
    {
        id: 3,
        time: "0.5s",
        img: "/img/JavaScript.jpg",
        readlink: "https://en.wikipedia.org/wiki/JavaScript",
        join: "/cources/programming/javascript",
        price: "15.000VND",
        review: 115,
        title: "JavaScript Tutorials",
        teachername: "Basant",
        duration: "4.50 Hrs",
        totalstudent: "135",
        purchased: true
    },
]

// Save the ProgramingCourses array to LocalStorage
localStorage.setItem('ProgramingCourses', JSON.stringify(ProgramingCourses));