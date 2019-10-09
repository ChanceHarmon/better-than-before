'use strict'

const express = require('express');
const uuid = require('uuid/v4');

const router = express.Router();

const pet1 =
  { _id: uuid(), name: 'Conan', toy: 'ball' }
  ;
let petToys = {
  pet: {
    pet1,
  }
}

router.get('/pets', (request, response) => {
  response.status(200).json(petToys);
});

router.post('/pets/', (request, response) => {
  const newPet = {
    _id: uuid(), name: request.body.name, toy: request.body.toy,
  };
  petToys.pet = Object.assign(petToys.pet, newPet);
  response.status(200).json(petToys)
});

router.delete('/pets', (request, response) => {
  const deleteId = request.body._id;
  petToys.forEach((pet, idx) => {
    if (pet._id === deleteId) {
      petToys.splice(idx, 1);
    }
  })
  response.status(200).json(petToys)
});

module.exports = router;
