require("dotenv").config();
const ShoppingListService = require("../src/shopping-list-service");
const { expect } = require("chai");
const knex = require("knex");

describe.only("Shopping list service object", function() {
  let db;
  const testItems = [
      
    { id: 7,
        name: 'Steak-believe',
        price: 6,
        date_added: new Date('2019-02-17T16:57:21.235Z'),
        checked: false,
        category: 'Main' },
      { id: 8,
        name: 'Kale Seitan',
        price: 7,
        date_added: new Date('2019-02-17T16:57:21.235Z'),
        checked: false,
        category: 'Breakfast' },
      { id: 9,
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
  // before("run before all tests", () => {
  //   db("shopping_list").truncate();
  // });

//   beforeEach("run before each test", () => {
//     db = knex({
//       client: "pg",
//       connection: process.env.TEST_DB_URL
//     });
//   });

  // afterEach("run after each test", () => {
  //   db("shopping_list").truncate();
  // });

  // after("run after all tests", () => db.destroy());

  // context('inserting data', () =>{
  //     beforeEach(() =>{
  //         return db.into('shopping_list').insert(testItems)
  //     })
  // })

  before(() => db('shopping_list').truncate())

  afterEach(() => db('shopping_list').truncate())

  after(() => db.destroy())

  context(`Given 'shopping_list' has data`, () => {
    beforeEach(() => {
      return db
        .into('shopping_list')
        .insert(testItems)
    })
  

  it("should show data", () => {
    return ShoppingListService.getShoppingList(db).then(results => {
      expect(results).to.have.lengthOf(3);
    });
  });

  it("should add an item", () => {
    const newItem = {
      id: 1,
      name: "Test name",
      price: 7,
      date_added: new Date("2020-01-01T00:00:00.000Z"),
      checked: true,
      category: "Breakfast"
    };
    return ShoppingListService.addItem(db, newItem).then(actual => {
      expect(actual).to.eql({
        id: 1,
        name: newItem.name,
        price: newItem.price,
        date_added: newItem.date_added,
        checked: newItem.checked,
        category: newItem.category
      });
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