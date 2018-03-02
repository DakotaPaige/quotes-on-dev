(function($) {

  //fetch a random quote post when the new quote button is clicked
  $('#new-quote-button').on('click', function(event) {
    event.preventDefault();

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
        var stateObj = '';
        history.replaceState(stateObj, 'post page', post.link);
      }
    })
  })


  //submit a new quote with the form using ajax


})(jQuery);