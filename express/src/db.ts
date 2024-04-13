import mongoose from "mongoose";

function connectToDB() {
    mongoose.connect(
        "mongodb+srv://Ethan:hoops@hooperai.w5cj9wg.mongodb.net/?retryWrites=true&w=majority&appName=HooperAI",
    //   {
    //     useNewUrlParser: true,
    //     // useFindAndModify: false,
    //     useUnifiedTopology: true
    //   }
    ).then(() => console.log("Database connected")).catch(() => console.log("Database connect error"));
}

export default connectToDB;