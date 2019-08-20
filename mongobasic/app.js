const Express=require('express');
var bodyparser=require('body-parser');
var app=new Express();
app.set('view engine','ejs');
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));
app.get('/',(req,res)=>
{
 res.render('index');
});
app.post('/read',(req,res)=>
{
 var name=req.body.name;
 var rollno=req.body.rollno;
 var admno=req.body.admno;
 var college=req.body.college;
res.send({name,admno,college,rollno});
});
app.listen(3000,()=>
{
    console.log("Server is running");
});