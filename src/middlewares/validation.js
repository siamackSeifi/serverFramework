const userSchemas = require("../middlewares/validations/user");
const {responseGenerator} = require("../utilities/response");

getSchemaObject = (schema, lang) => {
    const schemaObjects = {
        addUser: userSchemas.addUser(lang)
    };
    return schemaObjects[schema];
};

exports.validation = (schema, property) => {
    return (req, res, next) => {
        // return next();
        let Schema = getSchemaObject(schema, req.headers.language);
        const {error} = Schema.validate(req[property]);
        const valid = error == null;
        if (valid) {
            next();
        } else {
            const {details} = error;
            const message = details.map(i => i.message).join(',');
            return responseGenerator(req, res, 'validationError', null, message);
        }
    }
}
