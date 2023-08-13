const express = require("express");
const apiRoutes = require("./src/routes/api");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const cors = require("./src/middlewares/cors");
// const auth = require("./src/middleware/auth");
const errorHandler = require("./src/middlewares/errors");

// make connection to MongoDB database
require("./src/models/_Connection");

// search object key value in array
Array.prototype.searchObjectIndex = function (key, value) {
    for (let i = 0; i < this.length; i++) {
        if (this[i][key] === value) {
            return i;
        }
    }
    return -1;
};
Array.prototype.searchStringIndex = function (key, value) {
    for (let i = 0; i < this.length; i++) {
        if (this[i][key] && value && this[i][key].toString() === value.toString()) {
            return i;
        }
    }
    return -1;
};
Array.prototype.searchStringIndexes = function (key, value) {
    const indexes = [];
    for (let i = 0; i < this.length; i++) {
        if (this[i][key] && value && this[i][key].toString() === value.toString()) {
            indexes.push(i);
        }
    }
    return indexes;
};
Array.prototype.searchStringObject = function (key, value) {
    for (let i = 0; i < this.length; i++) {
        if (this[i][key] && value && this[i][key].toString() === value.toString()) {
            return this[i];
        }
    }
    return null;
};
Array.prototype.searchObject = function (key, value) {
    for (let i = 0; i < this.length; i++) {
        if (this[i][key] === value) {
            return this[i];
        }
    }
    return null;
};
Array.prototype.searchObjects = function (key, value) {
    let tmp = [];
    for (let i = 0; i < this.length; i++) {
        if (this[i][key] === value) {
            tmp.push(this[i])
        }
    }
    return tmp;
};
Array.prototype.filterField = function (key) {
    let tmp = [];
    for (let i = 0; i < this.length; i++) {
        if (this[i][key]) {
            tmp.push(this[i][key])
        }
    }
    return tmp;
};


//Api server create and config
const api = express();

//secure my api's
api.use(helmet());
api.use(express.json({limit: process.env.PAYLOAD_LIMIT}));
api.use(express.urlencoded({extended: true, limit: process.env.PAYLOAD_LIMIT}));
api.use(cookieParser());

api.use("/uploads", /*auth,*/ express.static("uploads"));
api.use(cors);
api.use(apiRoutes);

//error handling for api's
api.use(errorHandler);


// serving static files
api.use(express.static(__dirname + "/public"));
api.set("views", __dirname + "/public/views");
api.engine('html', require('ejs').renderFile);
api.set("view engine", "html");
api.get("/", (req, res) => res.send(`Nothing to show`));

module.exports.api = api;

