// //step1-load the driver//this will load the library
// var mssql=require('mysql');
// var bparser=require('body-parser');
// bparserinit=bparser.urlencoded({extended:false});
// var cors=require('cors');
// var exp=require('express');
// var app=exp();//initialize express
// app.use(cors());
// app.use(exp.json())
// var mssqlconnection= mssql.createConnection({    
//         host:'localhost',
//         database:'world',
//         user:'root',
//         password:'root',
//         port:3306
//         //this is for MSSQL{
//         //port:1433
//         //options:{trustedConnection:true},
//         //driver:"msnodesqlv8",
//         //server:"200411LTP2080\\SQLEXPRESS",
//         //database:"TestDB"
//         //}
// })
// function checkConnection(error){
//     if(error==undefined){
//         console.log("connected to database");
//     }
//     else{  
//         console.log("error code"+error.errno)
//         console.log(error.message);
//     }
 
// }
// function feedback(error){
//     if(error!=undefined){
//         console.log(error.errno);
//         console.log(error.message);
//     }else
//     console.log("open the browser amd vistit url http://localhost:9901/Getall");
// }
// app.listen(9902,feedback);
 
// function Login(request, response) {
//     let userid = request.query.id;
//     let password = request.query.pass;
//     mssqlconnection.query(
//       "SELECT * FROM users WHERE userid = ? AND password = ?",
//       [userid, password],processResult );
//     response.send(queryresult);
//   }
//   app.get("/Login",Login);
 
// var queryresult=undefined;
// function processResult(error,results){
   
//         queryresult=results;
//         console.log(results);
 
// }
 
// function displayAllUsers(request,respond){
//     mssqlconnection.connect(checkConnection)
//     mssqlconnection.query("select * from users",processResult)
//     respond.send(queryresult);
//     }
 
// app.get("/Getall",displayAllUsers);
 
 
 
// function getUserById(request,response){
//     var userid=request.query.id;
//     mssqlconnection.connect(checkConnection)
//     //parameterized SQL query
//     mssqlconnection.query("select * from users where userid=?",[userid],processResult)
//     response.send(queryresult);
 
// }
 
// app.get("/getById",getUserById);  
 
 
 
// app.get("/up")
 
// var statusmessage="";
// function checkinsertstatus(error){
//    statusmessage= (error==undefined)?"<b>inserted succcessfully</b>":"<b>not inserted"+error.message+"</b>";
// }
 
 
 
// function AddUser(request,response){
//     var userid=request.body.id;
//     var password=request.body.pass;
//     var emailid=request.body.emailid;
//     console.log(userid+"\t\t "+password+"\t\t "+emailid);
//     //mssqlconnection.connect(checkConnection)
//     //parameterized SQL query
//     mssqlconnection.query("insert into users values(?,?,?)",[userid,password,emailid]);
//     response.send(statusmessage);
// }
 
// app.post("/add",bparserinit,AddUser);
 
// function Deleteuser(request,response){
//     let userid=request.query.id;
//     //var password=request.body.password;
//     //var emailid=request.body.emailid;
//     mssqlconnection.connect(checkConnection);
//     mssqlconnection.query("delete from users where userid=?",[userid],processResult);
//     response.send(statusmessage);
// }
// app.delete("/delete",Deleteuser);
 
 
// function allcontacts(request,response){
//     mssqlconnection.connect(checkConnection);
//     mssqlconnection.query("select * from contacts",processResult);
//     response.send(JSON.stringify(queryresult));
// }
// app.get("/allcontact",allcontacts);
 
// function AddContact(request,response){
//     var FirstName=request.body.fname;
//     var LastName=request.body.lname;
//     var EmailID=request.body.email;
//     var PhoneNumber=request.body.number;
//     var Address=request.body.address;
   
//     mssqlconnection.connect(checkConnection);
//     mssqlconnection.query("insert into contacts values(?,?,?,?,?)",[FirstName,LastName,EmailID,PhoneNumber,Address],checkinsertstatus);
//     response.send(statusmessage);
// }
// app.post("/addcontact",bparserinit,AddContact);
 
 
// function updatecontact(request,response){
   
//     var FirstName=request.body.fname;
//     var LastName=request.body.lname;
//     var EmailID=request.body.email;
//     var PhoneNumber=request.body.number;
//     var Address=request.body.address;
//     mssqlconnection.connect(checkConnection);
//     mssqlconnection.query("update contacts set LastName=?,EmailID=?,PhoneNumber=?,Address=? where firstname=?",[LastName,EmailID,PhoneNumber,Address,FirstName],processResult);
//     response.send(statusmessage);
// }
// app.post("/updatecontact",bparserinit,updatecontact);
 
// function Deleteuser(request,response){
//     var FirstName=request.body.fname;
   
//     mssqlconnection.connect(checkConnection);
//     mssqlconnection.query("delete from contactus where firstname=?",[FirstName],processResult);
//     response.send(statusmessage);
// }
 
// app.delete("/deletecontact",bparserinit,Deleteuser);


var mysql=require('mysql');
var exp=require('express');
var bparser = require('body-parser');
bparserInit = bparser.urlencoded({extended: false});
var cors = require('cors');//Import the cors middleware
var app = exp();
app.use(cors());
app.use(exp.json());
var mysqlconnection=mysql.createConnection({
    host:'localhost',
    database: 'world',
    user: 'root',
    password: 'root',
    port: 3306
});
function checkConnection(error){
    if(error == undefined){
        console.log("Connected to Database....");
    }
    else{
        console.log("Error code : " + error.errno);
        console.log(error.message);
    }
}
function feedback(error){
    if(error != undefined){
        console.log(error.errno);
        console.log(error.message);
    }
    else{
        console.log("Open the browser and visit this url http://localhost:9901/getUser");
    }
}
app.listen(9901, feedback);
var queryresults=undefined;
function processResults(error,results){ //use to check for results and error if present, results will be saved in JSON
    queryresults=results;
    console.log(results);//will display the query of results
}
function displayAllUsers(request,response)
{
    mysqlconnection.connect(checkConnection);
    mysqlconnection.query('Select * from users',processResults);
    response.send(queryresults);
}
app.get('/getAll',displayAllUsers);
 
function getUserById(request, response){
    var userid = request.query.uid;
    console.log(userid);
    //Parameterqized SQL
    mysqlconnection.query('select * from users where userid = ?', [userid], processResults);
    response.send(queryresults);
}
app.get('/getById', getUserById);
 
function getUserByEmail(request, response){
    var uemail = request.query.uemail;
    //Parameterqized SQL
    mysqlconnection.query('select * from users where emailid = ?', [uemail], processResults);
    response.send(queryresults);
}
app.get('/getByEmail', getUserByEmail);
 
var statusMessage = "";
function checkInsertStatus(error){
    (error == undefined)? statusMessage='<b>Insert Successful...</b>' :
    statusMessage='<b>Insert failure ' + error.message + '</b>';
}
 
function checkUpdateStatus(error){
    (error == undefined)? statusMessage='<b>Update Successful...</b>' :
    statusMessage='<b>Update failure ' + error.message + '</b>';
}
function checkDeleteStatus(error){
    (error == undefined)? statusMessage='<b>Delete Successful...</b>' :
    statusMessage='<b>Delete failure ' + error.message + '</b>';
}
 
function insertUser(request, response){
    var userid = request.body.userid;
    var password = request.body.password;
    var emailid = request.body.emailid;
    mysqlconnection.query('Insert into users values (?, ?, ?)', [userid, password, emailid], checkInsertStatus);
    response.send(JSON.stringify(statusMessage));
}
app.post('/insert', bparserInit, insertUser);
 
function updateUser(request, response){
    var userid = request.body.userid;
    var password = request.body.password;
    var emailid = request.body.emailid;
    mysqlconnection.query('Update users SET userid = ?, password = ?, emailid = ? where userid = ?', [userid, password, emailid, userid], checkUpdateStatus);
    response.send(JSON.stringify(statusMessage));
}
app.put('/update', bparserInit, updateUser);
 
function deleteUser(request, response){
    
    var userid = request.body.userid;
    console.log(userid);
    mysqlconnection.query('Delete from users where userid = ?', [userid], checkDeleteStatus);
    response.send(JSON.stringify(statusMessage));
}
app.post('/delete', bparserInit, deleteUser);