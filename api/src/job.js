const logger = require("logplease").create("job");
const { v4: uuidv4 } = require("uuid");
const child_process = require("child_process");
const path = require("path");
const fs = require("fs/promises");
const wait_pid = require("waitpid");

const config = require("./config");
const globals = require("./globals");

const job_states = {
    READY: Symbol("Ready to be primed"),
    PRIMED: Symbol("Primed and ready for execution"),
    EXECUTED: Symbol("Executed and ready for cleanup"),
};

let uid = 0;
let gid = 0;

class Job {
    constructor({ runtime, files, args, stdin, timeouts, memory_limits }) {
        this.uuid = uuidv4();
        this.runtime = runtime;
        this.files = files.map((file, i) => ({
            name: file.name || `file${i}.code`,
            content: file.content,
        }));

        this.args = args;
        this.stdin = stdin;
        this.timeouts = timeouts;
        this.memory_limits = memory_limits;

        this.uid = config.runner_uid_min + uid;
        this.gid = config.runner_gid_min + gid;

        uid++;
        gid++;

        uid %= config.runner_uid_max - config.runner_uid_min + 1;
        gid %= config.runner_gid_max - config.runner_gid_min + 1;

        this.state = job_states.READY;
        this.dir = path.join(
            config.data_directory,
            globals.data_directories.jobs,
            this.uuid
        );
    }

    async prime() {
        logger.info(`Priming job uuid=${this.uuid}`);
        logger.debug("Writing files to job cache");
        logger.debug(`Transfering ownership uid=${this.uid} gid=${this.gid}`);

        await fs.mkdir(this.dir, { mode: 0o700 });
        await fs.chown(this.dir, this.uid, this.gid);

        for (const file of this.files) {
            let file_path = path.join(this.dir, file.name);
            const rel = path.relative(this.dir, file_path);

            if (rel.startsWith(".."))
                throw Error(
                    `File path "${file.name}" tries to escape parent directory: ${rel}`
                );

            await fs.mkdir(path.dirname(file_path), {
                recursive: true,
                mode: 0o700,
            });
            await fs.chown(path.dirname(file_path), this.uid, this.gid);

            await fs.write_file(file_path, file.content);
            await fs.chown(file_path, this.uid, this.gid);
        }

        this.state = job_states.PRIMED;
        logger.debug("Primed job");
    }
}
