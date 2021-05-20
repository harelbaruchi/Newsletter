const express= require('express');
const bodyParser= require("body-parser");
const request= require("request");
const https= require('https');

const app=express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
res.sendFile(__dirname + "/signup.html");


});

app.post("/", function(req,res){
  const firstName=req.body.fname
  const lastName=req.body.lname
  const email=req.body.email

  var data= {
    members: [
      {
        email_address: email,
         status: "subscribed",
         merge_fields: {
           FNAME: firstName,
           LNAME: lastName
         }

      }
    ]
  };

  const jsonData= JSON.stringify(data);

  const url='https:us1.api.mailchimp.com/3.0/lists/51c7730b45'

  const options= {
    method: "POST",
     auth: "Harel1:838d29c47dd17aa208226af99d3454e4-us1"
  }



const request= https.request(url, options, function(response){

  if(response.statusCode === 200) {
      res.sendFile(__dirname + "/success.html")
  } else{
      res.sendFile(__dirname + "/failure.html")
  }


  response.on("data", function(data){
    console.log(JSON.parse(data));

  })
})

request.write(jsonData);
request.end();

});

app.post("/failure", function(req, res){
  res.redirect("/")
})



app.listen(process.env.PORT||3000, function(){
  console.log("server is running on port 3000");
});

// api key
// 838d29c47dd17aa208226af99d3454e4-us1

// list id
// 51c7730b45
