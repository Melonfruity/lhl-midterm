const roomsRouter = require('express').Router();

const roomsRouterWrapper = (db) => {
  
  // create a new room
  roomsRouter.post('/', (req, res) => {

  });
  
  // return the an already available room
  roomsRouter.get('/:id', (req, res) => {

  });

  // updates the rooms table
  roomsRouter.post('/:id', (req, res) => {

  });
  
  return roomsRouter;
};

module.exports = roomsRouterWrapper;