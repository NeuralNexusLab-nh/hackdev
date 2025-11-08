const fs = require("fs");
const path = require("path");
const express = require("express");
const app = express();

app.set("trust proxy", true);

app.use((req, res, next) => {
  res.set("X-Developer", "NetHacker");
  res.set("X-HTTP-REQUEST-ID", Math.floor(Math.random() * 1000) * Math.floor(Math.random() * 1000));
  res.set("Access-Control-Allow-Origin", "*");
  next();
});

app.get("/", (req, res) => {
  res.send(`<!doctype html><head><title>HackDev</title></head><body><h1>HackDev</h1></body>`);
});

app.get("/ip", (req, res) => {
  res.send(req.ip);
});

app.get("/ua", (req, res) => {
  res.send(req.headers["user-agent"]);
});

app.get("/headers", (req, res) => {
  res.send(req.headers);
});

app.get("/dh/register/:id", (req, res) => {
  let dh = JSON.parse(fs.readFileSync("./dh.json", "utf8"));
  if (dh[req.params.id]) {
    res.send("ID already exists");
  } else {
    dh[req.params.id] = {
      ip: " ",
      ua: " ",
      time: " ",
      os: " ",
      mobile: " ",
      headers: " "
    };
    fs.writeFile("./dh.json", JSON.stringify(dh, null, 2), (err) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error writing file");
      } else {
        res.send("ID create success");
      }
    });
  }
});


app.get("/dh/:id", (req, res) => {
  var dh = JSON.parse(fs.readFileSync("./dh.json"));
  if (dh[req.params.id]) {
    dh[req.params.id].ip = req.ip;
    dh[req.params.id].ua = req.headers["sec-ch-ua"];
    dh[req.params.id].time = new Date();
    dh[req.params.id].os = req.headers["sec-ch-ua-platform"];
    dh[req.params.id].mobile = req.headers["sec-ch-ua-mobile"];
    dh[req.params.id].headers = req.headers;
    dh = JSON.stringify(dh);
    fs.writeFile("./dh.json", dh, (err) => {
      res.send("SUCCESS");
    });
  } else {
    res.status(404).send("ID not found");
  }
});

app.get("/dh/info/:id", (req, res) => {
  var dh = JSON.parse(fs.readFileSync("./dh.json"));
  if (dh[req.params.id]) {
    res.json(dh[req.params.id]);
  } else {
    res.status(404).send("ERROR 404: ID not found");
  }
});

app.get("/xss.js", (req, res) => {
  res.sendFile(path.join(__dirname, "xss.js"));
});

app.get("/return", (req, res) => {
  res.type("text/plain").send(req.query.text);
});

app.get("/fetch", (req, res) => {
  fetch(req.query.url).then(res => res.text()).then((data) => { res.type("text/plain").send(data); });
});

app.listen(process.env.PORT);
