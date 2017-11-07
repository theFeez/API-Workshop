const app = new Clarifai.App({
 apiKey: 'YOUR_API_KEY'
});


$('#urlForm').submit(function(e){
  var url = $('#url').val();
  $('#pic').attr('src', url);
  app.models.predict(Clarifai.GENERAL_MODEL, url).then(
    function(response) {
      var concepts = response.outputs[0].data.concepts;
      concepts.forEach(function(x){
        $('#concepts').append(x.name + ", ");
      });
    },
    function(err) {
      console.error(err);
    }
  );
  e.preventDefault();
});


$('#spotifyForm').submit(function(e){
    $.ajax({
        url: 'https://accounts.spotify.com/api/token',
        type: 'post',
        data: {
            grant_type: 'client_credentials'
        },
        headers: {
            Authorization: 'Basic '+btoa('clientID:clientSecret')
        },

        success: function (data) {
            console.log(data.access_token);
            var searchUrl = 'https://api.spotify.com/v1/search?q='+$('#trackName').val()+'&type=track'
            $.ajax({
                url:searchUrl,
                type:'get',
                headers: {
                    Authorization: 'Bearer '+data.access_token
                },
                success: function(data2){
                    $('#trackList').html('');
                    var tracks = data2.tracks.items;
                    for(var i in tracks){
                        console.log(tracks[i]);
                        $('#trackList').html($('#trackList').html()+'<li>'+tracks[i].name+' By: '+tracks[i].artists[0].name+'</li>');
                    }
                }
            })
        }
    });
    e.preventDefault();
})
