const express = require("express");
const router = express.Router();

router.use((req, res, next) => {
    if (["GET", "HEAD", "OPTIONS"].includes(req.method)) {
        return next();
    }

    if (!req.headers["content-type"].startsWith("application/json")) {
        return res.status(415).send({
            message: "requests must be of type application/json",
        });
    }

    next();
});

router.get("/kiba", (req, res) => {
    return res.status(200).send("All Good Here Boss");
});

module.exports = router;
