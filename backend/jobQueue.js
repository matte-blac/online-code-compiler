const Queue = require("bull")
const Job = require("./models/Job")
const { executeCpp } = require("./languages/executeCpp")
const { executePy } = require("./languages/executePy")
const { executeJs } = require("./languages/executeJs")
const { executeJava } = require("./languages/executeJava")

const jobQueue = new Queue("job-queue")
const NUM_WORKERS = 5

jobQueue.process(NUM_WORKERS, async ({ data }) => {
    const { id: jobId } = data
    console.log("Processing job:", jobId)

    const job = await Job.findById(jobId)
    if (!job) {
        throw new Error("Job not found")
    }

    job["startedAt"] = new Date()
    try {
        let output
        if (job.language === "cpp") {
            output = await executeCpp(job.filepath)
        } else if (job.language === "py") {
            output = await executePy(job.filepath)
        } else if (job.language === "js") {
            output = await executeJs(job.filepath)
        } else if (job.language === "java") {
            output = await executeJava(job.filepath)
        } else {
            throw new Error(`Unsupported language: ${job.language}`)
        }

        job["completedAt"] = new Date()
        job["status"] = "success"
        job["output"] = output

        await job.save()
        console.log("Job completed", job)
        // return res.json({ filepath, output })
    } catch (err) {
        job["completedAt"] = new Date()
        job["status"] = "error"
        job["output"] = JSON.stringify(err)
        await job.save()
        console.log("Job failed", job)
        // res.status(500).json({ err })
    }
})

jobQueue.on("failed", (error) => {
    console.log(error.data.id, "failed", error.failedReason)
})

const addJobToQueue = async (jobId) => {
    await jobQueue.add({ id: jobId })
}

module.exports = {
    addJobToQueue
}