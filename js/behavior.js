$(document).ready( function(){
	//$('li.nav.list.item a').lettering();
	setupVerticalSlider('.slider.feed');

	
});



function setupVerticalSlider( container ) {
	var elementToScroll = $(container);
		var feedItems = elementToScroll.children();
		var fi = 0;
		
		var scrollInterval;
		//SetScrollIntervalAction();
		
		elementToScroll.mouseenter( function(){
			//clearInterval(scrollInterval);
		});
		
		elementToScroll.mouseleave( function(){
			//SetScrollIntervalAction();	
		});
	
	function scrollToNthElement( n ) {
	elementToScroll.scrollTo(feedItems[fi], 500, {
							  "axis":"y",
							  "easing": "swing"
							  });	
							  }
		
		$(window).keydown( function(e) {
			if (e.which == 39 || e.which == 37) {
				console.log(e.which);
				switch( e.which) {

				case 37 : 
					fi > 0 ? fi-- : fi=fi;
					scrollToNthElement( fi );
					break;
				case 39 :
					fi <= elementToScroll.length ? fi++ : fi;
					scrollToNthElement( fi );
					break;
				}
			}
			
		});

		
		function SetScrollIntervalAction(){
			scrollInterval = setInterval(function() {
					
			  if( fi < feedItems.length -1 ) {
				  fi++;
			  } else {
				  fi = 0;
			  }
			  	scrollToNthElement( fi );
			  	
			}, 15000);
		}
		
}

