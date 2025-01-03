require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const https= require('https');
const { urlToHttpOptions } = require('url');
const app=express();

app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("public"));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");
})

app.post("/",function(req,res){
    var firstname =req.body.fname;
    var lastname=req.body.lname;
    var email=req.body.email;

    const data={
        members: [
            {
                email_address:email,
                status: "subscribed",
                merge_fields:{
                    FNAME: firstname,
                    LNAME: lastname
                }
            }
        ]
    };

    const jsonData=JSON.stringify(data);

    const url ="https://us7.api.mailchimp.com/3.0/lists/aa70a4f8db";
    const options={
        method:"POST",
        auth:"55607c384a0be866646f0f286e74d927-us7"
    }

   const request = https.request(url,options,function(response){

        if(response.statusCode === 200){
            res.sendFile(__dirname+"/success.html");
        }
        else{
            res.sendFile(__dirname+"/failure.html");
        }
        
        response.on("data",function(data){
            console.log(JSON.parse(data));
        })
    })

    request.write(jsonData);
    request.end();

})

app.post("/redirect",function(req,res){
    res.redirect("/");
})

const PORT = process.env.PORT || 3000;

app.listen(PORT,function(){
    console.log("Server is running on port 3000");
})





// Audience Id
// aa70a4f8db
