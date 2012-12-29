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
		cp.setAttribute("id","win");
		grid_el.appendChild(cp);
		var boxes = R.path( window_panel.path);
		cp.appendChild(boxes.node);


	scale = {
		bb: boxes.getBBox()
	}
	scale.w = (gc.w - scale.bb.width) / gc.w ;
	scale.h = (gc.h - scale.bb.height) / gc.h;
	scale.x = (gc.w - scale.bb.width) / 2;
	scale.y = (gc.h - scale.bb.height) / 2
	

	boxes.transform("s"+(scale.w+1) +","+(scale.h+1)+","+0+","+0);

	for(i=0; i < window_panel.count; i++) {
		var w = boxes.getBBox().width/3;
		var h = boxes.getBBox().height/2;
		console.log(w,h);
		if( i < (window_panel.count/2) ) {
			var x = i * w;
			var y = 0;
		} else if ( i <window_panel.count) {
			var x = (i-window_panel.count/2) * w;
			var y = h;
		}
		
		var g = document.createElementNS(svg,"g");
			g.setAttribute('id','win'+i);
			g.setAttribute('class','nav grid image');
			grid_el.appendChild( g );
		var a = document.createElementNS(svg,"a");
			a.setAttributeNS(xlink,"xlink:href","//");
			g.appendChild(a);
		
		var src_img = grid_images[i];
		console.log(src_img);
		var ratio = src_img.height / src_img.width;
		console.log(ratio);
		var img = R.image(src_img.src,
			x,
			y,
			w,
			w*ratio
		);
			img.toFront();
			a.appendChild(img.node);
			img.node.setAttribute("preserveAspectRatio", "xMinYMin");
 			img.node.setAttribute("clip-path","url('#win')");
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


var window_panel = {
		path: "M263.09,168.128C178.443,168.095,93.795,168.061,9.148,168c0-52.333,0-104.667,0-157c84.542,6.535,169.184,11.029,253.942,13.468C263.09,72.354,263.09,120.242,263.09,168.128z M263.09,177.276C178.442,177.404,93.795,177.651,9.147,178c0.003,50,0,100,0,150c84.542-6.535,169.184-11.021,253.942-13.469C263.09,268.779,263.09,223.028,263.09,177.276z M527.616,24.692c-84.738,2.063-169.47,2.086-254.208,0.048c0,47.797,0.003,95.593,0,143.39c84.736,0.019,169.472,0.018,254.208-0.001C527.616,120.316,527.616,72.504,527.616,24.692zM527.616,177.265c-84.736-0.11-169.473-0.112-254.209-0.002c0.007,45.666,0.004,91.332,0.001,136.998c84.738-2.039,169.471-2.028,254.208,0.047C527.616,268.627,527.616,222.945,527.616,177.265z M790,11c-84.541,6.534-169.184,11.028-253.942,13.467c0,47.887,0,95.774,0,143.661c84.647-0.034,169.295-0.07,253.942-0.128C790,115.667,790,63.333,790,11z M790,178c-84.647-0.349-169.295-0.596-253.942-0.724c0,45.752,0,91.503,0,137.255c84.759,2.448,169.4,6.935,253.942,13.469C790,278,790,228,790,178z",
		count: "6"
	}