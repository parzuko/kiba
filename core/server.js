const express = require("express");
const cors = require("cors");
const formiddable = require("express-formidable");

const PORT = 8080;
const python = require("./packages/python");
const app = express();
app.use(formiddable());

const corsOptions = () => {
  return {
    origin: "*",
    optionsSuccessStatus: 200,
    methods: "GET, POST",
  };
};

app.use(cors(corsOptions()));

app.post("/run", (req, res) => {
  const { code, language } = req.fields;
  if (!code || code.length < 1) {
    res.status(422).send("Cody Body Empty");
    return;
  }
  python.run(code, function (data) {
    res.status(200).json(data);
  });
});

app.get("/", (req, res) => {
  res.status(200).send("You Shouldn't see this");
});

app.listen(PORT, () =>
  console.log(`Backend listening at http://localhost:${PORT}`)
);
