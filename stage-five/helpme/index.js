
const express = require('express');
const app = express();
const nunjucks = require('nunjucks')
const path = require('path');



app.use(express.json())






app.set("views",path.join(__dirname,"views"));
app.set("view engine","html")
nunjucks.configure("views",{
    autoescape:true,express:app
})

app.use(express.static(path.join(__dirname,"public")))


app.get("/video/download",(req,res)=> {
    res.render("video")
})

app.use("/",(req,res) => {
    res.render("homepage")
})



const port = process.env.PORT || 5000;
const start =  () => {
    try {
        app.listen(port,console.log(`Server running at ${port}`))    
    } catch (error) {
        console.log(error);
    }
}

start()