module.exports.seed = (knex, Promise) => {
  return knex('merchant').insert({
    merchant_name: 'Shopee',
    phone_number: '011-18564918',
    latitude: 2.99,
    longitude: 101.78,
    is_active: true
  });
};
