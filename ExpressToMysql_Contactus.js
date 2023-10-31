var myssql=require('mysql');//loading the driver
var exp=require('express');
 
//cross origin resource sharing
var cors=require('cors'); //enabling communication between two server.
var bpasrser=require('body-parser');
bodyParserInit=bpasrser.urlencoded({extended:false});
var app=exp();
app.use(cors());
app.use(exp.json());
 
myssqlconnection=myssql.createConnection({
    host:'localhost',
    port:3306,
    database:'world',
    user:'root',
    password:'root'
});
function testconnection(error){
    if(error==undefined){
        console.log("Connected to the database...");
    }
    else{
        console.log("Error code:"+error.errorno);
        console.log(error.message);
    }
}
 
myssqlconnection.connect(testconnection);
 
function feedback(error){
    if (error==undefined){
    console.log("Server started on port 4000");
    console.log("Open the browser and visit http://localhost:4000/getAllContact");
    }
    else{
        console.log(error.errorno);
        console.log(error.message);
    }
}
 
app.listen(4000,feedback);
 
function displayAllContacts(request,response){
    myssqlconnection.connect(testconnection);
    myssqlconnection.query('select * from contacts',processResults);
    response.send(queryresults);
}
var queryresults=undefined;
function processResults(error,results){
    queryresults=results;
    console.log(results);
}
function getcontactbyId(request,response){
    var contactid=request.query.cid;
    //Paramaterized SQL
    myssqlconnection.query('select * from contacts where id=?',[contactid],processResults);
    response.send(queryresults)
}

function insertContact(request, response) {
    // Get the data to be inserted from the request body
    const {id,firstname, lastname, emailId, address, phonenumber } = request.body;
  
    // Perform the insertion query
    myssqlconnection.query(
      'INSERT INTO contacts (id,firstname, lastname, emailId, address, phonenumber) VALUES (?,?, ?, ?, ?, ?)',
      [id,firstname, lastname, emailId, address, phonenumber],
      function (error, results) {
        if (error) {
          console.error("Error inserting contact:", error);
          response.status(500).json({ error: "Failed to insert contact" });
        } else {
          console.log("Contact inserted successfully");
          response.status(200).json({ message: "Contact inserted successfully" });
        }
      }
    );
  }
  
  function deleteContactById(request, response) {
    // Get the contact id from the query parameters
    const contactId = request.query.id;
  
    // Perform the deletion query
    myssqlconnection.query(
      'DELETE FROM contacts WHERE id = ?',
      [contactId],
      function (error, results) {
        if (error) {
          console.error("Error deleting contact:", error);
          response.status(500).json({ error: "Failed to delete contact" });
        } else {
          console.log("Contact deleted successfully");
          response.status(200).json({ message: "Contact deleted successfully" });
        }
      }
    );
  }
  
  function updateContactById(request, response) {
    // Get the contact id from the query parameters
    const contactId = request.query.id;
  
    // Get the updated data from the request body
    const { firstname, lastname, emailId, address, phonenumber } = request.body;
  
    // Perform the update query
    myssqlconnection.query(
      'UPDATE contacts SET firstname = ?, lastname = ?, emailId = ?, address = ?, phonenumber = ? WHERE id = ?',
      [firstname, lastname, emailId, address, phonenumber, contactId],
      function (error, results) {
        if (error) {
          console.error("Error updating contact:", error);
          response.status(500).json({ error: "Failed to update contact" });
        } else {
          console.log("Contact updated successfully");
          response.status(200).json({ message: "Contact updated successfully" });
        }
      }
    );
  }
  
 
app.get('/getAllContacts',displayAllContacts);
app.get('/getbyId',getcontactbyId);
app.post('/insert', insertContact); 
app.delete('/delete', deleteContactById);
app.put('/update', updateContactById);
