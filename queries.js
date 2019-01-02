'use strict';

const { DATABASE } = require('./config');
const knex = require('knex')(DATABASE);

// Sample select 
knex
  .select()
  .from('restaurants')
  .limit(2)
  .debug(true)
  .then(results => console.log(results));


// Select all restaurants
knex
  .select('*')
  .from('restaurants')
  .then(results => console.log(results));

// Get italian restaurants
knex
  .select('*')
  .from('restaurants')
  .where('cuisine', 'Italian')
  .then(results => console.log(results));

// Get 10 Italian restaurants
knex
  .select('id', 'name')
  .from('restaurants')
  .where('cuisine', 'Italian')
  .limit(10)
  .then(results => console.log(results));

// Count of Thai restaurants
knex
  .count()
  .from('restaurants')
  .where('cuisine', 'Thai')
  .then(results => console.log(results));

// Count of restaurants
knex
  .count()
  .from('restaurants')
  .then(results => console.log(results));

// Count of Thai restaurants in zip code 11372
knex
  .count()
  .from('restaurants')
  .where('cuisine', 'Thai')
  .andWhere('address_zipcode', 11372)
  .then(results => console.log(results));

// Count of Thai restaurants in one of several zip codes: 10012, 10013, 10014. Limit 5, sort 
knex
  .select('id', 'name')
  .from('restaurants')
  .where('cuisine', 'Thai')
  .whereIn('address_zipcode', [10012, 10013, 10014])
  .orderBy('name', 'asc')
  .limit(5)
  .then(results => console.log(results));

// Create a restaurant
knex
  .insert({
    name: 'Byte Cafe',
    borough: 'Brooklyn',
    cuisine: 'coffee',
    address_building_number: '123',
    address_street: 'Atlantic Avenue',
    address_zipcode: '11231'
  })
  .into('restaurants')
  .returning(['name', 'borough'])
  .then(results => console.log(results));

// Create 3 restaurants and return id and name
knex
  .insert([
    {
      name: 'Random resto 1',
      borough: 'Brooklyn',
      cuisine: 'coffee',
      address_building_number: '123',
      address_street: 'Atlantic Avenue',
      address_zipcode: '11231'
    },
    {
      name: 'Random resto 2',
      borough: 'Manhattan',
      cuisine: 'steak',
      address_building_number: '124',
      address_street: 'Atlantic Avenue',
      address_zipcode: '11231'
    },
    {
      name: 'Random resto 3',
      borough: 'Queens',
      cuisine: 'pizza',
      address_building_number: '125',
      address_street: 'Atlantic Avenue',
      address_zipcode: '11231'
    },
  ])
  .into('restaurants')
  .returning(['id', 'name'])
  .then(results => console.log(results));

// Update a record where nyc_restaurant_id = 30191841
knex('restaurants')
  .where('nyc_restaurant_id', 30191841)
  .update('name', 'DJ Reynolds Pub and Restaurant')
  .then(results => console.log(results));

// Delete the grade whose id is 10
knex('grades')
  .where('id', 10)
  .del()
  .then(results => console.log(results));

// Delete the restaurant whose id is 22...should return a foreign key error
knex('restaurants')
  .where('id', 22)
  .del()
  .then(results => console.log(results));