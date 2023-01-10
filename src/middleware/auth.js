const regdata = require("../models/regdata")
const authPage = (permission) => {
    return (req, res, next) => {
        const registration = regdata.find()
        // const userPermission = req.body._isActive

        if (permission == false) {
            console.log("registration", registration);
            next()
        } else {
            console.log("permission", registration);
            return res.status(401).json("You dont have permission")
        }
    }
}

module.exports = { authPage };