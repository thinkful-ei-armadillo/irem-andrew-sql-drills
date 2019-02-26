'use strict';
const ShoppingListService = {
  getShoppingList(db){
    return db.select('*').from('shopping_list');
  }
};

module.exports = ShoppingListService;