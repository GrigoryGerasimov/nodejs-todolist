const { Router } = require("express");
const { getFromDB, postIntoDB, deleteFromDB, putIntoDB } = require("./api_server");
const router = Router();

router.get("/api/tasks", getFromDB);
router.post("/api/tasks", postIntoDB);
router.put("/api/tasks/:id", putIntoDB);
router.delete("/api/tasks/:id", deleteFromDB);

module.exports = {
    router
};
