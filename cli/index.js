#!/usr/bin/env node

const axios = require("axios").default;

const axios_instance = argv => {
    argv.axios = axios.create({
        baseURL: argv["kiba-url"],
        headers: {
            "Content-Type": "application/json",
        },
    });

    return argv;
};

require("yargs")(process.argv.slice(2))
    .option("kiba-url", {
        alias: ["u"],
        default: "http://127.0.0.1:2000",
        desc: "Kiba API URL",
        string: true,
    })
    .middleware(axios_instance)
    .scriptName("kiba")
    .commandDir("commands")
    .demandCommand()
    .help()
    .wrap(72).argv;
