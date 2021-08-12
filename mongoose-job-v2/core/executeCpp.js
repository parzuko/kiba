const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");
const { stderr } = require("process");

const outputPath = path.join(__dirname, "run");

if (!fs.existsSync(outputPath)) {
  fs.mkdirSync(outputPath, { recursive: true });
}

const executeCpp = (filepath) => {
  const jobID = path.basename(filepath).split(".")[0];
  const outPath = path.join(outputPath, `${jobID}.out`);

  return new Promise((resolve, reject) => {
    exec(`g++ ${filepath} -o ${outPath} && cd ${outputPath} && ./${jobID}`),
      (error, stdout, stdin) => {
        error && reject({ error, stderr });
        stderr && reject(stderr);
        resolve(stdout);
      };
  });
};

module.exports = {
  executeCpp,
};
