'use strict';
require('dotenv').config();
const ShoppingListService = require('../src/shopping-list-service');
const { expect } =require('chai');
const knex = require('knex');

describe('Shopping list service object', function(){
  let db= knex({
    client: 'pg',
    connection: process.env.TEST_DB_URL});

  before(() =>{
    db.delete(); 
  });

  beforeEach(()=> {db = knex({
    client: 'pg',
    connection: process.env.TEST_DB_URL
  });
  });

  afterEach(()=> {db.delete();});
  after(()=> db.destroy());

  it('should show data', () => {
    return ShoppingListService
      .getShoppingList(db)
      .then(results => {expect(results).to.have.lengthOf(31);
      });
  });
});
