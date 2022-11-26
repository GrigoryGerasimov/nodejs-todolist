const http = require("http");
const path = require("path");
const chalk = require("chalk");
const { file, db } = require("../controllers/commands");

const port = 3000;
const startPagePath = path.resolve(__dirname, "../pages/index.ejs");
const { readFromFile } = file;
const { writeIntoDB } = db;

const server = http.createServer(async(req, res) => {
    const startPage = await readFromFile(startPagePath);
    switch (req.method) {
        case "GET": {
            res.setHeader("Content-Type", "text/html");
            res.writeHead(200);
            res.end(startPage);
            break;
        }
        case "POST": {
            const tempBody = [];
            req.on("data", data => {
                tempBody.push(Buffer.from(data).toString("utf-8"));
            });
            req.on("end", async() => {
                const finalBody = tempBody.map(item => {
                    const key = item.slice(0, item.indexOf("="));
                    const value = item.slice(item.indexOf("=") + 1).replace(/\+/g, " ");
                    return JSON.stringify({ [key]: value });
                });
                await writeIntoDB(finalBody);
            });
            res.setHeader("Content-Type", "text/html");
            res.writeHead(200);
            res.end(startPage);
        }
    }
});

server.listen(port, () => {
    console.log(chalk.greenBright(`Server has started listening on port ${port}`));
});
