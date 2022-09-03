import express from "express"
import path from "path"
import bodyParser from "body-parser"


const app = express()
app.use(express.urlencoded({ extended: true }));
app.set("views", "./views")
app.set("view engine", "pug")


app.get("/", (req, res) => {
    // res.send("hello world")
    // res.sendFile(path.join("index"))
    res.render("index")
})
app.post("/", (req, res) => {
    // const word = req.body.word;
    console.log(req.body)
    res.render("index")
})

app.listen(3000, () => {
    console.log("Running!")
})