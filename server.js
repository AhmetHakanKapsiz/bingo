const express = require("express");
const http = require("http");
const path = require("path");
const bodyParser = require("body-parser");
const fs = require("fs");
const app = express();
const { ExpressPeerServer } = require("peer");
const server = http.createServer(app);
const port = process.env.PORT || "443";

const jsonParser = bodyParser.json();

const peerServer = ExpressPeerServer(server, {
  proxied: true,
  debug: true,
  port: 9000,
  path: "/conn",
  ssl: {},
});

app.use(peerServer);


app.set("views", path.join(__dirname));
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");

app.use(express.static(path.join(__dirname)));

app.get("/", function (req, res) {
    res.render("index");
});

app.get("/getHost", async function (req, res) {
  fs.readFile("./host.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    let obj = JSON.parse(data);
    res.json(obj);
  });
});

app.post("/openHost", jsonParser, async function (req, res) {
  const hostObj = req.body;
  fs.readFile("./host.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      res.json(false);
    }
    let obj = JSON.parse(data);
    obj.host = hostObj.host;
    obj = JSON.stringify(obj);
    fs.writeFile("./host.json", obj, (err) => {
      if (err) {
        console.error(err);
      } else {
        res.json(true);
      }
    });
  });
});

server.listen(port);
console.log(port + ". port dinleniyor");
