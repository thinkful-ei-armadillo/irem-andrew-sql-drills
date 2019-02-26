'use strict';
const ShoppingListService = {
  getShoppingList(db){
    return db.select('*').from('shopping_list');
  },
  addItem(db, newItem){
    return db 
        .insert(newItem)
        .into('shopping_list')
        .returning('*')
        .then(rows =>{
            return rows[0]
        })
  }
};

module.exports = ShoppingListService;