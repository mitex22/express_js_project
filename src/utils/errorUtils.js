const { mongoose } = require("mongoose");

exports.getErrorMessage = (error) => {
    let message = '';

    if (error instanceof mongoose.MongooseError) {
        // така взимам конкретния ерор месидж на 0-вия индекс
        // иначе мога да изцикля с for in и да взема няколко
        message = Object.values(error.errors).at(0).message;
    } else if (error instanceof Error) {
        message = error;
    }

    return message;
}