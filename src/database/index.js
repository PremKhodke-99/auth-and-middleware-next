const mongoose = require("mongoose");


const connectToDB = async () => {
    const connectionUrl = "mongodb://localhost:27017/auth-middleware-next";

    mongoose
        .connect(connectionUrl)
        .then(() => console.log("Auth database connected successfully"))
        .catch((err) => console.error(err));
}

export default connectToDB;