const express = require("express");
const db = require("./db");
const bodyparser = require("body-parser");
const app = express();
app.use(bodyparser.json());

app.post("/users", (req, res) => {
  const { name, email } = req.body;
  sql = "insert into users (name,email) values (?,?)";
  db.query(sql, [name, email], (err) => {
    if (err) throw err;
    res.send("user created");
  });
});
app.get("/users", (req, res) => {
  sql = "select * from users";
  db.query(sql, (err, data) => {
    if (err) throw err;
    res.send(data);
  });
});
app.get("/users/:id", (req, res) => {
  sql = "select * from users where id=?";
  db.query(sql, [req.params.id], (err) => {
    if (err) throw err;
    res.send("one student data");
  });
});
app.put("/users/:id", (req, res) => {
  const { name, email } = req.body;
  sql = "update users set name=?,email=? where id=?";
  db.query(sql, [name, email, req.params.id], (err) => {
    if (err) throw err;
    res.send("user updated");
  });
});
app.delete("/users/:id", (req, res) => {
  sql = "delete from users where id=?";
  db.query(sql, [req.params.id], (err) => {
    if (err) throw err;
    res.send({ message: "user deleted" });
  });
});

app.listen(4001, () => {
  console.log("server run on port 4001");
});
