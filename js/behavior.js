// Drupal namespaces jQuery, so it's only accessible this way.
(function ($) {

		//get image index based on site section
		// for production:
			var window_context = window.location.pathname;
		// need to remove 1st url arg for dev-site
			var window_context = window_context.match(/(\/art-dept-drupal)*(.*?)\//)[2];
				$(document).ready(function(){
					//IE8 chokes on console.log unless debugger is running
					//console.log = console.log || function(){};
					draw_windows($, window_context);
					resize_sidebar();
					$('img').load(function(){
						setTimeout(make_bricks,200);
					});
					start_carousel();
				});

				$(window).resize(function(){	
					make_bricks();
				});
				
			function make_bricks(){
					$('.grid.bricks').masonry({
						itemSelector: '.item'
					});
			}

			function resize_sidebar(){
							var $sidebar = $('.block.sidebar');
							if($sidebar.get().length != 0){
											$sidebar.find('img:last-child').load(function(){
												var sidebar_li_h = $sidebar.find('li').outerHeight(true);

												$sidebar.height( Math.round( 
																						$('.block.content').height() / sidebar_li_h
																				) * sidebar_li_h );
											});
							}
			}
			function start_carousel(){
				$carousel = $(".node-facility .field-type-entityreference \
									> .field-items, \
 								.user-profile .field-name-field-portfolio > .field-items, \
								.node-page-with-photos .field-type-entityreference \
									> .field-items");
// don't start if <2 photos
				if( $carousel.children().length > 1 ) {
								$carousel.height($carousel.width() * .7);
								$carousel.addClass('carousel');
								$carousel.parent().css('position','relative');
								//$('.carousel .button').css('top', $carousel.height()/2 );
								$carousel.cycle({
									delay: 0,
									timeout: 7000,
									pause: true
									});
								$('.carousel').css('margin-bottom', 100 );
								$carousel.after("<div class='carousel-button next'>&gt;</div> \
														<div class='carousel-button prev'>&lt;</div>");
								$('.carousel-button').css('top', $carousel.height())
								$carousel.cycle({
									next: $('.carousel-button.next'),
									prev: $('.carousel-button.prev')
								});
						}

				}


})(jQuery);


