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
        const body = JSON.parse(Buffer.concat(packetsArr).toString());
        if (req.url == "/") {
            res.writeHead(200, { "Content-Type": "text/html" });
            res.write("<h1>Greetings</h1>");
            res.end();
        } else if (req.url == "/about") {
            const aboutObj ={
                name:"Andrea"
            };
            res.writeHead(200, { "Content-Type": "application/json" });
            res.write(JSON.stringify(aboutObj));
            res.end();
        } else if (req.url == "/echo") {
                const echoInfo = {
                    body,
                    method:req.method,
                    url: req.url
                }
                res.writeHead(200, { "Content-Type": "application/json" });
                res.write(JSON.stringify(echoInfo));
                res.end();
                
            } 
        })
    });


server.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
});

