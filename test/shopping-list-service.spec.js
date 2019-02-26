"use strict";
require("dotenv").config();
const ShoppingListService = require("../src/shopping-list-service");
const { expect } = require("chai");
const knex = require("knex");

describe("Shopping list service object", function() {
  let db;
  const testItems = [
      
    { id: 1,
        name: 'Steak-believe',
        price: 6,
        date_added: new Date('2019-02-17T16:57:21.235Z'),
        checked: false,
        category: 'Main' },
      { id: 2,
        name: 'Kale Seitan',
        price: 7,
        date_added: new Date('2019-02-17T16:57:21.235Z'),
        checked: false,
        category: 'Breakfast' },
      { id: 3,
        name: 'NoBull Burger',
        price: 2,
        date_added: new Date('2019-02-17T16:57:21.235Z'),
        checked: false,
        category: 'Snack' }
  
]
  before(() => {
    db = knex({
      client: "pg",
      connection: process.env.TEST_DB_URL
    });
  });
  before(() => {
    db("shopping_list").truncate();
  });

//   beforeEach("run before each test", () => {
//     db = knex({
//       client: "pg",
//       connection: process.env.TEST_DB_URL
//     });
//   });

  afterEach(() => {
    db("shopping_list").truncate();
  });

  after(() => db.destroy());

  context('inserting data', () =>{
      beforeEach(() =>{
          return db.into('shopping_list').insert(testItems)
      })
      it("should add an item", () => {
        const newItem = {
          name: "Test name",
          price: 7,
          date_added: new Date("2020-01-01T00:00:00.000Z"),
          checked: true,
          category: "Breakfast"
        };
        return ShoppingListService.addItem(db, newItem).then(actual => {
          expect(actual).to.eql({
            id: 4,
            name: newItem.name,
            price: newItem.price,
            date_added: newItem.date_added,
            checked: newItem.checked,
            category: newItem.category
          });
        });
      });
  

  it("should show data", () => {
    return ShoppingListService.getShoppingList(db).then(results => {
      expect(results).to.have.lengthOf(3);
    });
  });


  it('get all items', ()=>{
    return ShoppingListService
        .getShoppingList(db)
        .then(results => {
            expect(results).to.eql(testItems)
        })
  })
})

});
