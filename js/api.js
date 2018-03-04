(function($) {

  var lastPage = '';
  //fetch a random quote post when the new quote button is clicked
  $('#new-quote-button').on('click', function(event) {
    event.preventDefault();
    lastPage = document.URL;

    $.ajax( {
      url: '/QuotesOnDev/wp-json/wp/v2/posts?filter[orderby]=rand&filter[posts_per_page]=1',
      success: function( data ) {

        //gets just the first post from the array of posts.
        var post = data.shift();

        //replace the current quote with the new quote
        $('.entry-content').html( post.content.rendered );
        $( '.entry-title' ).html( '&mdash; ' + post.title.rendered );

        //if the source is available, output it, else output an empty string to fill it
        if ( post._qod_quote_source !== '' && post._qod_quote_source_url !== '') {
          $( '.source' ).html(', <a href="' + post._qod_quote_source_url + '">' + post._qod_quote_source + '</a>');
        } 
        else if (post._qod_quote_source !== '') {
          $('.source').text(', ' + post._qod_quote_source)
        }
        else {
          $( '.source' ).text('');
        }

        //history api to push post on the end of the url slug

        history.pushState(null, null, post.link);

      }
    })
    
  })


  $(window).on('popstate', function() {
    if (window.location.hash.indexOf('qm-overview') === 1) {
      return false;
    }else {
      window.location.replace(lastPage);
    }
  });

  //submit a new quote with the form using ajax

  $('input[type=submit]').on('click', function(event) {
    event.preventDefault();
    var data = {
      status: 'pending',
      title: $('#quote-author').val(),
      content: $('#quote-content').val(),
      _qod_quote_source: $('#quote-source').val(),
      _qod_quote_source_url: $('#quote-source-url').val()
    }

    $.ajax({
       method: 'post',
       url: api_vars.root_url + 'wp/v2/posts/',
       data: data,
       beforeSend: function(xhr) {
          xhr.setRequestHeader( 'X-WP-Nonce', api_vars.nonce );
       },
       success: function() {
          $('#quote-submission-form').hide('slow');
          $('.entry-title').after('<p>'+api_vars.success+'</p>');
       },
       error: function() {
        $('#quote-submission-form').hide('slow');
        $('.entry-title').after('<p>'+api_vars.failure+'</p>');
       }
    });
 });


})(jQuery);