const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    fname: {
        type: String,
        required: [true, "فیلد نام الزامی است"],
        lowercase: true,
        trim: true,
        minLength: 3,
        maxLength: 20
    },
    lname: {
        type: String,
        required: [true, "فیلد نام خانوادگی الزامی است"],
        lowercase: true,
        trim: true,
        minLength: 3,
        maxLength: 50
    },

    amount: {
        type: Number,
        required: [true, "فیلد مبلغ الزامی است"],
        trim: true
    },
    description: {
        type: String,
        required: [true, "فیلد توضیحات الزامی است"],
        trim: true
    }
});

//custom static functions
schema.statics.stFunction = async function (param) {
    try {

        let user = await this.findOne({fname: param}).exec();
        if (user) {
            return user;
        } else {
            // TODO: find alternative approach to get rid of the warning
            throw new Error('userNotExist');
        }
    } catch (error) {
        throw error;
    }
};

const Model = mongoose.model("Payment", schema);
module.exports = Model;
