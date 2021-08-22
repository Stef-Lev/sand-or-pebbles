const Yup = require('yup');
const ExpressError = require('./ExpressError');

const validate = async (req, res, next) => {
    const validationSchema = Yup.object().shape({
        title: Yup.string("Enter the beach title").required("Title is required"),
        location: Yup.string("Enter the beach location").required(
            "Location is required"
        ),
        description: Yup.string("Enter the beach description").max(280, "Description must be up to 280 characters"),
        imageUrl: Yup.string("Enter the beach image").url("Please use a valid url"),
    }).required();

    try {
        const validData = await validationSchema.validate(req.body);
        req.validData = validData;
        return next();
    } catch (error) {
        return res.status(400).json(new ExpressError('error', error.name, error.message, 400));
    }
};
module.exports = validate;