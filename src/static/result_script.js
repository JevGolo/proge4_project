let hidden_input = document.getElementById('reaction');
let user_react = hidden_input.getAttribute('data-r');


let res_page = document.getElementById('result-page-content');

$.post("/get_balanced_reaction",
  {
    react: user_react
  },
  function(data, status){
    console.log( data )
  });