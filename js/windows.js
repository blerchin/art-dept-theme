// Passing jQuery in because the library is namespaced in Drupal
var draw_windows = function( $, window_context ){
var ns = {
	svg: "http://www.w3.org/2000/svg",
	xlink: "http://www.w3.org/1999/xlink"
}
// Global properties for grid composition
var grid_size = {
		count: 6,
		cols: 3,
		rows: 2,
		ratio: 2.4,
		lighten: false
	};

//Global Raphael SVG Elements
var r_e = {};

var scaling = false;

var draw_window = function( context){
// get json file with relevant args appended
						var $gc = $('div.windows');
						var grid_container = $gc.get()[0];
					
						if($gc.hasClass('three-windows')){
							grid_size.count = 3;
							grid_size.rows = 1;
							grid_size.ratio = 4.8;
						}
						if($gc.hasClass('lighten')){
							grid_size.lighten = true;	
						}

						var grid_images = [];
						$gc.find('img').each(function(i) {
							grid_images.push({
								src: this.getAttribute('src'),
								width: 240,
								height: 186,
								});
						});


						$gc.empty();
						setupGrid( grid_container);
						drawGrid( grid_container, grid_images);
						resizeGrid( grid_container, r_e.R, r_e.boxes );

						
						window.onresize = function() {
						
							$(grid_container).empty();
							setupGrid( grid_container);
							drawGrid( grid_container, grid_images);
							resizeGrid( grid_container, r_e.R, r_e.boxes );
						}
}

function setupGrid(container){
	
	grid_size.width = $(container).width();
	grid_size.height = grid_size.width / grid_size.ratio;
	$(container).height( grid_size.height );
	
	grid_size.img_width = grid_size.width / grid_size.cols;
	grid_size.img_height = grid_size.height / grid_size.rows;

}

function resizeGrid(container, svg, object){

	setupGrid(container);
	scaleTo( object, grid_size.width, grid_size.height );
	svg.setSize(grid_size.width, grid_size.height);
}

function drawGrid(container, images){
	r_e.R = Raphael(container, grid_size.width, grid_size.height );
	r_e.R.canvas.setAttribute("id","grid-canvas");
	for(i=0; i < grid_size.count; i++) {
		drawGridImageByIndex( i, images[i]);
	}
	r_e.boxes = r_e.R.path( window_panel[grid_size.rows]);
	r_e.boxes.attr({
		'fill': '#fff',
		'stroke-width': 0
	});
	r_e.R.canvas.appendChild(r_e.boxes.node);
	if(grid_size.lighten){
		var overlay = r_e.R.rect(0, 0, grid_size.width, grid_size.height);
		overlay.attr({ 
			'fill': '#fff',
			'fill-opacity': .6,
			'stroke-width': 0
		});
	}
}

function drawGridImageByIndex( index, img_meta) {

	var x = (index % grid_size.cols) * grid_size.img_width;
	var y = index >= grid_size.cols ? grid_size.img_height : 0;
	
	var ratio = img_meta.height / img_meta.width;

	var img = r_e.R.image( img_meta.src, x, y, grid_size.img_width, grid_size.img_width*ratio	);
	img.toFront();

	r_e.R.canvas.appendChild(img.node);
	img.node.setAttribute("preserveAspectRatio", "xMinYMin");
	img.node.setAttribute("clip-path","url('#win-clip')");
	r_e['win'+index] = img;

	}

function scaleTo( object, width, height) {
//don't do two scaling operations at once (not sure if this is needed)
	if(scaling == false){
		scaling = true;
		bb = object.getBBox();
		scale = {
//1.01 multiply corrects for (floating point?) error in scale function
			w: 1.01 * (width / bb.width),
			h: height / (bb.height-3)
		}
//transform sometimes has unexpected results close to 1
		if( Math.abs(1 - scale.w) > .0001 
			&& Math.abs(1 - scale.h) > .0001 ) {
			object.transform("s"+scale.w +","+scale.h+","+0+","+0);
			}
		scaling = false;
		} else {
		}
}


var window_panel = {
2:"M541.452,166.529c0-51.362,0-102.723,0-154.085C629.584,9.838,718.586,5.042,806.5-1.924V-2h-814C80.739,5.009,170.082,9.829,258.548,12.446c0,51.36,0,102.722,0,154.083c-88.35-0.037-177.698-0.072-266.048-0.138v10.726c88.35-0.375,177.698-0.64,266.048-0.776c0,49.071,0,98.142,0,147.213C170.082,326.181,80.739,330.991-7.5,338v2h814v-2.076c-87.915-6.964-176.916-11.753-265.048-14.37c0-49.071,0-98.142,0-147.213c88.016,0.136,177.023,0.399,265.048,0.772v-10.721C718.476,166.454,629.468,166.493,541.452,166.529z M529.642,323.314c-88.443-2.227-172.882-2.237-261.325-0.052c0.003-48.978,0.006-97.958-0.001-146.937c88.441-0.119,172.885-0.116,261.326,0.002C529.642,225.323,529.642,274.319,529.642,323.314z M529.642,166.53c-88.441,0.02-172.883,0.021-261.325,0.001c0.003-51.265,0-102.529,0-153.794c88.444,2.187,172.882,2.162,261.325-0.05C529.642,63.967,529.642,115.249,529.642,166.53z",
		1: "M541.452,12.444C629.918,9.829,719.262,5.009,807.5-2h-815C80.739,5.009,170.082,9.829,258.548,12.446c0,51.36,0,102.722,0,154.083c-88.35-0.037-177.698-0.072-266.048-0.138v0.275h815v-0.275c-88.35,0.062-177.699,0.101-266.048,0.138C541.452,115.167,541.452,63.806,541.452,12.444z M529.642,166.53c-88.441,0.02-172.883,0.021-261.325,0.001c0.003-51.265,0-102.529,0-153.794c88.444,2.187,172.882,2.162,261.325-0.05C529.642,63.967,529.642,115.249,529.642,166.53z"	}

	draw_window(window_context);
}
