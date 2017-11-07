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
