const express = require("express");
const chalk = require("chalk");
const path = require("path");
const { db } = require("../controllers/commands");
const { writeIntoDB, readFromDB, removeFromDB } = db;

const port = 3000;
const startPagePath = path.resolve(__dirname, "../pages/index.ejs");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "../pages"));

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(express.static(path.resolve(__dirname, "../public")));

app.get("/", async(req, res) => {
    res.render(startPagePath, {
        btnCreateTask: "Create Task",
        btnDeleteTask: "Delete Task",
        taskList: await readFromDB(),
        taskCreated: false
    });
});

app.post("/", async(req, res) => {
    await writeIntoDB(JSON.stringify(req.body));
    res.render(startPagePath, {
        btnCreateTask: "Create Task",
        btnDeleteTask: "Delete Task",
        taskList: await readFromDB(),
        taskCreated: true,
        createdLabel: "New task successfully created"
    });
});

app.delete("/:id", async(req, res) => {
    const id = req.params.id;
    await removeFromDB(id);
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
