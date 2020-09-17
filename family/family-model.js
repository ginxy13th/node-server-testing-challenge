const db = require("../data/config.js");

module.exports = {
    insert,
    update,
    remove,
    getAll,
    findById,
};

async function insert(member) {
    return db("family")
        .insert(member, "id")
        .then(([id]) => {
            return findById(id);
        });
}

async function update(id, changes) {
    return null;
}

function remove(id) {
    return db('family')
      .where('id', id)
      .del();
  }

function getAll() {
    return db("family");
}

function findById(id) {
    return db("family").where({ id }).first();
}