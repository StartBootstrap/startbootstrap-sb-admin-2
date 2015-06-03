/** @namespace */
var THREEx	= THREEx 		|| {};

// TODO http://29a.ch/2011/9/11/uploading-from-html5-canvas-to-imgur-data-uri
// able to upload your screenshot without running servers

// forced closure
(function(){

	/**
	 * Take a screenshot of a renderer
	 * - require WebGLRenderer to have "preserveDrawingBuffer: true" to be set
	 * - TODO is it possible to check if this variable is set ? if so check it
	 *   and make advice in the console.log
	 *   - maybe with direct access to the gl context...
	 * 
	 * @param {Object} renderer to use
	 * @param {String} mimetype of the output image. default to "image/png"
	 * @param {String} dataUrl of the image
	*/
	var toDataURL	= function(renderer, mimetype)
	{
		mimetype	= mimetype	|| "image/png";
		var dataUrl	= renderer.domElement.toDataURL(mimetype);
		return dataUrl;
	}

	/**
	 * resize an image to another resolution while preserving aspect
	 *
	 * @param {String} srcUrl the url of the image to resize
	 * @param {Number} dstWidth the destination width of the image
	 * @param {Number} dstHeight the destination height of the image
	 * @param {Number} callback the callback to notify once completed with callback(newImageUrl)
	*/
	var _aspectResize	= function(srcUrl, dstW, dstH, callback){
		// to compute the width/height while keeping aspect
		var cpuScaleAspect	= function(maxW, maxH, curW, curH){
			var ratio	= curH / curW;
			if( curW >= maxW && ratio <= 1 ){ 
				curW	= maxW;
				curH	= maxW * ratio;
			}else if(curH >= maxH){
				curH	= maxH;
				curW	= maxH / ratio;
			}
			return { width: curW, height: curH };
		}
		// callback once the image is loaded
		var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
		var onLoad	= __bind(function(){
			// init the canvas
			var canvas	= document.createElement('canvas');
			canvas.width	= dstW;	canvas.height	= dstH;
			var ctx		= canvas.getContext('2d');

			// TODO is this needed
			ctx.fillStyle	= "black";
			ctx.fillRect(0, 0, canvas.width, canvas.height);

			// scale the image while preserving the aspect
			var scaled	= cpuScaleAspect(canvas.width, canvas.height, image.width, image.height);

			// actually draw the image on canvas
			var offsetX	= (canvas.width  - scaled.width )/2;
			var offsetY	= (canvas.height - scaled.height)/2;
			ctx.drawImage(image, offsetX, offsetY, scaled.width, scaled.height);

			// dump the canvas to an URL		
			var mimetype	= "image/png";
			var newDataUrl	= canvas.toDataURL(mimetype);
			// notify the url to the caller
			callback && callback(newDataUrl)
		}, this);

		// Create new Image object
		var image 	= new Image();
		image.onload	= onLoad;
		image.src	= srcUrl;
	}
	

	// Super cooked function: THREEx.Screenshot.bindKey(renderer)
	// and you are done to get screenshot on your demo

	/**
	 * Bind a key to renderer screenshot
	*/
	var bindKey	= function(renderer, opts){
		// handle parameters
		opts		= opts		|| {};
		var charCode	= opts.charCode	|| 'p'.charCodeAt(0);
		var width	= opts.width;
		var height	= opts.height;
		var callback	= opts.callback	|| function(url){
			window.open(url, "name-"+Math.random());
		};

		// callback to handle keypress
		var __bind	= function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
		var onKeyPress	= __bind(function(event){
			// return now if the KeyPress isnt for the proper charCode
			if( event.which !== charCode )	return;
			// get the renderer output
			var dataUrl	= this.toDataURL(renderer);

			if( width === undefined && height === undefined ){
				callback( dataUrl )
			}else{
				// resize it and notify the callback
				// * resize == async so if callback is a window open, it triggers the pop blocker
				_aspectResize(dataUrl, width, height, callback);				
			}
		}, this);

		// listen to keypress
		// NOTE: for firefox it seems mandatory to listen to document directly
		document.addEventListener('keypress', onKeyPress, false);

		return {
			unbind	: function(){
				document.removeEventListener('keypress', onKeyPress, false);
			}
		};
	}

	// export it	
	THREEx.Screenshot	= {
		toDataURL	: toDataURL,
		bindKey		: bindKey
	};
})();
