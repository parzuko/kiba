#!/usr/bin/env node
require("nocamel");
const express = require("express");
const body_parser = require("body-parser");

const app = express();

(async () => {
    app.use(body_parser.urlencoded({ extended: true }));
    app.use(body_parser.json());

    app.use((err, req, res, next) => {
        return res.status(400).send({
            stack: err.stack,
        });
    });

    const kiba_api = require("./api/kiba");
    app.use("/api", kiba_api);

    app.use((req, res, next) => {
        return res.status(404).send({ message: "Not Found" });
    });

    app.listen(2000, () => {
        console.log("API server started on port 2000");
    });
})();
