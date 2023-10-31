//import expressjs
var expr=require('express');
//body parser is required to retrieve data sent through POST request
var bparser=require('body-parser');
//Initialize the body parser
bparserinit=bparser.urlencoded({extended:false});
const status = require('statuses');
//Initialise expressjs environment
var app=expr();

var users =[{userID:"100",FirstName:"Sanjay",LastName:"Nagaraj"},
{userID:"101",FirstName:"Suganth",LastName:"Sai"},
{userID:"102",FirstName:"Sangeetha",LastName:"Sister"}];

function retrieveUser(request,response){
    var status=false;
   var userid = request.query.uid;
   var firstName =request.query.fname;
   for(var user of users){
    if(userid==user.userID&&firstName==user.FirstName){
        status=true;
        break;
    }
    }
    if(status){
        response.send(user);
    }
    else{
        response.send("<b>No employee with ID</b>"+userid);
    }
   
}
app.get("/getUser",retrieveUser);


var visitorcount=0;
//request represents HTTP request
//response represents HTTP response


function Home(request,response){
    var resp="<html><body><b>You are in the wrong house,fool <br>";
    resp+="<a href=/welcome>Welcome page</a></body></html>";
    response.end(resp); //this also sends the response.
}
app.get('/',Home);

function welcome(request,response){
    var today=new Date();
    
    visitorcount++;
    var resp="<html><body><b>Today :"+today;
    resp +="<b><br><b>Visitor Count</b>:"+visitorcount;
    resp+="</body></html>";
response.send(resp)
}
app.get('/Welcome',welcome);

function getAll(request,response){
   response.send(users);
}
app.get('/Getall',getAll);

function deleteuser(request,response){
    var userid=request.query.id;
    var idextoremove=-1;
    for(var u=0;u<users.length;u++){
        if(userid==users[u].userID){
            idextoremove=u;
            break;
        }
    }
    if(idextoremove!==-1){
        users.splice(idextoremove,1);
        response.send("Removed User with userid"+userid);
    }
    else{
        response.send("Userid is not found");
    }
}
app.get('/Deleteuser',deleteuser);

//HTTP POST

function addNewUser(request,response){
    var user_id=request.body.uid;
    var first_Name=request.body.fname;
    var last_Name =request.body.lname;
     var rval= users.push({userID:user_id,FirstName:first_Name,LastName:last_Name});//It returns the length of the element.
    response.send("User added.Total users:"+rval);
}
app.post('/addUser',bparserinit,addNewUser);
 
//PUT-Updating
function updateuser(request, response) {
    var userid = request.body.uid;
    var updatedUser = {
        userID: userid,
        firstname: request.body.fname,
        lastname: request.body.lname,
    };
    var userIndex = -1;
    for (var i = 0; i < users.length; i++) {
        if (userid == users[i].userID) {
            userIndex = i;
            break;
        }
    }
    if (userIndex !== -1) {
        // Update the user at the specified index
        users[userIndex] = updatedUser;
        response.send("User updated successfully.");
    } else {
        response.send("User not found for update.");
    }
}
app.put("/updateuser",bparserinit,updateuser);

function feedback(){
    console.log("Server started at 8800");
    console.log("Open the browser and visit http://localhost:8800/welcome")
}

app.listen(8800,feedback);