import express from "express"
import path from "path"
import bodyParser from "body-parser"
import weblio from "./src/platforms/weblio"


const app = express()
app.use(express.urlencoded({ extended: true }));
app.set("views", "./views")
app.set("view engine", "pug")
app.use(express.static(path.join(__dirname, "public")))


app.get("/", (req, res) => {
    // res.send("hello world")
    // res.sendFile(path.join("index"))
    res.render("index")
})
app.post("/", async (req, res) => {
    weblio(req.body.word)
        .then(r =>{
            console.log("success")

            res.render("index", {
                "word": req.body.word,
                "weblio": {
                    "meaning": r[0],
                    "terms": r[1],
                    "sentences": r[2]
                }
            })
        })
        .catch(err => {
            console.log("err")
            console.log(err)
            res.render("index", {
                "word": req.body.word
            })
        })
})

app.listen(3000, () => {
    console.log("Running!")
})