const express = require("express");
const chalk = require("chalk");
const path = require("path");
const { db } = require("../controllers/commands");

const { readFromDB } = db;

const port = 3000;

const app = express();

app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "../pages"));

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(express.static(path.resolve(__dirname, "../public")));

app.get("/", async(req, res) => {
    const startPagePath = path.resolve(__dirname, "../pages/index.ejs");
    res.render(startPagePath, {
        btnCreateTask: "Create Task",
        btnDeleteTask: "Delete Task",
        taskList: await readFromDB(),
        taskCreated: false
    });
});

app.listen(port, () => {
    console.log(chalk.greenBright(`Server has started listening on port ${port}`));
});
