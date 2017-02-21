$(function() {
	smoothScroll(300);
});
// smoothScroll function is applied from the document ready function
function smoothScroll (duration) {
	$('a[href^="#"]').on('click', function(event) {

	    var target = $( $(this).attr('href') );

	    if( target.length ) {
	        event.preventDefault();
	        $('html, body').animate({
	            scrollTop: target.offset().top
	        }, duration);
	    }
	});
}

function hamBurger() {
    var x = document.getElementsByTagName("ul")[0];
    if (x.className === "menu") {
        x.className += " responsive";
    } else {
        x.className = "menu";
    }
}