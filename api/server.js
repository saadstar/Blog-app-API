const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const connectDB = require("./config/mongoDB");
const cors = require("cors");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const categoryRoute = require("./routes/categories");
const multer = require("multer");

const PORT = 3500 || process.env.PORT;
connectDB();

app.use(express.json());
app.use(cors());

// multer 
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "images");
    },
    filename: (req, file, cb) => {
        cb(null, "hello file.png");
    }
});
const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("Photo uploaded successfuly.");
});


app.use("/api/auth/", authRoute);
app.use("/api/user/", userRoute);
app.use("/api/post/", postRoute);
app.use("/api/category/", categoryRoute);


app.listen(PORT,() => {
    console.log(`Server Running on Port ${PORT}`);
})