import mongoose from "mongoose";

mongoose.connect(process.env.DB_URL);

const db = mongoose.connection;

const handleOpen = () => console.log("๐Connected to DB");
const handleError = (error) => console.log("โDB Error", error);

db.on("error", handleError); // on = ์ฌ๋ฌ๋ฒ ๋ฐ์ํ  ์ ์์
db.once("open", handleOpen); // once = ์ค์ง ํ ๋ฒ ์ผ์ด๋จ
