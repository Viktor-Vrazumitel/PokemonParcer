if (window.location.pathname === '/pokemons/all') {
  document.addEventListener('DOMContentLoaded', async (e) => {
    const ulForm = document.querySelector('.pokemons');
    const response = await fetch('https://pokeapi.co/api/v2/pokemon/?limit=200');
    const pokemons = await response.json();

    const pokemonArr = [];

    for (let i = 0; i < pokemons.results.length; i++) {
      const obj = { name: pokemons.results[i].name };

      const response = await fetch(pokemons.results[i].url);
      const newInfo = await response.json();
      obj.img = newInfo.sprites.front_default;


      pokemonArr.push(obj);

      ulForm.insertAdjacentHTML(
        'beforebegin',
        `   
                <div class="contPok" data-id="${obj.name}">

            <p class="pokName" id="${obj.name}">${obj.name}</p>
            <img class='image' src=${obj.img}>
            <div>
            <button class='buttAdd' value="${obj.name}" name="hidden" type="submit">add</button>
            <img class='heart'src='/img/pngwingcom.png'>
            </div>
        </div>
        
          `,
      );
    }
    const $divPok = document.querySelector('.addPokem');
    $divPok.addEventListener('click', async (e) => {
      if (e.target.tagName === 'BUTTON' && e.target.innerText === 'add') {
        const parent = e.target.closest('[data-id]');
        const { id } = parent.dataset;
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const pokBase = await response.json();
        const obj = { title: pokBase.name, img: pokBase.sprites.front_default };

   
        const fetchBase = await fetch('/add', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(obj),
        });
      }
    });
  });
}

if (window.location.pathname === '/pokemons/search') {
 
  const $div = document.querySelector('#conteiner');

  document.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));
    const respons = await fetch(`https://pokeapi.co/api/v2/pokemon/${data.pokemonName}`);

    const pokemonInfo = await respons.json();
    $div.insertAdjacentHTML(
      'afterend',
      `
<div class='inPokems'>
<p class="pokName"  >${data.pokemonName}</p>
<img class='imageS' src=${pokemonInfo.sprites.front_default}>
<div>


</div>
</div> `,
    );

    const $p = document.querySelector('.pokName');
    const z = $p.innerHTML;
  });
}

// if (window.location.pathname === '/pokemons/all') {
// const $a = document.querySelector('.add');
// $a.addEventListener('click', async (e) => {
//   e.preventDefault();

//   const respons = await fetch;
// });

