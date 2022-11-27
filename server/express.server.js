const express = require("express");
const chalk = require("chalk");
const path = require("path");
const fsSync = require("fs");
const ejs = require("ejs");
const { db } = require("../controllers/commands");
const { writeIntoDB, readFromDB, removeFromDB } = db;

const port = process.env.PORT ?? 3000;
const startPagePath = path.resolve(__dirname, "../pages/index.ejs");
const startPageTemplate = {
    btnCreateTask: "Create Task",
    btnDeleteTask: "Delete Task",
    btnDownloadPage: "Download",
    createdLabel: "New task successfully created",
    taskCreated: false
};

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
        ...startPageTemplate,
        taskList: await readFromDB()
    });
});

app.get("/download", async(req, res) => {
    const output = path.parse(startPagePath);
    if (output.ext !== ".html") {
        const downloadDirPath = path.resolve(__dirname, "../public");
        if (!fsSync.existsSync(downloadDirPath)) fsSync.mkdirSync(downloadDirPath);
        fsSync.copyFileSync(path.resolve(output.dir, output.base), path.resolve(output.dir, "../public", output.base));
        if (output.ext === ".ejs") {
            const file = fsSync.readFileSync(path.resolve(output.dir, "../public", output.base), { encoding: "utf-8" });
            const compiledResult = ejs.compile(file)({
                btnCreateTask: "Create Task",
                btnDeleteTask: "Delete Task",
                btnDownloadPage: "Download",
                createdLabel: "New task successfully created",
                taskCreated: false,
                taskList: await readFromDB()
            });
            fsSync.writeFileSync(path.resolve(output.dir, "../public", output.base), compiledResult);
        }
        const newOutputBase = output.base.replace(/\.\S+$/g, ".html");
        fsSync.renameSync(path.resolve(output.dir, "../public", output.base), path.resolve(output.dir, "../public", newOutputBase));
        output.dir = path.resolve(output.dir, "../public");
        output.base = newOutputBase;
        output.ext = ".html";
    }
    const outputPage = path.format(output);
    res.download(outputPage);
});

app.post("/", async(req, res) => {
    await writeIntoDB(JSON.stringify(req.body));
    res.render(startPagePath, {
        ...startPageTemplate,
        taskList: await readFromDB(),
        taskCreated: true
    });
});

app.delete("/:id", async(req, res) => {
    const id = req.params.id;
    await removeFromDB(id);
    res.render(startPagePath, {
        ...startPageTemplate,
        taskList: await readFromDB()
    });
});

app.listen(port, () => {
    console.log(chalk.greenBright(`Server has started listening on port ${port}`));
});
