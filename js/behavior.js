var svg = "http://www.w3.org/2000/svg";
var xlink = "http://www.w3.org/1999/xlink";

$(window).ready( function(){
	var gc = $('div.grid').get()[0];

	var grid_images = [];
	$('li.nav.grid.item a').get().forEach(function(o,i){
			grid_images.push({
				src: o.getElementsByTagName('img')[0].getAttribute('src'),
				href: o.getAttribute('href'),
				width: $(o).find('img').width(),
				height: $(o).find('img').height(),
				text: o.textContent,
				});
		});
		

	$(gc).empty();
	gc.w = $(gc).width();
	gc.h = $(gc).height();
	
	var R = Raphael(gc, gc.w, gc.h );
	var grid_el = gc.getElementsByTagName('svg')[0];
	
	var cp=document.createElementNS(svg,"clipPath");
		cp.setAttribute("id","win-clip");
		grid_el.appendChild(cp);
		var boxes = R.path( window_panel.path);
		cp.appendChild(boxes.node);


	
	scaleTo(boxes, gc.w, gc.h);	

	

	for(i=0; i < window_panel.count; i++) {
		var w = boxes.getBBox().width/3;
		var h = boxes.getBBox().height/2;

		var x = i%(window_panel.count/2) * w;
		var y = Math.floor(i/(window_panel.count/2)) * h;

		
		var g = document.createElementNS(svg,"g");
			g.setAttribute('id','win'+i);
			g.setAttribute('class','nav grid image');
			grid_el.appendChild( g );
		var a = document.createElementNS(svg,"a");
			a.setAttributeNS(xlink,"xlink:href","//");
			g.appendChild(a);
		
		var src_img = grid_images[i];

		var ratio = src_img.height / src_img.width;

		var img = R.image(src_img.src, x, y, w,	w*ratio	);
			img.toFront();
			
			a.appendChild(img.node);
			img.node.setAttribute("preserveAspectRatio", "xMinYMin");
 			img.node.setAttribute("clip-path","url('#win-clip')");
/*
			var label = R.text(bb.x+(bb.width/2), bb.y+bb.height-10, img.text);
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
});

function scaleTo( object, width, height) {
	bb = object.getBBox();
	scale = {
		w: (width - bb.width) / width,
		h: (height - bb.height) / height
	}
	object.transform("s"+(scale.w+1) +","+(scale.h+1)+","+0+","+0);
}

var window_panel = {
		path: "M257.548,166.529c-88.35-0.037-176.698-0.072-265.048-0.138c0-56.13,0-112.261,0-168.392C80.739,5.009,169.082,9.829,257.548,12.446C257.548,63.806,257.548,115.168,257.548,166.529z M257.548,176.341c-88.35,0.137-176.699,0.401-265.048,0.776c0.003,53.628,0,107.256,0,160.883c88.239-7.009,176.582-11.819,265.048-14.446C257.548,274.482,257.548,225.412,257.548,176.341z M533.642,12.686c-88.443,2.212-176.881,2.237-265.325,0.05c0,51.265,0.003,102.529,0,153.794c88.442,0.02,176.884,0.019,265.325-0.001C533.642,115.249,533.642,63.967,533.642,12.686zM533.642,176.328c-88.441-0.118-176.885-0.121-265.326-0.002c0.007,48.979,0.004,97.959,0.001,146.937c88.443-2.186,176.882-2.175,265.325,0.052C533.642,274.319,533.642,225.323,533.642,176.328z M807.5-2C719.262,5.009,630.918,9.829,542.452,12.444c0,51.362,0,102.723,0,154.085c88.349-0.037,176.698-0.075,265.048-0.138C807.5,110.261,807.5,54.13,807.5-2z M807.5,177.117c-88.35-0.375-176.699-0.64-265.048-0.776c0,49.071,0,98.142,0,147.213c88.466,2.627,176.809,7.439,265.048,14.446C807.5,284.373,807.5,230.745,807.5,177.117z",
		count: "6"
	}