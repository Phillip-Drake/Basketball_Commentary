import mongoose from "mongoose";

function connectToDB() {
  mongoose
    .connect(
      "mongodb+srv://Ethan:hoops@hooperai.w5cj9wg.mongodb.net/?retryWrites=true&w=majority&appName=HooperAI"
    )
    .then(() => console.log("Database connected"))
    .catch((err) => console.error("Database connect error:", err));
}

export default connectToDB;
