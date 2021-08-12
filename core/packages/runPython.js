// imports
const fs = require("fs");
const exec = require("child_process").exec;
const { v4: v4 } = require("uuid");
const env = process.env.NODE_ENV;

// local imports
const config = require("./config");
const configPath = config.codePath;
const timeOut = config.timeOut;
const FILE_EXTENSION = ".py";
const LANGUAGE = "python3";

// global variables
const FILENAME = v4();
const FULLNAME = configPath + FILENAME + FILE_EXTENSION;

const validate = (str) => {
  reg1 = RegExp(/\bimport\W+(?:\w+\W+){0,}(?:os|subprocess|importlib)\b/g);
  words = ["open(", "os"]; // hardcoding is only option

  const lowerString = str.toLowerCase();
  for (const negativeWord of words) {
    if (lowerString.includes(negativeWord.toLowerCase())) {
      return false;
    }
  }

  if (str.match(reg1)) {
    return false;
  }
  return true;
};

const runCode = (code, func) => {
  if (!validate(code)) {
    func({
      ERROR: "Not Allowed!",
    });
  }

  fs.writeFile(FULLNAME, code, writeFileAndExecute(func));
};

const writeFileAndExecute = (error, func) => {
  if (error) {
    console.log("Error In Creation: ", error);
    return;
  }
  const runCommand = LANGUAGE + FULLNAME;
  exec(
    runCommand,
    { timeout: timeOut },
    handleExecute(error, stdout, stderr, func)
  );
};

const handleExecute = (error, stdout, stderr, func) => {
  if (error) {
    func({ error: stderr }, FULLNAME);
  } else {
    console.log("Executed");
    console.log(stdout);
    func({ stdout: stdout }, FULLNAME);
  }
};

const run = (code, func) => {
  runCode(code, function (data, file = null) {
    if (file) {
      fs.unlink(file, (err) => {
        if (err) {
          console.log(err);
        }
      });
    }
    func(data);
  });
};

module.exports = { run: run };
