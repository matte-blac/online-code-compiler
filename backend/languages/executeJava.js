const { exec } = require('child_process')
const path = require('path')

const executeJava = (filepath) => {
    const jobId = path.basename(filepath).split(".")[0]
    const dirPath = path.dirname(filepath)

    return new Promise((resolve, reject) => {
        exec(`javac ${filepath} && cd ${dirPath} && java ${jobId}`,
            (error, stdout, stderr) => {
                error && reject({ error, stderr })
                stderr && reject(stderr)
                resolve(stdout)
            })
    })
}

module.exports = {
    executeJava,
}