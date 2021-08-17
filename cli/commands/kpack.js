exports.command = "kpack";
exports.aliases = ["pkg"];
exports.describe = "Package Manager";

exports.builder = yargs => yargs.commandDir("kpack_commands").demandCommand();
