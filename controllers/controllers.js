const yargs = require("yargs");
const {
    file,
    dir,
    common
} = require("./commands");

const { createFile, readFromFile } = file;
const { createDir } = dir;
const { remove, truncate, copy, rename } = common;

yargs.command({
    command: "createfile",
    builder: {
        path: {
            type: "string",
            description: "new file path",
            demandOption: true
        },
        content: {
            type: "string",
            description: "new file content",
            demandOption: false
        }
    },
    description: "create new file",
    async handler({ path, content }) {
        await createFile(path, content);
    }
});

yargs.command({
    command: "createdir",
    builder: {
        path: {
            type: "string",
            description: "new dir path",
            demandOption: true
        }
    },
    description: "create new dir",
    async handler({ path }) {
        await createDir(path);
    }
});

yargs.command({
    command: "readfile",
    builder: {
        path: {
            type: "string",
            description: "file path to read from",
            demandOption: true
        }
    },
    description: "read from file",
    async handler({ path }) {
        await readFromFile(path);
    }
});

yargs.command({
    command: "remove",
    builder: {
        path: {
            type: "string",
            description: "path to remove at",
            demandOption: true
        }
    },
    description: "remove file or dir",
    async handler({ path }) {
        await remove(path);
    }
});

yargs.command({
    command: "truncate",
    builder: {
        path: {
            type: "string",
            description: "path to truncate at",
            demandOption: true
        }
    },
    description: "truncate file",
    async handler({ path }) {
        await truncate(path);
    }
});

yargs.command({
    command: "copy",
    builder: {
        src: {
            type: "string",
            description: "path to copy from",
            demandOption: true
        },
        dest: {
            type: "string",
            description: "path to copy into",
            demandOption: true
        }
    },
    description: "copy file",
    async handler({ src, dest }) {
        await copy(src, dest);
    }
});

yargs.command({
    command: "rename",
    builder: {
        src: {
            type: "string",
            description: "path to rename from",
            demandOption: true
        },
        dest: {
            type: "string",
            description: "path to rename for",
            demandOption: true
        }
    },
    description: "rename file or dir",
    async handler({ src, dest }) {
        await rename(src, dest);
    }
});

yargs.parse();
