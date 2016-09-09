var cartoonOptions = [
'Rick and Morty', 
'Powerpuff Girls', 
'Adventure Time', 
'Dexter\'s Laboratory', 
'Bob\'s Burgers', 
'Archer', 
'Ren and Stimpy', 
'The Regular Show', 
'Marvelous Misadventures of Flapjack',
'Spongebob Squarepants' 
];


//pulling info from the form and pushing it into and arry AND turning it into a button
$('#addCartoon').on('click', function(){
	$('#cartoonButtonHere').empty();
	var addNewCartoon = $('#cartoon-input').val().trim();
	cartoonOptions.unshift(addNewCartoon);
	console.log(cartoonOptions);
	$('#cartoon-input').val("");
	renderButtons();
	giphyApiRequest();
	
	return false;



});

//clearing all gifs button
$('#clearButton').on('click', function() {
	$('.cartoonButtonHere').empty();
});


//yippeeee the button stork
function renderButtons() {
	$('.cartoonButtonHere').empty();
	$('.cartoonButtonHere').append('<p id=buttonTitle>Cartoons</p>');
	for (var i = 0; i < cartoonOptions.length; i++){
		var makeButtons = $('<button>').attr('data-cartoon', cartoonOptions[i]) .attr('class', 'cartoonButton' + [i]).html(cartoonOptions[i]);
		$(".cartoonButtonHere").append(makeButtons);

	}
}

//to animate or not to animate, that is the question...
function playPauseButton() {
	$('.gifImg').on('click', function(){
		var selectedState = $(this).attr('data-state'); 
		console.log(this);
		console.log(selectedState);

		if (selectedState === 'still'){
			$(this).attr('src', $(this).data('animate'));
			$(this).attr('data-state', 'animate');
			//$('this.playButton').hide();

		}else{
			$(this).attr('src', $(this).data('still'));
			$(this).attr('data-state', 'still');
			//$('this.playButton').show();
		}

	});
}

//calling information from GIPHY API
function giphyApiRequest() {
$('button').on('click', function() {
        var cartoon = $(this).data('cartoon');
        console.log(this);
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + cartoon + "&api_key=dc6zaTOxFJmzC&limit=10";

    //clearing the old cartoon gifs
	$('.cartoonGifsHere').empty();

     $.ajax({
     	url: queryURL,
		method: 'GET'
            })
            .done(function(response) {
                var results = response.data;
                console.log(results);

                for (var i = 0; i < results.length; i++) {

                	var newGifDiv = $('<div class="item">');
                	var gifStillImg = $('<img class="gifImg">').attr('src', response.data[i].images.fixed_height_small_still.url);
                	gifStillImg.attr('data-still', response.data[i].images.fixed_height_small_still.url).attr('data-animate', response.data[i].images.fixed_height.url).attr('data-state', "still");
                	var gifRating = $('<p class="rating">').html("Rating: " + response.data[i].rating);
                	var playButtonImg = $('<img class="playButton">').attr('src', 'assets/images/playButton.png');

                	//newGifDiv.append(playButtonImg);
                	newGifDiv.append(gifStillImg);
                	newGifDiv.append(gifRating);
                	$('.cartoonGifsHere').prepend(newGifDiv);
                }
                playPauseButton()

            });
    });    
}




$('document').ready(function() {
	renderButtons();
	giphyApiRequest();

});
