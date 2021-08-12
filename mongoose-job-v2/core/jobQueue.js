const Queue = require("bull");

const Job = require("../models/Job");
const { executeCpp } = require("./executeCpp");
const jobQueue = new Queue("job-runner-queue");
const NUM_WORKERS = 5;

jobQueue.process(NUM_WORKERS, async ({ data }) => {
  const jobID = data.id;
  const job = Job.findById(jobID);
  if (job === undefined) {
    throw Error(`Can't find Job with id ${jobID}`);
  }
  try {
      let output;
      job["startedAt"] = new Date()
      if (job.language === "cpp") 
  }
});
