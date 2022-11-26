const fs = require("fs/promises");
const fsSync = require("fs");
const path = require("path");
const chalk = require("chalk");

const file = {
    createFile: async(filePath, fileContent = "init") => {
        try {
            console.log(chalk.yellowBright("Command execution started"));
            await fs.writeFile(path.resolve(__dirname, filePath), fileContent);
        } catch (err) {
            console.log(chalk.red(`Execution failed due to error ${err}`));
        } finally {
            console.log(chalk.blueBright("Command execution finished"));
        }
    },
    writeIntoFile: async(filePath, fileContent = "") => {
        try {
            console.log(chalk.yellowBright("Command execution started"));
            await fs.appendFile(path.resolve(__dirname, filePath), fileContent);
        } catch (err) {
            console.log(chalk.red(`Execution failed due to error ${err}`));
        } finally {
            console.log(chalk.blueBright("Command execution finished"));
        }
    },
    readFromFile: async filePath => {
        try {
            console.log(chalk.yellowBright("Command execution started"));
            return await fs.readFile(path.resolve(__dirname, filePath), { encoding: "utf-8" });
        } catch (err) {
            console.log(chalk.red(`Execution failed due to error ${err}`));
        } finally {
            console.log(chalk.blueBright("Command execution finished"));
        }
    }
};

const dir = {
    createDir: async dirPath => {
        try {
            console.log(chalk.yellowBright("Command execution started"));
            const newDirPath = path.resolve(__dirname, dirPath);
            if (!fsSync.existsSync(newDirPath)) {
                await fs.mkdir(newDirPath);
                await file.createFile(path.resolve(newDirPath, "init.txt"), "New dir initialized");
            } else await file.createFile(path.resolve(newDirPath, "init.txt"), "Already existing dir re-initialized");
        } catch (err) {
            console.log(chalk.red(`Execution failed due to error ${err}`));
        } finally {
            console.log(chalk.blueBright("Command execution finished"));
        }
    }
};

const common = {
    remove: async _path => {
        try {
            console.log(chalk.yellowBright("Command execution started"));
            await fs.rm(path.resolve(__dirname, _path), { recursive: true });
        } catch (err) {
            console.log(chalk.red(`Execution failed due to error ${err}`));
        } finally {
            console.log(chalk.blueBright("Command execution finished"));
        }
    },
    truncate: async _path => {
        try {
            console.log(chalk.yellowBright("Command execution started"));
            await fs.truncate(path.resolve(__dirname, _path));
        } catch (err) {
            console.log(chalk.red(`Execution failed due to error ${err}`));
        } finally {
            console.log(chalk.blueBright("Command execution finished"));
        }
    },
    copy: async(src, dest) => {
        try {
            console.log(chalk.yellowBright("Command execution started"));
            const oldPath = path.resolve(__dirname, src);
            const newPath = path.resolve(__dirname, dest);
            await fs.copyFile(oldPath, newPath);
        } catch (err) {
            console.log(chalk.red(`Execution failed due to error ${err}`));
        } finally {
            console.log(chalk.blueBright("Command execution finished"));
        }
    },
    rename: async(src, dest) => {
        try {
            console.log(chalk.yellowBright("Command execution started"));
            const oldPath = path.resolve(__dirname, src);
            const newPath = path.resolve(__dirname, dest);
            await fs.rename(oldPath, newPath);
        } catch (err) {
            console.log(chalk.red(`Execution failed due to error ${err}`));
        } finally {
            console.log(chalk.blueBright("Command execution finished"));
        }
    }
};

const db = {
    writeIntoDB: async reqFile => {
        const DB = require("../db/db.json");
        const database = Array.isArray(DB) ? DB : [];
        const id = Date.now().toString();
        const reqFileEntries = Object.entries(JSON.parse(reqFile)).flat(1);
        database.push({ id, [reqFileEntries[0]]: reqFileEntries[1] });
        await file.createFile("../db/db.json", JSON.stringify([...new Set(database)]));
    },
    readFromDB: async() => {
        const result = await file.readFromFile("../db/db.json");
        return Array.isArray(JSON.parse(result)) ? JSON.parse(result) : [];
    }
};

module.exports = {
    file,
    dir,
    common,
    db
};
