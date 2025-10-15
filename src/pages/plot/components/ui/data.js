
const STATUS_ON_MISSING = {id:1, name:"Missing", color:"pink.300"}
const STATUS_ON_FILLING= {id:1, name:"Fill", color:"green.300"}


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
]

export const STATUSES = {
    STATUS_ON_FILLING, STATUS_ON_MISSING
}