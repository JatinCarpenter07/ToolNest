const fs = require('fs');

function logTheRequest(req, res, next) {
    fs.appendFile("log.txt", `Time : ${Date.now()} || Method : ${req.method} || Path : ${req.path}\n`,
        (err, data) => {
            next();
        }
    );
}

function invalidRequest(req, res) {
    return res.status(404).send("Invalid Path : Resource not Found")
}

module.exports = { logTheRequest, invalidRequest };