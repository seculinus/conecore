
const STATUS_ON_MISSING = {id:1, name:"Missing", color:"pink.300"}
const STATUS_ON_FILLING= {id:2, name:"Fill", color:"green.300"}
const STATUS_ON_ACTING= {id:3, name:"Acting", color:"cyan.300"}
const STATUS_ON_CRYING= {id:4, name:"Cryuing", color:"orange.300"}


export const DATA = [
    {
        task: "Add a new geature",
        status: STATUS_ON_MISSING,
        due: new Date("2023/10/15"),
        notes: "This is a note",
    },
    {
        task: "Add a 2nd geature",
        status: STATUS_ON_FILLING,
        due: new Date("2024/10/15"),
        notes: "This is a test",
    },
    {
        task: "Add a 3rd geature",
        status: STATUS_ON_ACTING,
        notes: "This is a test",
    },
    {
        task: "Add a 4d geature",
        status: STATUS_ON_CRYING,
        notes: "This is a test",
    },
]


export const STATUSES = [
    STATUS_ON_FILLING, 
    STATUS_ON_MISSING,
    STATUS_ON_ACTING,
    STATUS_ON_CRYING
]
