
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries and resets ids
  return knex('family')
    .truncate()
    .then(function() {
      return knex('family').insert([
        { name: 'elizabeth' }
      ]);
    });
};
