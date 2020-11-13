const UserModel = require("../models/userModel");
const {responseGenerator} = require("../utilities/response");
exports.getAllUsers = async(req, res) => {
    try {
        console.log(res.locals.user);
        let user = await UserModel.find();
        return responseGenerator(req, res, 'success', user);
    } catch (e) {
        console.log("err: " + e);
        return res.status(500).json(e);
    }
};

exports.test = async(req, res) => {
    try {
        let user = await UserModel.stFunction(1);
        return responseGenerator(req, res, 'success', user);
    }
    catch (e) {
        return responseGenerator(req, res, e.message);
    }
};
