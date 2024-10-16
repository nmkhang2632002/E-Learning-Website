export const Accounts = [
    {
        _id: {
            $oid: "670d2cab18536622b4aae886"
        },
        username: "hadilao",
        email: "hadilao@gmail.com",
        password: "123456",
        role: "student",
        phoneNumber: "0123456789",
        dateOfBirth: "1999-05-12",
        __v: 0,
        isAuthenticated: true,
    },
    {
        _id: {
            $oid: "670d2cab18536622b4aae887"
        },
        username: "johnsmith",
        email: "johnsmith@gmail.com",
        password: "123456",
        role: "student",
        phoneNumber: "0987654321",
        dateOfBirth: "2000-02-22",
        __v: 0,
        isAuthenticated: true,
    },
    {
        _id: {
            $oid: "670d2cab18536622b4aae888"
        },
        username: "mariamiller",
        email: "mariamiller@gmail.com",
        password: "123456",
        role: "student",
        phoneNumber: "0132465798",
        dateOfBirth: "1998-08-15",
        __v: 0,
        isAuthenticated: true,
    },
    {
        _id: {
            $oid: "670d2cab18536622b4aae889"
        },
        username: "professorlee",
        email: "professorlee@gmail.com",
        password: "123456",
        role: "instructor",
        phoneNumber: "0192837465",
        dateOfBirth: "1975-10-10",
        __v: 0,
        isAuthenticated: true,
    },
    {
        _id: {
            $oid: "670d2cab18536622b4aae88a"
        },
        username: "admin",
        email: "admin@gmail.com",
        password: "123456",
        role: "admin",
        phoneNumber: "0173658492",
        dateOfBirth: "1980-03-08",
        __v: 0,
        isAuthenticated: true,
    }
];


// Save the updated Accounts array to LocalStorage
localStorage.setItem('Accounts', JSON.stringify(Accounts));
