const express = require("express");
const connectDB = require("./config/db");
const multer = require("multer");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;

//Connect DB
connectDB();

//Init middleware
app.use(express.json({ extended: false }));
app.use("/images", express.static(path.join(__dirname, "/images")));

app.get("/", (req, res) => {
  res.send(`API running`);
});

// multer for blogpost
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded");
});

app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/prices", require("./routes/api/prices"));
app.use("/api/wallet", require("./routes/api/wallet"));
app.use("/api/posts", require("./routes/api/posts"));

app.listen(PORT, () => console.log(`Server on port ${PORT}`));
