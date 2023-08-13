const UserModel = require("../models/userModel");
const {responseGenerator} = require("../utilities/response");
exports.getAllUsers = async(req, res) => {
    try {
        console.log(res.locals.user);
        let user = await UserModel.find();
        return responseGenerator(req, res, 'success', user);
    } catch (e) {
        console.log(e.message);
        return responseGenerator(req, res, 'internalServerError');
    }
};

exports.addUser = async(req, res) => {
    try {
        let user = await UserModel.create(req.body);
        return responseGenerator(req, res, 'success', user);
    } catch (e) {
        console.log(e.message);
        return responseGenerator(req, res, 'internalServerError');
    }
};

exports.test = async(req, res) => {
    try {
        let user = await UserModel.stFunction(1);
        return responseGenerator(req, res, 'success', user);
    }
    catch (e) {
        console.log(e.message);
        return responseGenerator(req, res, 'internalServerError');
    }
};
