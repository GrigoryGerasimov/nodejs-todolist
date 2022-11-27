const { db } = require("../controllers/commands");
const { readFromDB, writeIntoDB, removeFromDB, amendInDB } = db;

const getFromDB = async(req, res) => {
    const response = await readFromDB();
    res.status(200).json(response);
};

const postIntoDB = async(req, res) => {
    const response = await writeIntoDB(req.body);
    res.status(201).json(response);
};

const deleteFromDB = async(req, res) => {
    await removeFromDB(req.params.id);
    res.status(200).json(`DB entry has been successfully deleted at ID ${req.params.id}`);
};

const putIntoDB = async(req, res) => {
    const { id, content } = req.body;
    await amendInDB(id, content);
    res.status(200).json(`DB entry has been successfully updated at ID ${req.params.id}`);
};

module.exports = {
    getFromDB,
    postIntoDB,
    deleteFromDB,
    putIntoDB
};
