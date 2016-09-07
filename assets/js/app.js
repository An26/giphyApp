

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



                	//newGifDiv.append(response.data[i].images.fixed_height_small.url);
                	var gifRating = newGifDiv.append(response.data[i].rating);
                	var gifStillPhoto = newGifDiv.append(gifImg);
                	$('.cartoonGifsHere').prepend(newGifDiv);
                }
            });
    });    