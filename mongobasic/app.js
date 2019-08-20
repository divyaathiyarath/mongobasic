const Express=require('express');
var bodyparser=require('body-parser');
var request=require('request');
var app=new Express();
var Mongoose=require('mongoose');
Mongoose.connect("mongodb://localhost:27017/collegedb");
const StudentModel=Mongoose.model("studentdetails",
{
    name:String,
    rollno:String,
    admno:String,
    college:String
});
app.set('view engine','ejs');
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));
app.get('/',(req,res)=>
{
 res.render('index');
});
app.post('/read',(req,res)=>
{
//  var name=req.body.name;
//  var rollno=req.body.rollno;
//  var admno=req.body.admno;
//  var college=req.body.college;
// res.send({name,admno,college,rollno});
console.log(req.body);
var student=new StudentModel(req.body);
var result=student.save((error)=>
{
    if(error)
    {
        throw error;
        res.send(error);
    }
    else{
        res.send("User created");
    }
});
res.send(result);


});
app.get('/getdatas',(req,res)=>{

var result=StudentModel.find((error,data)=>
{
 if(error)
 {
     throw error;
 }
 else{
     res.send(data);
 }
})

});
const getdataApi="http://localhost:3000/getdatas";
app.get('/viewall',(req,res)=>
{
    request(getdataApi,(error,response,body)=>{
         
        var data=JSON.parse(body);
        console.log(data);
        res.render('viewall',{'data':data});
    });
    
});

app.listen(process.env.PORT || 3000,()=>
{
    console.log("Server is running");
});