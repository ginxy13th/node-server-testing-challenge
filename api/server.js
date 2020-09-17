const express = require("express");
const Family = require("../family/family-model.js");
const server = express();

server.use(express.json());

server.get("/", (req, res) => {
    res.status(200).json({ api: "up" });
});

server.get("/family", (req, res) => {
    Family.getAll()
        .then(members => {
            res.status(200).json(members);
        })
        .catch(error => {
            res.status(500).json(error);
        });
});
server.post("/family", (req, res) => {
    if (req.body.name) {
        Family.insert(req.body)
            .then(member => {
                res.status(201).json({ data: member });
            })
            .catch(error => {
                res.status(500).json({ message: error.message });
            });
    } else {
        res.status(400).json({ message: "please provide a name" });
    }
});
server.delete("/family/:id", (req, res) => {
    Family.remove(req.params.id)
    .then(deleted => {
      if (deleted) {
        res.status(200).json({success: 'the member has been deleted'})
      } else {
        res.status(404).json({ message: 'post member could not be deleted' })
      }
    })
    .catch(error => {
    res.status(500).json({error: 'something went wrong', error})
  })
});
module.exports = server;