$(document).ready( function(){
	$('li.nav.list.item a').lettering();
	setupVerticalSlider('.slider.feed');

	
});

function setupVerticalSlider( container ) {
	var elementToScroll = $(container);
		var feedItems = elementToScroll.children();
		var fi = 0;
		
		var scrollInterval;
		SetScrollIntervalAction();
		
		elementToScroll.mouseenter( function(){
			clearInterval(scrollInterval);
		});
		
		elementToScroll.mouseleave( function(){
			SetScrollIntervalAction();	
		});
		function SetScrollIntervalAction(){
			scrollInterval = setInterval(function() {
					
			  if( fi < feedItems.length -1 ) {
				  fi++;
			  } else {
				  fi = 0;
			  }
			  elementToScroll.scrollTo(feedItems[fi], 500, {
									  "axis":"y",
									  "easing": "swing"
									  });	
			}, 15000);
		}
}

