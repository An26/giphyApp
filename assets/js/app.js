var cartoonOptions = [
'Rick and Morty', 
'Powerpuff Girls', 
'Adventure Time', 
'Dexter\'s Laboratory', 
'Bob\'s Burgers', 'Archer', 
'F is for Family', 
'Ren and Stimpy', 
'The Regular Show', 
'Marvelous Misadventures of Flapjack',
'Spongebob Squarepants' 
];

//creating buttons dynamically
for (var i = 0; i < cartoonOptions.length; i++){
	var makeButtons = $('<button>').attr('data-cartoon', cartoonOptions[i]) .attr('class', 'cartoonButton' + [i]).html(cartoonOptions[i]);
	$(".cartoonButtonHere").append(makeButtons);
	//giphyApiRequest();	
}

//pulling info from the form and pushing it into and arry AND turning it into a button
$('#addCartoon').on('click', function(){
	$('#cartoonButtonHere').empty();
	var addNewCartoon = $('#cartoon-input').val().trim();
	cartoonOptions.unshift(addNewCartoon);
	console.log(cartoonOptions);
	renderButtons();
	giphyApiRequest();
	return false;
});

$('#clearButton').on('click', function() {
	$('.cartoonButtonHere').empty();
});

//to animate or not to animate - clicking play/"pause" action
// if (button is clicked){ //"play"
// 	hide still image 
// 	show gif
// } else if (button is clicked again){ //"pause"
// 	hide gif
// 	show still image
// }


function renderButtons() {
	$('.cartoonButtonHere').empty();
	//creating buttons dynamically...again
	for (var i = 0; i < cartoonOptions.length; i++){
		var makeButtons = $('<button>').attr('data-cartoon', cartoonOptions[i]) .attr('class', 'cartoonButton' + [i]).html(cartoonOptions[i]);
		$(".cartoonButtonHere").append(makeButtons);	
	}
}

//calling information from GIPHY API
function giphyApiRequest() {
$('button').on('click', function() {
        var p = $(this).data('cartoon');
        console.log(this);
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + p + "&api_key=dc6zaTOxFJmzC&limit=10";

     $.ajax({
     	url: queryURL,
		method: 'GET'
            })
            .done(function(response) {
                var results = response.data;
                console.log(results);

                for (var i = 0; i < results.length; i++) {

                	var newGifDiv = $('<div class="item">');
                	var gifImg = $('<img class="gifImg">').attr('src', response.data[i].images.fixed_height_small.url);

                	var gifRating = newGifDiv.append("Rating: " + response.data[i].rating);
                	var gifStillPhoto = newGifDiv.append(gifImg);
                	$('.cartoonGifsHere').prepend(newGifDiv);
                }
            });
    });    
}

