var rootColors = [],
	no_of_rows = 6;


var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(r){var t,e,o,a,h,n,c,d="",C=0;for(r=Base64._utf8_encode(r);C<r.length;)t=r.charCodeAt(C++),e=r.charCodeAt(C++),o=r.charCodeAt(C++),a=t>>2,h=(3&t)<<4|e>>4,n=(15&e)<<2|o>>6,c=63&o,isNaN(e)?n=c=64:isNaN(o)&&(c=64),d=d+this._keyStr.charAt(a)+this._keyStr.charAt(h)+this._keyStr.charAt(n)+this._keyStr.charAt(c);return d},decode:function(r){var t,e,o,a,h,n,c,d="",C=0;for(r=r.replace(/[^A-Za-z0-9\+\/\=]/g,"");C<r.length;)a=this._keyStr.indexOf(r.charAt(C++)),h=this._keyStr.indexOf(r.charAt(C++)),n=this._keyStr.indexOf(r.charAt(C++)),c=this._keyStr.indexOf(r.charAt(C++)),t=a<<2|h>>4,e=(15&h)<<4|n>>2,o=(3&n)<<6|c,d+=String.fromCharCode(t),64!=n&&(d+=String.fromCharCode(e)),64!=c&&(d+=String.fromCharCode(o));return d=Base64._utf8_decode(d)},_utf8_encode:function(r){r=r.replace(/\r\n/g,"\n");for(var t="",e=0;e<r.length;e++){var o=r.charCodeAt(e);128>o?t+=String.fromCharCode(o):o>127&&2048>o?(t+=String.fromCharCode(o>>6|192),t+=String.fromCharCode(63&o|128)):(t+=String.fromCharCode(o>>12|224),t+=String.fromCharCode(o>>6&63|128),t+=String.fromCharCode(63&o|128))}return t},_utf8_decode:function(r){for(var t="",e=0,o=c1=c2=0;e<r.length;)o=r.charCodeAt(e),128>o?(t+=String.fromCharCode(o),e++):o>191&&224>o?(c2=r.charCodeAt(e+1),t+=String.fromCharCode((31&o)<<6|63&c2),e+=2):(c2=r.charCodeAt(e+1),c3=r.charCodeAt(e+2),t+=String.fromCharCode((15&o)<<12|(63&c2)<<6|63&c3),e+=3);return t}};

var rand = function (min, max) {
	min = min || 0;
	max = max || 255;
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

var HSLtoRGB = function (h, s, l) {
	var H = h/60,
		l = l || 0.5,
		s = s || 1,
		c = (1-Math.abs(2*l-1))*s,
		x = c * (1 - Math.abs(H%2 - 1)),
		m = l - c/2,
		rgb = [];
	x = Math.floor(Math.round((x + m) * 255));
	c = Math.floor(Math.round((c + m) * 255));

	if (H < 1) {
		rgb[0] = c;
		rgb[1] = x;
		rgb[2] = 0;
	} else if (H >= 1 && H < 2) {
		rgb[0] = x;
		rgb[1] = c;
		rgb[2] = 0;
	} else if (H >= 2 && H < 3) {
		rgb[0] = 0;
		rgb[1] = c;
		rgb[2] = x;
	} else if (H >= 3 && H < 4) {
		rgb[0] = 0;
		rgb[1] = x;
		rgb[2] = c;
	} else if (H >= 4 && H < 5) {
		rgb[0] = x;
		rgb[1] = 0;
		rgb[2] = c;
	} else if (H >= 5 && H < 6) {
		rgb[0] = c;
		rgb[1] = 0;
		rgb[2] = x;
	}
	return rgb;
}

var RGBtoHSL = function (r, g, b) {
	var M = Math.max(r, g, b),
		m = Math.min(r, g, b),
		c = M - m,
		l = 0.5*(M/255 + m/255),
		H, h, s,
		hsl = [];

	if (c == 0) {
		H = null;
		s = 0;
	} else {
		s = (c/(1 - Math.abs(2*l - 1)))/2.55;
	}

	if (M == r) {
		H = ((g - b)/c) % 6;
	} else if (M == g) {
		H = ((b - r)/c) + 2;
	} else if (M == b) {
		H = ((r - g)/c) + 4;
	}

	h = 60*H;

	if (h < 0) {
		h = 360 - Math.abs(h);
	}

	if (h > 360) {
		alert(h);
	}

	l *= 100;

	 h = Math.round(h);
	 s = Math.round(s);
	 l = Math.round(l);

	 hsl[0] = h;
	 hsl[1] = s;
	 hsl[2] = l;

	return hsl;
} 

var Color = function (r, g, b) {
	var r = r || rand(),
		g = g || rand(),
		b = b || rand(),
		hsl = RGBtoHSL(r, g, b);

	this.r = r;
	this.g = g;
	this.b = b;

	this.id = 0;
	this.h = hsl[0];
	this.s = hsl[1];
	this.l = hsl[2];

	this.randomize = function () {
		r = rand();
		g = rand();
		b = rand();
		hsl = RGBtoHSL(r, g, b);
		this.r = r;
		this.g = g;
		this.b = b;
		this.h = hsl[0];
		this.s = hsl[1];
		this.l = hsl[2];
	}

	this.updateHSL = function () {
		hsl = RGBtoHSL(this.r, this.g, this.b);
		this.h = hsl[0];
		this.s = hsl[1];
		this.l = hsl[2];
	}

	this.memory = [];
}

function shuffle(o) {
    for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};

var Row = function() {
	var order, list, number = [];

	var units = [],
		i, j = 0, color_id,
		order = [],
		slivers = [];

	var numbers = [1, 2, 3, 4, 5];

	while (j < rand(4, 10)) {

		order[j] = rand(1, 5);
		if (order[j] != order[j - 1]) {
			j++;
		}
	}

	this.order = stripCommas(order);

	for (i = 0; i < 80; i++) {
		color_id = parseInt(order[i % order.length]) - 1;
		slivers[i] = color_id; 
		slivers[i].x = i * 0.125;
	}

	this.slivers = slivers;

	this.randomizeOrder = function () {
		j = 0;
		order = [];
		while (j < rand(4, 10)) {
			order[j] = rand(1, 5);
			if (order[j] != order[j - 1]) {
				j++;
			}
		}
		for (i = 0; i < 80; i++) {
			color_id = parseInt(order[i % order.length]) - 1;
			slivers[i] = color_id; 
		}
		this.order = stripCommas(order);
		this.slivers = slivers;
	}

}

function fiveNewColors(colors) {
	var colors = colors || [];
	for (i = 0; i < 5; i++) {
		colors[i] = new Color();
		for (j = 0; j < i; j ++) {
			var difference = Math.abs(colors[i].h - colors[j].h), correct = 0;
			while (!correct) {
				if (difference < 70) {
					colors[i] = new Color();
					difference = Math.abs(colors[i].h - colors[j].h);
				} else {
					correct = 1;
				}
			}
		}
		colors[i].id = i + 1;
	}
}

var stripCommas = function(arr) {
	return String(arr.join(''));
}

var app = angular.module("contrastApp", ['color.picker']);

app.directive('ngX', function() {
        return function(scope, element, attrs) {
            scope.$watch(attrs.ngX, function(value) {
                element.attr('x', value);
            });
        };
    });

app.directive('ngY', function() {
        return function(scope, element, attrs) {
            scope.$watch(attrs.ngX, function(value) {
                element.attr('y', value);
            });
        };
    });

app.controller('ColorsController', ['$scope', '$rootScope', function($scope, $rootScope) {
	var colors = new Array();

	fiveNewColors(colors);
	$rootScope.colors = colors;

	$scope.randomizeColors = function () {
		fiveNewColors(colors);
	}

	$scope.$watch('colors', function () {
		console.log("change");
		for (i = 0; i < 5; i++) {
			colors[i].updateHSL();
		}
	}, true);

}]);

app.controller('DisplayController', ['$scope', '$rootScope', function($scope, $rootScope) {

	var rows = [];

	for (i = 0; i < no_of_rows; i++) {
		rows[i] = new Row();
	}
	
	$scope.$watch('rows', function() {		
		for (i = 0; i < no_of_rows; i++) {
			order = String($scope.rows[i].order).split("");
			for (j = 0; j < 80; j++) {
				color_id = parseInt(rows[i].order[j % rows[i].order.length]) - 1;
				rows[i].slivers[j] = $rootScope.colors[color_id];
				rows[i].slivers[j].x = j * 0.125;
			}
		}
	}, true);

	$scope.rows = rows;

	$rootScope.whitespace = 0;
	$rootScope.blur = 0.5;

	$rootScope.changeBlur = function(blur, index, bool) {
	    if(bool === true) {
	        $rootScope.blurStyle = { webkitFilter: 'blur(' + blur + 'em)' };
	    } else if (bool === false) {
	        $rootScope.blurStyle = { filter: 'blur(' + 0 + 'em)' }; //or, whatever the original color is
	    }
	};

	$rootScope.$watch('colors', function() {
		for (i = 0; i < no_of_rows; i++) {
			for (j = 0; j < 80; j++) {
				color_id = parseInt(rows[i].order[j % rows[i].order.length]) - 1;
				rows[i].slivers[j] = $rootScope.colors[color_id];
				rows[i].slivers[j].x = j * 0.125;
			}
		}
		$scope.rows = rows;
	}, true);

}]);

function Download(url) {
    document.getElementById('download').src = url;
};

$(document).ready(function(){
	
	$("a.button").click(function(e){
		e.preventDefault();
	});

	 $("svg").attr({ version: '1.1' , xmlns:"http://www.w3.org/2000/svg"});

	 $(".dnld.button").bind('click', function() {
		var parent = $(this).attr('id'),
		 	svg = $('.' + parent).html(),
		 	b64 = Base64.encode(svg),
		 	url = 'data:image/svg+xml;base64,\n' + b64;
		 var a = $("<a>").attr("href-lang", "image/svg+xml").attr("href", url).attr("download", "fusion.svg").appendTo("body");
		 a[0].click();
		 a.remove();
	 });

});

app.directive("bnRange",function($compile){var rangePattern=/(-?\d+)(\.\.\.?)(-?\d+)/i;var cachedSets={};return({compile:compile,priority:1001,restirct:"A",terminal:true});function compile(tElement,tAttributes){var input=tAttributes.bnRange;if(missingRange(input)){throw(new Error("Missing valid range in the form of M..N (exclusive) or M...N (inclusive)."));}
			tAttributes.$set("ngRepeat",input.replace(rangePattern,replacePatternWithSet));tAttributes.$set(tAttributes.$attr.bnRange,null);return(link);}
			function link(scope,element,attributes){$compile(element,null,1001)(scope);scope.Math=window.Math;}
			function buildSet(from,to,isExclusive){var set=[];if(from<=to){for(var i=from;i<=to;i++){set.push(i);}}else{for(var i=from;i>=to;i--){set.push(i);}}
			if(isExclusive){set.pop();}
			return(set);}
			function missingRange(input){return(String(input).search(rangePattern)===-1);}
			function replacePatternWithSet(range,start,operator,end){if(cachedSets[range]){return(cachedSets[range]);}
			var from=parseInt(start,10);var to=parseInt(end,10);var isExclusive=(operator==="..");var set=buildSet(from,to,isExclusive);return(cachedSets[range]=angular.toJson(set));}});
