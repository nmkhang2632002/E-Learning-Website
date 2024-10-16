export const ProgramingCourses = [
    {
        id: 1,
        time: "0.1s",
        img: "/img/java.jpg",
        readlink: "https://en.wikipedia.org/wiki/java",
        join: "/cources/programming/java",
        price: "$249.00",
        review: 285,
        title: "Java Full Course",
        teachername: "Basant",
        duration: "4.50 Hrs",
        totalstudent: "145",
        purchased: false
    },
    {
        id: 2,
        time: "0.3s",
        img: "/img/Adv_java.jpg",
        readlink: "https://en.wikipedia.org/wiki/Advance java",
        join: "/cources/programming/advJava",
        price: "$189.00",
        review: 156,
        title: "Advance Java",
        teachername: "Basant",
        duration: "4.13 Hrs",
        totalstudent: "75",
        purchased: false
    },
    {
        id: 3,
        time: "0.5s",
        img: "/img/JavaScript.jpg",
        readlink: "https://en.wikipedia.org/wiki/JavaScript",
        join: "/cources/programming/javascript",
        price: "$89.00",
        review: 115,
        title: "JavaScript Tutorials",
        teachername: "Basant",
        duration: "4.50 Hrs",
        totalstudent: "135",
        purchased: false
    },
]

// Save the ProgramingCourses array to LocalStorage
localStorage.setItem('ProgramingCourses', JSON.stringify(ProgramingCourses));