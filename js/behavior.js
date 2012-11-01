var svg = "http://www.w3.org/2000/svg";

$(window).ready( function(){
	var gc = $('div.grid').get()[0];
	console.log(gc);
	$(gc).empty();
	gc.mSize = { w: $(gc).width(), h: $(gc).height() };
	var grid = Raphael(gc, gc.mSize.w, gc.mSize.h );
	var grid_el = gc.getElementsByTagName('svg')[0];
	console.log(grid);
	//$(gc).append(grid);
	var boxes = grid.set();
	window_paths.forEach(function(i){
		var win = boxes.push( grid.path(i));
		win.attr("fill","none").attr("stroke","#000");
		
	});

	scale = {
		bb: boxes.getBBox()
	}
	scale.w = (gc.mSize.w - scale.bb.width) / gc.mSize.w ;
	scale.h = (gc.mSize.h - scale.bb.height) / gc.mSize.h;
	scale.x = (gc.mSize.w - scale.bb.width) / 2;
	scale.y = (gc.mSize.h - scale.bb.height) / 2
	
	boxes.transform("t"+scale.x+","+scale.y+"s"+(scale.w+.98) +","+(scale.h+.95)+","+scale.bb.width/2+","+scale.bb.height/2);
	boxes.forEach( function(b,i) {
		var theClipPath=document.createElementNS(svg,"clipPath");
			theClipPath.setAttribute("id","win"+i);
			console.log(theClipPath);
			grid_el.appendChild(theClipPath);
			theClipPath.appendChild(b.node);
		var bb = b.getBBox();
		console.log(bb);
		var theImg = grid.image(images_loc[i],bb.x,bb.y-100,bb.width,bb.height+200);
		theImg.node.setAttribute("preserveAspectRatio", "xMinYMid");
		theImg.node.setAttribute("clip-path","url(#win"+i+")");
	});
});


var images_loc = [ 
	"images/fouts/a.png",
	"images/fouts/b.png",
	"images/fouts/c.png",
	"images/fouts/d.png",
	"images/fouts/e.png",
	"images/fouts/a.png",
]
var window_paths = [
	"M263.09,168.128C178.443,168.095,93.795,168.061,9.148,168c0-52.333,0-104.667,0-157c84.542,6.535,169.184,11.029,253.942,13.468C263.09,72.354,263.09,120.242,263.09,168.128z",
	"M263.09,314.531C178.332,316.979,93.69,321.465,9.148,328c0-50,0.003-100,0-150c84.647-0.349,169.295-0.596,253.943-0.724C263.09,223.028,263.09,268.779,263.09,314.531z",
	"M527.616,168.129c-84.736,0.019-169.472,0.02-254.208,0.001c0.003-47.797,0-95.593,0-143.39c84.739,2.039,169.47,2.015,254.208-0.048C527.616,72.504,527.616,120.316,527.616,168.129z",
	"M527.616,314.308c-84.737-2.075-169.471-2.086-254.208-0.047c0.003-45.666,0.006-91.332-0.001-136.998c84.736-0.11,169.473-0.108,254.209,0.002C527.616,222.945,527.616,268.627,527.616,314.308z",
	"M790,168c-84.647,0.058-169.295,0.095-253.942,0.128c0-47.887,0-95.774,0-143.661C620.816,22.028,705.459,17.534,790,11C790,63.333,790,115.667,790,168z",
	"M790,328c-84.542-6.534-169.184-11.021-253.942-13.469c0-45.752,0-91.503,0-137.255C620.705,177.404,705.353,177.651,790,178C790,228,790,278,790,328z"
	]
