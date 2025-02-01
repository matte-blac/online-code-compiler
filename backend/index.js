const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")

const { generateFile } = require('./generateFile')
const { executeCpp } = require("./languages/executeCpp")
const { executePy } = require("./languages/executePy")
const Job = require("./models/Job")
const { addJobToQueue } = require("./jobQueue")

main().catch(err => console.log(err));

async function main() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/compilerapp');
        console.log("Connected to database successfully")
    } catch (error) {
        console.error("Error connecting to database:", error.message)
        process.exit(1)
    }
}

const app = express()

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get("/status", async (req, res) => {
    const jobId = req.query.id
    console.log("status requested", jobId)

    if (jobId == undefined) {
        return res.status(400).json({ success: false, error: "missing id query param" })
    }

    try {
        const job = await Job.findById(jobId)

        if (job === undefined) {
            return res.status(404).json({ success: false, error: "invalid job id" })
        }

        return res.status(200).json({ success: true, job })

    } catch (err) {
        return res.status(400).json({ success: false, error: JSON.stringify(err) })
    }

})

app.post("/run", async (req, res) => {
    const { language = "cpp", code } = req.body
    console.log(language, code.length)

    if (code === undefined) {
        return res.status(400).json({ success: false, error: "Empty code body" })
    }

    let job

    try {
        const filepath = await generateFile(language, code)

        job = await new Job({ language, filepath }).save()
        const jobId = job["_id"]
        console.log("Job created:", job)

        res.status(201).json({ success: true, jobId })

        await addJobToQueue(jobId)
    } catch (err) {
        if (job) {
            job["completedAt"] = new Date()
            job["status"] = "error"
            job["output"] = JSON.stringify(err)
            await job.save()
        }
        console.log("Error during job creation:", err)
        res.status(500).json({ success: false, error: "Failed to create job" })
    }
})

app.listen(5000, () => {
    console.log(`Listening on port 5000!`)
})