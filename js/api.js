(function($) {

  //fetch a random quote post
  $('#new-quote-button').on('click', function(event) {
    event.preventDefault();

    $.ajax( {
      url: 'wp-json/wp/v2/posts?filter[orderby]=rand&filter[posts_per_page]=1',
      success: function( data ) {

        //gets just the first post from the array of posts.
        var post = data.shift();
        console.log(post);

        //replace the current quote with the new quote
        $('.entry-content').html( post.content.rendered );
        $( '.entry-title' ).html( '&mdash; ' + post.title.rendered );

        //if the source is available, output it, else output an empty string to fill it
        if ( typeof post._qod_quote_source !== 'undefined') {
          $( '.source' ).html(', <a href="' + post._qod_quote_source_url + '">' + post._qod_quote_source + '</a>');
        } else {
          $( '.source' ).text('');
        }

      }
    })




    // $('.site-main article').remove();
  })



  //history api to push post on the end of the url slug

  //submit a new quote with the form using ajax


})(jQuery);