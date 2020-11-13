const jwt = require('jsonwebtoken');
const UserModel = require("../models/userModel");
const {responseGenerator} = require("../utilities/response");

exports.authentication = async (req, res, next) => {
    // return next();
    try {
        if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
            const token = req.headers.authorization.replace("Bearer ", "");
            const decoded = await jwt.verify(token, process.env.JWT_SECRET);
            const user = await UserModel.findOne({
                _id: decoded._id,
                "tokens.token": token
            }).populate("avatar");
            if (!user) {
                return responseGenerator(req, res, 'unauthorizedUser');
            }
            if (user.active === false) {
                return responseGenerator(req, res, 'inactiveUser');
            }
            if (req.headers.pid) {
                // TODO: update pid for this token
                res.locals.user = user;
                next();
            }

        } else {
            return responseGenerator(req, res, 'unauthorizedUser');
        }
    } catch (e) {
        return responseGenerator(req, res, 'internalServerError');
    }
};
