const router = require('express').Router();
const { checkUser, deepCheckUser } = require('../middleware/allMiddleware');
// const fetch = require('node-fetch');

router.get('/all', checkUser, async (req, res) => {
  // const response = await fetch('https://pokeapi.co/api/v2/pokemon');
  //     const pokemons = await response.json();
  

  // const pokemonArr = [];

  // for (let i = 0; i < pokemons.results.length; i++) {
  //     let obj = {name:pokemons.results[i].name};

  //     const response = await fetch(pokemons.results[i].url);
  //     const newInfo = await response.json();
  //     obj.img = newInfo.sprites.front_default;
  
  //     pokemonArr.push(obj);

  // }

  //     res.render('allPokemons', {pokemons: pokemonArr })
  res.render('allPokemons');
});

router.get('/search', checkUser, (req, res) => {
  res.render('searchPokemons');
});

module.exports = router;
