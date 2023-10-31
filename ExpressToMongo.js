const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express(); // Initialize Express

dotenv.config(); // Load environment variables from a .env file if needed

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/local?directConnection=true&serverSelectionTimeoutMS=2000&appName=ExpressToMongo", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('Connected to the database...');
    })
    .catch((error) => {
        console.error('Unable to connect. Check the URL.');
        console.error(error);
    });

// Define the structure of the collection
const userSchema = new mongoose.Schema({
    userId: String,
    password: String,
    emailId: String
});

// Link the structure with the name of the actual collection in the database.
// Actual collection name is "users".
const UsersData = mongoose.model('Users', userSchema);

// Function to add a user
function addUser(request, response) {
    const { userId, password, emailId } = request.body;
    const udata = new UsersData({ userId, password, emailId });

    udata.save()
        .then((data) => {
            console.log('Inserted Successfully');
            response.send('<b>Inserted successfully</b>');
        })
        .catch((error) => {
            console.error(error);
            response.send('Unable to insert the data');
        });
}

app.post('/addUser', addUser);

// Function to get all users
function getAllUsers(request, response) {
    UsersData.find()
        .then((data) => {
            console.log(data);
            response.send(data);
        })
        .catch((error) => {
            console.error(error);
            response.send('Could not retrieve the data');
        });
}

app.get('/allUsers', getAllUsers);

// Function to update user information
function updateUser(request, response) {
    const userIdToUpdate = request.body.userId; // Assuming you have a unique identifier for users, like userId
    const updateData = {
        password: request.body.password,
        emailId: request.body.emailId
    };

    UsersData.findOneAndUpdate(
        { userId: userIdToUpdate }, // Filter by userId
        updateData, // New data to update
        { new: true } // Return the updated document
    )
        .then((updatedUser) => {
            if (updatedUser) {
                console.log('Updated Successfully');
                response.send('<b>Updated successfully</b>');
            } else {
                console.log('User not found');
                response.send('User not found');
            }
        })
        .catch((error) => {
            console.error(error);
            response.send('Unable to update user data');
        });
}

app.put('/updateUser', updateUser);

// Function to delete a user
function deleteUser(request, response) {
    const userIdToDelete = request.body.userId; // Assuming you have a unique identifier for users, like userId
    
    UsersData.findOneAndRemove({ userId: userIdToDelete })
        .then((deletedUser) => {
           console.log("User deleted successfully")
        })
        .catch((error) => {
            console.error(error);
            response.send('Unable to delete user');
        });
}

app.delete('/deleteUser', deleteUser);

const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`Listening on port ${port}.`);
});
