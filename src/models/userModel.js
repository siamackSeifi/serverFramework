const mongoose =require("mongoose");

const schema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "فیلد نام الزامی است"],
        lowercase: true,
        trim: true,
        minLength: 11,
        maxLength: 11
    },
    lastName: {
        type: String,
        required: [true, "فیلد نام خانوادگی الزامی است"],
        lowercase: true,
        trim: true,
    },
    nationalId: {
        type: String,
        unique: true,
        required: [true, "فیلد کد ملی الزامی است"],
        trim: true,
    },

    payments: [{
        amount: {
            type: Number,
            required: [true, "فیلد مبلغ الزامی است"],
            trim: true
        },
        description: {
            type: String,
            required: [true, "فیلد توضیحات الزامی است"],
            trim: true
        },
        resNum: {
            type: String,
            required: true,
        },
        refNum: {
            type: String
        },
        traceNo: {
            type: String
        },
        transactionStatus: {
            type: String,
            default: 'pending'
        }
    }]
});

schema.path('nationalId').validate(value => {
    return value.match(/^\d{10}$/);
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
