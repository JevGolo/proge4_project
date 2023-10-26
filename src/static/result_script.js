let hidden_input = document.getElementById('reaction');
let user_react = hidden_input.getAttribute('data-r');

let resultDiv = document.getElementById('result');


function smaller_numbers( _text_ ) {

    let output = ""

    for (let i = 0; i < _text_.length; i++){

        let sign = _text_[i];  

        if ( !isNaN( Number( sign ) ) ){
            output += "<sub>" + _text_[i] + "</sub>"
        } else {
            output += sign
        }
        
    };

    return output

}


function set_data( _data_json_ ) {
    data_obj = JSON.parse( _data_json_ );
    console.log( data_obj );

    let len_reactants = data_obj.reactants.length;
    let len_products = data_obj.products.length;

    let coeffs_reactants = data_obj.coeffs.slice( 0, len_reactants );
    let coeffs_products = data_obj.coeffs.slice( len_reactants );

    console.log( coeffs_reactants );
    console.log( coeffs_products );
    
    let reactants_str_array = [];
    let products_str_array = [];

    // REACTANTS
    for( let i = 0; i < len_reactants; i++ ) {
        let part = '';

        e = data_obj.reactants[ i ];
        c = coeffs_reactants[ i ];

        if (c > 1) {
            part += '<a class="coeff-number">' + c + '</a>';
        }

        part += smaller_numbers( e )
        reactants_str_array.push( part )

    }

    for( let i = 0; i < len_products; i++ ) {
        let part = '';

        e = data_obj.products[ i ];
        c = coeffs_products[ i ];

        if (c > 1) {
            part += '<a class="coeff-number">' + c + '</a>';
        }

        part += smaller_numbers( e )
        products_str_array.push( part )
    }

    let f_result = reactants_str_array.join( " + " ) + " --> " + products_str_array.join( " + " )
    
    resultDiv.innerHTML = f_result
    
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