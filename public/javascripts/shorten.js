
// Event listener on the button click 
$('.btn-shorten').on('click', function(){
    $.ajax({
        url: '/api/shorten',
        type: 'POST',
        dataType: 'JSON',
        data: {url : $('#url-field').val()},
        success: function(data) {
            // display the shortened URL to the user that is returned by the server
            var resultHTML = '<a class="result" href="' + data.shortUrl + '">'
                + data.shortUrl + '</a>';
            $('#link').html(resultHTML);
            $('#link').hide().fadeIn('slow');
        }
    })
})