const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();

app.use(cors());
app.use(express.json());

app.post("/register", (req, res) => {
  try {
    const newStudent = req.body;

    let students = [];

    if (fs.existsSync("students.json")) {
      const data = fs.readFileSync("students.json");
      students = JSON.parse(data);
    }

    students.push(newStudent);

    fs.writeFileSync("students.json", JSON.stringify(students, null, 2));

    res.status(200).send("Student Registered Successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});