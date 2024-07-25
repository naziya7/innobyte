require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");
const authRoute = require("./Routes/AuthRoute");
const MONGO_URL = process.env.MONGO_URL;
const PORT = process.env.PORT || 3000;
const bodyParser = require("body-parser");
const blogPosts = require("./Routes/blogPosts");
const commentRoutes = require("./Routes/comments");
mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
   
  })
  .then(() => console.log("MongoDB is connected successfully"))
  .catch((err) => console.error(err));

app.listen(PORT, (err) => {
  if (err) {
    console.error("Failed to start server:", err);
    return;
  }
  console.log(`Server is listening on port ${PORT}`);
});

// app.use(
//   cors({
//     origin: ["https://mern-blog-client-t6s3.onrender.com/"],
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     credentials: true,
//   })
// );
const corsOptions = {
  origin:'https://mern-blog-client-t6s3.onrender.com/',
  optionsSuccessStatus:200,
  credentials: true,
};
app.use(cors(corsOptions))

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/", authRoute);
app.use("/api/blog", blogPosts);
app.use("/api/comments", commentRoutes);
