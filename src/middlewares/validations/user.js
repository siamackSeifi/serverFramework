const Joi = require('@hapi/joi');
const formValidationAttributes = require("../../utilities/formValidation").attributes;
exports.addUser = (lang) => {
    return Joi.object({
        fname: formValidationAttributes(lang).fname,
        lname: formValidationAttributes(lang).lname,
        nId: formValidationAttributes(lang).nId,
        amount: formValidationAttributes(lang).amount,
        description: formValidationAttributes(lang).description
    });
}
