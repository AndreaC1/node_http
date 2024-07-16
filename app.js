console.log("Hello World!\n==========\n");

const PORT = 5555;

// Exercise 1 Section
console.log("EXERCISE 1:\n==========\n");

const http = require("http");

// Finish setting up the server

const server = http.createServer((req, res) => {

    const packetsArr = [];

    req.on("data", (packet) => {
        packetsArr.push(packet);
    });

    req.on("end", () => {
        console.log(packetsArr);
        const body = JSON.parse(Buffer.concat(packetsArr).toString());
        console.log(body);

        if (req.url == "/") {
            res.writeHead(200, { "Content-Type": "text/html" });
            res.write("<h1>Greetings</h1>")
        } else if (req.method == "GET" && req.url == "/about") {
            res.writeHead(200, { "Content-Type": "text/html" });
            res.write("<h1>About Me</h1><p>My name is Andrea</p>");
        } else if (req.method == "POST" && req.url == "/echo") {
                res.writeHead(200, { "Content-Type": "text/html" });
                res.write("<h1>Heading</h1><p>hello, hello</p>");
            } else {
                res.writeHead(404, { "Content-Type": "text/html" })
                res.write(`<h1>Heading</h1> <p> There was nothing received</p>`)
            }
            res.end();
        })
    });


server.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
});

