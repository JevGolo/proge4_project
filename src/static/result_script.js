let hidden_input = document.getElementById('reaction');
let user_react = hidden_input.getAttribute('data-r');

let resultDiv = document.getElementById('result')

function set_data( _data_json_ ) {
    data_obj = JSON.parse( _data_json_ )
    console.log( data_obj )
}


$.post("/get_coeffs",
  {
    react: user_react
  },

  function( data, statusTxt, xhr ){
    console.log( xhr.status );
    if( data == "error")
    {
      alert( "Midagi läks valesti. Kontrollige keemia võrrand ja proovige uuesti palun" );
      window.location.href = "/calc";

    } else {
      console.log( "data: " + data );
      set_data( data );
    }
    
  });