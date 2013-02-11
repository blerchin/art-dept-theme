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


$(window).ready( function(){
	
	var grid_container = $('div.grid.windows');
	if(grid_container.hasClass('three-windows')){
		grid_size.count = 3;
		grid_size.rows = 1;
		grid_size.ratio = 4.8;
	}
	if(grid_container.hasClass('lighten')){
		grid_size.lighten = true;	
	}
	if(grid_container.length > 0) {
		grid_container = grid_container.get()[0]
		var grid_images = [];
		$('div.grid.windows li').get().forEach(function(o,i){
				grid_images.push({
					src: o.getElementsByTagName('img')[0].getAttribute('src'),
					href: "#",
					width: 240,
					height: 186,
					text: o.textContent,
					});
			});
		grid_size.count = grid_images.length;	
		console.log( grid_images );	
		$(grid_container).empty();
	
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
});

function setupGrid(container){
	
	grid_size.width = $(container).width();
	grid_size.height = grid_size.width / grid_size.ratio;
	$(container).height( grid_size.height );
	
	grid_size.img_width = grid_size.width / grid_size.cols;
	grid_size.img_height = grid_size.height / grid_size.rows;
	console.log(grid_size);

}

function resizeGrid(container, svg, object){

	setupGrid(container);
	scaleTo( object, grid_size.width, grid_size.height );
	svg.setSize(grid_size.width, grid_size.height);
}

function drawGrid(container, images){

	r_e.R = Raphael(container, grid_size.width, grid_size.height );
	r_e.R.canvas.setAttribute("id","grid-canvas");

	r_e.cp=document.createElementNS(ns.svg,"clipPath");
	r_e.cp.setAttribute("id","win-clip");
	r_e.R.canvas.appendChild(r_e.cp);
	// choose shape based on number of rows specified
	r_e.boxes = r_e.R.path( window_panel[grid_size.rows]);

	r_e.boxes.node.setAttribute("id","win-path");
	r_e.cp.appendChild(r_e.boxes.node);
	for(i=0; i < grid_size.count; i++) {
		drawGridImageByIndex( i, images[i]);
	}
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
	
	var g = document.createElementNS(ns.svg,"g");
		g.setAttribute('id','win'+index);
		g.setAttribute('class','nav grid image');
		r_e.R.canvas.appendChild( g );
		
	//var a = document.createElementNS(svg,"a");
	//	a.setAttributeNS(ns.xlink,"xlink:href","//");
	//	g.appendChild(a);
	
	var ratio = img_meta.height / img_meta.width;

	var img = r_e.R.image( img_meta.src, x, y, grid_size.img_width, grid_size.img_width*ratio	);
		img.toFront();
		
		g.appendChild(img.node);
		img.node.setAttribute("preserveAspectRatio", "xMinYMin");
		img.node.setAttribute("clip-path","url('#win-clip')");
		r_e['win'+index] = img;

/*  LABEL CODE - needs revision before use
		var label = R.text(bb.x+(bb.width/2), bb.y+bb.height-10, img.t ext);
		console.log(label);
		label.attr('class','label');
		var labelPos = "top";
		a.appendChild(label.node);
		if( bb.y > R.height/2 ) {
			label.attr('y',bb.y+13); 
			labelPos = "bottom";
		}
		lbb = label.getBBox();
	var labelBG = R.rect(bb.x, 
			labelPos == "bottom" ? bb.y : lbb.y-3,
			bb.width, 
			labelPos == "bottom" ? lbb.height +( lbb.y - bb.y) : (bb.y + bb.height + 3) - lbb.y
			);
		labelBG.attr('class','label bg');
		a.appendChild(labelBG.node);
		a.appendChild(label.node);
*/			
	}

function scaleTo( object, width, height) {
	console.log("scaling to "+width);
//don't do two scaling operations at once (not sure if this is needed)
	if(scaling == false){
		scaling = true;
		bb = object.getBBox();
		console.log(bb.width);
		scale = {
//1.01 multiply corrects for (floating point?) error in scale function
			w: 1.01 * (width / bb.width),
			h: height / bb.height
		}
		console.log(scale.w, scale.h);
//transform sometimes has unexpected results close to 1
		console.log(Math.abs(1 - scale.w) );
		if( Math.abs(1 - scale.w) > .0001 
			&& Math.abs(1 - scale.h) > .0001 ) {
			console.log("about to scale");
			object.transform("s"+scale.w +","+scale.h+","+0+","+0);
			console.log("new width is "+object.getBBox().width);
			}
		scaling = false;
		} else {
			console.log("skipping scale");
		}
}


var window_panel = {
		2: "M258.548,166.529c-88.35-0.037-177.698-0.072-266.048-0.138c0-56.13,0-112.261,0-168.392C80.739,5.009,170.082,9.829,258.548,12.446C258.548,63.806,258.548,115.168,258.548,166.529z M258.548,176.341c-88.35,0.137-177.699,0.401-266.048,0.776c0.003,53.628,0,107.256,0,160.883c88.239-7.009,177.582-11.819,266.048-14.446C258.548,274.482,258.548,225.412,258.548,176.341z M529.642,12.686c-88.443,2.212-172.881,2.237-261.325,0.05c0,51.265,0.003,102.529,0,153.794c88.442,0.02,172.884,0.019,261.325-0.001C529.642,115.249,529.642,63.967,529.642,12.686zM529.642,176.328c-88.441-0.118-172.885-0.121-261.326-0.002c0.007,48.979,0.004,97.959,0.001,146.937c88.443-2.186,172.882-2.175,261.325,0.052C529.642,274.319,529.642,225.323,529.642,176.328z M807.5-2C719.262,5.009,629.918,9.829,541.452,12.444c0,51.362,0,102.723,0,154.085c88.349-0.037,177.698-0.075,266.048-0.138C807.5,110.261,807.5,54.13,807.5-2z M807.5,177.117c-88.35-0.375-177.699-0.64-266.048-0.776c0,49.071,0,98.142,0,147.213c88.466,2.627,177.809,7.439,266.048,14.446C807.5,284.373,807.5,230.745,807.5,177.117z",
		1: "M258.548,166.529c-88.35-0.037-177.698-0.072-266.048-0.138c0-56.13,0-112.261,0-168.392C80.739,5.009,170.082,9.829,258.548,12.446C258.548,63.806,258.548,115.168,258.548,166.529z M529.642,12.686c-88.443,2.212-172.881,2.237-261.325,0.05c0,51.265,0.003,102.529,0,153.794c88.442,0.02,172.884,0.019,261.325-0.001C529.642,115.249,529.642,63.967,529.642,12.686z M807.5-2C719.262,5.009,629.918,9.829,541.452,12.444c0,51.362,0,102.723,0,154.085c88.349-0.037,177.698-0.075,266.048-0.138C807.5,110.261,807.5,54.13,807.5-2z"
	}

