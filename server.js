const express = require("express");
const app = express();
app.use(express.static("client"));

app.get("/", (req, res) => {
  res.send("index.html");
});

var PORT = process.env.PORT || 8000;
app.listen(PORT);
console.log(`Listening on port ${PORT}`);
