let hidden_input = document.getElementById('reaction');
let user_react = hidden_input.getAttribute('data-r');


$.post("/get_coeffs",
  {
    react: user_react
  },
  function(data, status){
    console.log( data )
  });