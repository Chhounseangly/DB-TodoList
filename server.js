const express = require('express')
const app = express()
const mysql = require('mysql')
const cors = require("cors")

const port = 8000
app.use(express.json());
app.use(cors())

const dbConnect = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "task_management",
    password: ""
    
})

app.get("/datas", (req, res) =>{
    const q = "SELECT * FROM todolists"
    dbConnect.query(q, (err, data) => {
        if(err) 
        return res.json(err)
        return res.json(data)
    })
})

app.post("/datas", (req, res) =>{
    const q = "INSERT INTO todolists (`subject`, `infor`) VALUES (?)"
    const values = [
        req.body.subject,
        req.body.infor

    ];

    dbConnect.query(q,[values], (err, data) =>{
        if(err) return res.json(err);
        return res.json("Created Successfully")
    });

})

app.delete("/datas/:id", (req, res) =>{
    const todoId = req.params.id
    const q = "DELETE FROM todolists WHERE id = ?"

    dbConnect.query(q,[todoId], (err,data)=>{
        if(err) return res.json(err);
        return res.json("Todolist has been deleted successfully.")
    })
})

app.put("/datas/:id", (req, res) => {
    const todoId = req.params.id;
    const q = "UPDATE todolists SET `subject` = ?, `infor` = ? WHERE id = ?";

    const values = [
        req.body.subject,
        req.body.infor
    ]

    dbConnect.query(q, [...values, todoId], (err, data) =>{
        if(err) return res.json(err);
        return res.json("Todolist has been Updated successfully.")
    })
})




app.listen(port, () => console.log(`Server Running http://localhost:${port}`));