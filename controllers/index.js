const yargs = require("yargs");
const chalk = require("chalk");
const { db } = require("./commands");
const { writeIntoDB, readFromDB, removeFromDB, amendInDB } = db;

yargs.command({
    command: "add",
    builder: {
        title: {
            type: "string",
            description: "new note title",
            demandOption: true
        }
    },
    description: "add new note to list",
    async handler({ title }) {
        await writeIntoDB(JSON.stringify({ task: title }));
    }
});

yargs.command({
    command: "list",
    builder: {
        flag: {
            type: "string",
            description: "flag for output identification: for console output please set flag value to 'console'",
            demandOption: false
        }
    },
    description: "print all notes",
    async handler({ flag }) {
        const result = await readFromDB(flag);
        console.log(chalk.magenta(result));
    }
});

yargs.command({
    command: "remove",
    builder: {
        id: {
            type: "string",
            description: "id of note to be removed",
            demandOption: true
        }
    },
    description: "remove note by id",
    async handler({ id }) {
        await removeFromDB(id);
    }
});

yargs.command({
    command: "edit",
    builder: {
        id: {
            type: "string",
            description: "note id",
            demandOption: true
        },
        title: {
            type: "string",
            description: "note title",
            demandOption: true
        }
    },
    description: "edit note by id",
    async handler({ id, title }) {
        await amendInDB(id, title);
    }
});

yargs.parse();
