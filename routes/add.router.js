const router = require('express').Router();
const { Card } = require('../db/models');
// const fetch = require('node-fetch');

// const response = await fetch('https://pokeapi.co/api/v2/pokemon');
// const pokemons = await response.json();


// const pokemonArr = [];

// for (let i = 0; i < pokemons.results.length; i++) {
//   const obj = { name: pokemons.results[i].name };

//   const response = await fetch(pokemons.results[i].url);
//   const newInfo = await response.json();
//   obj.img = newInfo.sprites.front_default;
//   pokemonArr.push(obj);
// }

// res.render('allPokemons', { pokemons: pokemonArr });
// res.render('allPokemons');
router.post('/', async (req, res) => {
  const { title, img } = req.body;
  await Card.create({ title, img, user_id: req.session.userId });

  res.redirect('/pokemons/all');
});

module.exports = router;
