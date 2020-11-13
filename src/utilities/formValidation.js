const Joi = require('@hapi/joi');
/*
https://github.com/sideway/joi/blob/master/API.md

any.required
string.base
string.empty
string.pattern.base
string.min
string.max
number.base
number.min
number.max
number.positive
number.precision
...
(base, empty and exact name of functions)
#label
#limit
 */


const messages = {
    any: {
        required: {
            en: "{#label} is required",
            fa: "{#label} اجباری است",
        },
    },
    string: {
        min: {
            en: "",
            fa: ""
        },
        max: {
            en: "",
            fa: ""
        },
    },
    number: {}
};

exports.attributes = (lang) => {
    return {
        fname: Joi.string().trim().min(3).max(20).required().messages({
            "any.required": messages.any.required[lang],
            "string.empty": messages.string.min[lang],
            "string.max": messages.string.max[lang],
        }),
        lname: Joi.string().trim().min(3).max(20).required(),
        nId: Joi.string().length(10).pattern(/^[0-9]{10}$/).required(),
        amount: Joi.number().min(5000).required(),
        description: Joi.string().required()
    }
};
