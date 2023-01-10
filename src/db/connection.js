const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost:27017/user_management_system_api").then((res) => {
    console.log("connection is successfull ....");

}).catch((err) => {
    console.log(err);
})