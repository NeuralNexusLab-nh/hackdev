const express = require("fs");
const cookie = require("cookie-parser");
const path = require("path");
const app = express();

app.use(cookie());
app.set("trust proxy", true);

app.get("/", (req, res) => {
  res.send(`<!doctype html><html><head><title>hackdev</title></head><body><h1>Hack Developer Tools</h1><br><a href="https://nethacker.cloud">Offical Website</a></body></html>`);
});

app.get("/setCookie", (req, res) => {
  const key = req.query.key;
  const value = req.query.value;

  res.cookie(key, value);
  res.send("set cookie success");
});

app.get("/set-cookie", (req, res) => {
  const key = req.query.key;
  const value = req.query.value;

  res.cookie(key, value);
  res.send("set cookie success");
});

app.get("/cookie", (req, res) => {
  res.send(req.cookies);
});

app.get("/ip", (req, res) => {
  res.send(req.ip);
});

app.get("/headers", (req, res) => {
  res.send(req.headers)
});

app.get("/register/:name", (req, res) => {
  var registers = JSON.parse(fs.readFileSync("./register.json", "utf8"));
  if (registers[req.params.name]) {
    res.send("ID already exists");
  } else {
    fs.writeFile("./register.json", JSON.stringify(registers.push(req.params.name)), (err) => {
      res.send("ID create success");
    });
  }
});

app.get("/id/:id", (req, res) => {
  var registers = JSON.parse(fs.readFileSync("./register.json"));
  if (registers[req.params.id]) {
    var data = fs.readFileSync(
