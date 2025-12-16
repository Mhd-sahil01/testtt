const http = require("http");
const fs = require("fs");
const port = 3001;

// function to send the statusCode and (message or data) as response
function sendRes(res, statusCode, msg) {
    res.statusCode = statusCode;
    res.end(msg);
}

// create a server
const server = http.createServer((req, res) => {
    const { url, method } = req // store url and method

    const data = "hello!"; // input (used as input in /new route)
    const update = " this is another message"; // input (used as input in /update route)

    // Route that display the data in the file
    if (url == "/show" && method == "GET") {
        fs.readFile("test.txt", "utf8", (err, data) => {
            if (err) return sendRes(res, 404, "Not found");
            sendRes(res, 200, data);
        })
    }

    // Route to create
    else if (url == "/new" && method == "POST") {
        fs.writeFile("test.txt", data, (err) => {
            if (err) return sendRes(res, 404, "Not found");
            sendRes(res, 200, "file created");
        })
    }

    // Route to delete file
    else if (url == "/delete" && method == "DELETE") {
        fs.unlink("test.txt", (err) => {
            if (err) return sendRes(res, 404, "Not found");
            sendRes(res, 200, "file deleted");
        })
    }

    // Route to update the file
    else if (url == "/update" && method == "PUT") {
        fs.appendFile("test.txt", update, (err) => {
            if (err) return sendRes(res, 404, "Not found");
            sendRes(res, 200, "file updated");
        })
    }

    // handle unknow Route
    else {
        sendRes(res, 404, "Route not found");
    }
})

server.listen(port, () => {
    console.log("server is running at port ", port);
})