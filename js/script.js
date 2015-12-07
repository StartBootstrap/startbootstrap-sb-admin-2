var importedData = new Array();
var importedDataSize = importedData.length;
var isDataImported = false;
var HeatMapData = new Array();
var outputPath3D = null;
var TreeData = [];


// Array recording which operators have been processed
// index 0 = filter
// index 1 = group
// index 2 = aggregate
// index 3 = 2D
// index 4 = 3D
var processedOperators = new Array();
processedOperators.push(false);
processedOperators.push(false);
processedOperators.push(false);
processedOperators.push(false);
processedOperators.push(false);

function loadDataStreams(){

	for (var i = importedDataSize; i < importedData.length; i++) {
		text = importedData[i];
		loadHelper('filterDataStream', text);
		loadHelper('groupDataStream', text);	
		loadHelper('aggregateDataStream', text);
	 	loadHelper('2dCoDataStream1', text);
	 	loadHelper('2dCoDataStream2', text);
	 	loadHelper('3dStreams1', text);
	 	loadHelper('3dStreams2', text);
	 	loadHelper('3dStreams3', text);
	};
	importedDataSize = importedData.length;

	function loadHelper(streamId, text) {
		var select = document.getElementById(streamId);
		var option = document.createElement('option');
		option.text = text;
		select.add(option);
	}

	
}

function Tuple(param1, param2){
	this.param1 = param1;
	this.param2 = param2;
	this.getParam1 = function(){
		return this.param1;
	}
	this.getParam2 = function(){
		return this.param2;
	}
}


// -----------------------       Operator Classes      -----------------------------


//creating a Filter class
function Filter(dataStream, minMaxValue, minMaxNormalization, northEastCoords, southWestCoords){
	this.dataStream = dataStream;
	this.minValue = minMaxValue.getParam1;
	this.maxValue = minMaxValue.getParam2;
	this.northEastLong = northEastCoords.getParam1;
	this.northEastLat = northEastCoords.getParam2;
	this.southWestLong = southWestCoords.getParam1;
	this.southWestLat = southWestCoords.getParam2;

	this.getDataStream = function(){
		return this.dataStream;
	}
	this.getMinValue = function(){
		return this.minValue;
	}
	this.getMaxValue = function(){
		return this.maxValue;
	}
	this.getNorthEastLong = function(){
		return this.northEastLong;
	}
	this.getNorthEastLat = function(){
		return this.northEastLat;
	}
	this.getSouthWestLong = function(){
		return this.southWestLong;
	}
	this.getSouthWestLat = function(){
		return this.southWestLat;
	}
}

//creating a 3D co-occurrence class
function threeD(dataStream1, dataStream2, dataStream3, timeLagValue1, timeLagValue2, timeLagUnit1, timeLagUnit2){
	this.dataStream1 = dataStream1;
	this.dataStream2 = dataStream2;
	this.dataStream3 = dataStream3;
	
	this.timeLagValue1 = timeLag1;
	this.timeLagValue2 = timeLag2;
	
	this.timeLagValue1 = timeLagValue1;
	this.TimeLagValue2 = timeLagValue2;
	
	this.getdataStream1 = function(){
		return this.dataStream1;
	}
	
	this.getdataStream2 = function(){
		return this.dataStream2;
	}
	
	this.getdataStream3 = function(){
		return this.dataStream3;
	}
	
	this.gettimeLagValue1 = function()
	{
		return this.timeLagValue1;
	}
	
	this.gettimeLagValue2 = function()
	{
		return this.timeLagValue2;
	}
	
	this.gettimeLagUnit1 = function()
	{
		return this.timeLagUnit1;
	}
	
	this.gettimeLagUnit2 = function()
	{
		return this.timeLagUnit2;
	}
	
}


// ----------        Validate Functions      -------------------


//Makes sure input is not empty
function isValidInput(input){
	return input !== "";
}


function validateImportData(){
	var lifeEvents = document.getElementById("lifeEvents");
	var environmental = document.getElementById("environmental");
	var traffic = document.getElementById("traffic");
	var socialMedia = document.getElementById("socialMedia");

	if (isValidInput(lifeEvents.value)){
		// if not in the array
		if ($.inArray(lifeEvents.value, importedData) == -1){
			importedData.push(lifeEvents.value);
		} else{
			alert("life event data stream already imported");
		}
	}
	
	if (isValidInput(environmental.value)){
		if ($.inArray(environmental.value, importedData) == -1){
			importedData.push(environmental.value);
		} else{
			alert("environmental data stream already imported");
		}
	}
	
	
	if (isValidInput(traffic.value)){
		if ($.inArray(traffic.value, importedData) == -1){
			importedData.push(traffic.value);
		} else{
			alert("traffic data stream already imported");
		}
	}

	if (isValidInput(socialMedia.value)){
		if ($.inArray(socialMedia.value, importedData) == -1){
			importedData.push(socialMedia.value);
		} else{
			alert("social media data stream already imported");
		}
	}
	document.getElementById("importClose").click();
}


function validateFilterInput(){
	//check data stream
	if (!isValidInput(document.getElementById("filterDataStream").value)){
		document.getElementById("filterDataStreamDiv").className = "form-group has-error";
		var dataStream = document.getElementById("filterDataStream");
		$(dataStream).on("change", function(){
			if (isValidInput(dataStream.value)){
				dataStream.parentNode.parentNode.className = "form-group";	
				
			}
		})
	}

	//if the value checkbox is checked, inspect the min and max input boxes
	var valueCheck = document.getElementById("filterValue");
	var minValue = document.getElementById("inputFilterValueMin");
	var maxValue = document.getElementById("inputFilterValueMax");
	if (valueCheck.checked){
		if (!isValidInput(minValue.value)){
			minValue.parentNode.className = "control-label has-error";
			$(minValue).on("change", function(){
				if (isValidInput(minValue.value)){
					minValue.parentNode.className = "control-label";
				}
			})
		}

		if (!isValidInput(maxValue.value)){
			maxValue.parentNode.className = "control-label has-error";
			$(maxValue).on("change", function(){
				if (isValidInput(maxValue.value)){
					maxValue.parentNode.className = "control-label";
				}
			})
		}		
	} else{
		minValue.parentNode.className = "control-label";
		maxValue.parentNode.className = "control-label";
	}
	

	//validate Location checkbox
	var locationCheck = document.getElementById("filterLocation")
	var neLong = document.getElementById("inputFilterNELong");
	var neLat = document.getElementById("inputFilterNELat");
	var swLong = document.getElementById("inputFilterSWLong");
	var swLat = document.getElementById("inputFilterSWLat");
	if (locationCheck.checked){

		if (!isValidInput(neLong).value){
			neLong.parentNode.className = "control-label has-error";
			$(neLong).on("change", function(){
				if (isValidInput(neLong.value)){
					neLong.parentNode.className = "control-label";
				}
			})
		}	

		if (!isValidInput(neLat).value){
			neLat.parentNode.className = "control-label has-error";
			$(neLat).on("change", function(){
				if (isValidInput(neLat.value)){
					neLat.parentNode.className = "control-label";
				}
			})
		}

		if (!isValidInput(swLong).value){
			swLong.parentNode.className = "control-label has-error";
			$(swLong).on("change", function(){
				if (isValidInput(swLong.value)){
					swLong.parentNode.className = "control-label";
				}
			})
		}

		if (!isValidInput(swLat).value){
			swLat.parentNode.className = "control-label has-error";
			$(swLat).on("change", function(){
				if (isValidInput(swLat.value)){
					swLat.parentNode.className = "control-label";
				}
			})
		}
	} 
	else{
		neLong.parentNode.className = "control-label";
		neLat.parentNode.className = "control-label";
		swLong.parentNode.className = "control-label";
		swLat.parentNode.className = "control-label";
	}
	historyTree("Filter");
	document.getElementById("filterClose").click();
}

function filterHasErrors(){
	// function that scans through all of the tags and check if they have the class 'has-errors' attribute
	var dataStreamDiv = document.getElementById("filterDataStreamDiv"); 
	//if substring not found, indexOf will return -1
	if (dataStreamDiv.className.indexOf("has-error") > -1){
		return true;
	}

	var myArray = new Array();
		var minValue = document.getElementById("inputFilterValueMin"); 
		var maxValue = document.getElementById("inputFilterValueMax"); //.parentNode.className
		var neLong = document.getElementById("inputFilterNELong");
		var neLat = document.getElementById("inputFilterNELat");
		var swLong = document.getElementById("inputFilterSWLong");
		var swLat = document.getElementById("inputFilterSWLat"); //.parentNode.className
		myArray.push(minValue);
		myArray.push(maxValue);
		myArray.push(neLong);
		myArray.push(neLat);
		myArray.push(swLong);
		myArray.push(swLat);
	
	for (i = 0; i < myArray.length; i++){
		if (myArray[i].parentNode.className.indexOf("has-error") > -1){
			return true;
		}
	}
	return false;
}


function validate2DInput(){
	var dataStream1 = $('#2dCoDataStream1>option:selected').text();
    var dataStream2 = $('#2dCoDataStream2>option:selected').text();
	if (!isValidInput(dataStream1.value)){
		dataStream1.parentNode.parentNode.className = "form-group has-error";
		$(dataStream1).on("change", function(){
			if (isValidInput(dataStream1.value)){
				dataStream1.parentNode.parentNode.className = "form-group";
			}
			else {
				alert("Datastream 1 missing!");
			}
		})
	}
	

	if (!isValidInput(dataStream2.value)){
		dataStream2.parentNode.parentNode.className = "form-group has-error";
		$(dataStream2).on("change", function(){
			if (isValidInput(dataStream2.value)){
				dataStream2.parentNode.parentNode.className = "form-group";
			}
			else {
				alert("Datastream 2 missing!");
			}
		})
	}

	var timeLagValue = document.getElementById("timeLagValue");
	if (isValidInput(timeLagValue.value) && !isNaN(timeLagValue.value)){
		timeLagValue.parentNode.className = "control-label has-error";
		$(timeLagValue).on("change", function(){
			if (isValidInput(timeLagValue.value)){
				timeLagValue.parentNode.className = "control-label";
			}
			
		})
	}
	else {
				alert("Time lag missing!");
			}

	var timeLagUnit = document.getElementById("timeLagUnit");
	if (!isValidInput(timeLagUnit.value)){
		timeLagUnit.parentNode.className = "control-label has-error";
		$(timeLagUnit).on("change", function(){
			if (isValidInput(timeLagUnit.value)){
				timeLagUnit.parentNode.className = "control-label";
			}
			else {
				alert("Time lag unit missing!");
			}
		})
	}
	historyTree("2 Dimensional Data");
	document.getElementById("2DClose").click();
}


function validateThreeDInput() {
	
	var ddl = document.getElementById("3dStreams1");
	var selectedValue = ddl.options[ddl.selectedIndex].value;
	if (selectedValue == "default")
		{
			alert("Datastream 1 missing!");
		}
	
	var ddl = document.getElementById("3dStreams2");
	var selectedValue = ddl.options[ddl.selectedIndex].value;
	if (selectedValue == "default")
		{
			alert("Datastream 2 missing!");
		}
		
	var ddl = document.getElementById("3dStreams3");
	var selectedValue = ddl.options[ddl.selectedIndex].value;
	if (selectedValue == "default")
		{
			alert("Datastream 3 missing!");
		}
	
	var myInput = document.getElementById("value1").value;
	if (/^\s*$/.test(myInput)) {
		alert("Time Lag 1: Value is empty!");
	}

	var myInput = document.getElementById("value2").value;
	if (/^\s*$/.test(myInput)) {
		alert("Time Lag 2: Value is empty!");
	}
	historyTree("3 Dimensional Data");
}


//  -------------------------    Process Functions   ---------------------


function processFilter(){
	if (!filterHasErrors()){
		var dataStream = document.getElementById("filterDataStream");

		var minValue = document.getElementById("inputFilterValueMin");
		var maxValue = document.getElementById("inputFilterValueMax");
		var minMaxValue = new Tuple(minValue, maxValue);

		var neLong = document.getElementById("inputFilterNELong");
		var neLat = document.getElementById("inputFilterNELat");
		var northEastCoords = new Tuple(neLong, neLat);

		var swLong = document.getElementById("inputFilterSWLong");
		var swLat = document.getElementById("inputFilterSWLat");
		var southWestCoords = new Tuple(swLong, swLat);

		var filterObject = new Filter(dataStream, minMaxValue, minMaxNorm, northEastCoords, southWestCoords);
		var myDataStream = filterObject.getMinValue();

		document.getElementById("filterClose").click();

	} 
}


function process3D () {
	var data; //global
	var output_data;
	var output_path = "../queries";
	
    d3.json("../queries/queries.json", function(error, json){
        if (error) return console.warn(error);
        data = json;
        for (var i = 0; i < data.queries.length; i++) {
        	var inputs = data.queries[i].input;
        	if (data.queries[i].operator.name === "3Dco_occurrence" && inputs[0] == "es1" && inputs[1] == "es2" && inputs[2] == "es3"){
        		output_path += data.queries[i].output['3dmatrix'];
        	}
        } 
        processedOperators[4] = true;
        outputPath3D = output_path;
		document.getElementById("3DClose").click(); 
    })
}




// Visualize Functions



function visualize3D () {
	if (processedOperators[4]){

		setup3DBackground();

		render3DBackground(outputPath3D);

		historyTree("3D Heatmap");
	} else{
		alert("Fill out the 3D Processor first");
	}
}

function setup3DBackground(){
	var html = "<div id='container' style='margin-left: 200px; display:inline-block;'></div>";
	var visualizationPanel = document.getElementById("visualizationPanel");	
	visualizationPanel.innerHTML = html;
}


function render3DBackground (path) {
	var scene, renderer, composer;
    var camera, cameraControl;
    var geometry, surfacemesh, wiremesh;
    var meshers = { 'Stupid': StupidMesh };
    var testdata = {};
    
    
    function updateMesh() {
    
      scene.remove( surfacemesh );
      scene.remove( wiremesh );
      
      geometry  = new THREE.Geometry();   
      var mesher = meshers['Stupid']
        , data   = testdata['22x22x22']
        , result = mesher( data.voxels, data.dims );

      geometry.vertices.length = 0;
      geometry.faces.length = 0;

      

	  // populate cube with vertices
      for(var i=0; i<result.vertices.length; ++i) {
        var q = result.vertices[i];
        geometry.vertices.push(new THREE.Vector3(q[0], q[1], q[2]));
      }

      var yellow = 0xffff00;
      var orange = 0xff8000;
      var red = 0xFF0000;

      var jsonData;
      d3.json(path, function(error, json){
        if (error) return console.warn(error);
        jsonData = json;
        console.log(jsonData[0]);
        // for (var i = 0; i < jsonData[0].length; i++) {
        // 	console.log(jsonData[i]);
        // };
      });

      // populates colors of faces
      for(var i=0; i<result.faces.length; ++i) {
        var q = result.faces[i];
        var f = new THREE.Face4(q[0], q[1], q[2], q[3]);
        // f.color = new THREE.Color(q[4]);

        f.color = new THREE.Color(yellow);

        f.vertexColors = [f.color,f.color,f.color,f.color];
        geometry.faces.push(f);
        
      }
      
      geometry.computeFaceNormals();
      
      geometry.verticesNeedUpdate = true;
      geometry.elementsNeedUpdate = true;
      geometry.normalsNeedUpdate = true;
      
      geometry.computeBoundingBox();
      geometry.computeBoundingSphere();
      
      var bb = geometry.boundingBox;

      
       //Create surface mesh
      var material  = new THREE.MeshBasicMaterial({
        vertexColors: true
      });
      surfacemesh = new THREE.Mesh( geometry, material );
      surfacemesh.doubleSided = false;
      var wirematerial = new THREE.MeshBasicMaterial({
          color : 0xffffff
        , wireframe : true
      });
      wiremesh = new THREE.Mesh(geometry, wirematerial);
      wiremesh.doubleSided = true;
      
      wiremesh.position.x = surfacemesh.position.x = -(bb.max.x + bb.min.x) / 2.0;
      wiremesh.position.y = surfacemesh.position.y = -(bb.max.y + bb.min.y) / 2.0;
      wiremesh.position.z = surfacemesh.position.z = -(bb.max.z + bb.min.z) / 2.0;
      
      scene.add( surfacemesh );
      scene.add( wiremesh );
    }

    if( !init() ) animate();

    // init the scene
    function init(){
        
      if( Detector.webgl ){
        renderer = new THREE.WebGLRenderer({
          antialias   : true, // to get smoother output
          preserveDrawingBuffer : true  // to allow screenshot
        });
      }else{
        renderer = new THREE.CanvasRenderer();
      }
      renderer.setClearColorHex( 0xffffff, 1 );
      
      renderer.setSize( 600, 380 );
      document.getElementById('container').appendChild(renderer.domElement);

      // create a scene
      scene = new THREE.Scene();

      // put a camera in the scene
      camera  = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 1, 10000 );
      camera.position.set(0, 0, 40);
      scene.add(camera);

      // create a camera contol
      cameraControls  = new THREE.TrackballControls( camera, document.getElementById('container') )

      

      
      // //Initialize dom elements
      testdata = createCustomTestData();
      // var ds = document.getElementById("datasource");
      // for(var id in testdata) {
      //   ds.add(new Option(id, id), null);
      // }
      // ds.onchange = updateMesh;

      // var ms = document.getElementById("mesher");
      // for(var alg in meshers) {
      //   ms.add(new Option(alg, alg), null);
      // }
      // ms.onchange = updateMesh;
      
      
      
      //Update mesh
      updateMesh();
      
      return false;
    }

    function createCustomTestData() {
	  var result = {};
	  
	  function makeVoxels(l, h, f) {
	    var d = [ h[0]-l[0], h[1]-l[1], h[2]-l[2] ]
	      , v = new Int32Array(d[0]*d[1]*d[2])
	      , n = 0;
	    for(var k=l[2]; k<h[2]; ++k)
	    for(var j=l[1]; j<h[1]; ++j)
	    for(var i=l[0]; i<h[0]; ++i, ++n) {
	      v[n] = f(i,j,k);
	    }
	    return {voxels:v, dims:d};
	  }

	  result['22x22x22'] = makeVoxels([0,0,0], [22,22,22], function() { return 0xffff00; });

	  return result;
	}


    // animation loop
    function animate() {

      // loop on request animation loop
      // - it has to be at the begining of the function
      // - see details at http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
      requestAnimationFrame(animate);

      // do the render
      render();
    }

    // render the scene
    function render() {
      // variable which is increase by Math.PI every seconds - usefull for animation
      var PIseconds = Date.now() * Math.PI;

      // update camera controls
      cameraControls.update();

      // surfacemesh.visible = document.getElementById("showfacets").checked;
      // wiremesh.visible = document.getElementById("showedges").checked;
      surfacemesh.visible = true;
      wiremesh.visible = true;

      // actually render the scene
      renderer.render( scene, camera );
    }
}

function load2dVisual() {
    d3.json('../queries/queries.json', function(error, data) {
        var dataStream1 = $('#2dCoDataStream1>option:selected').text();
        var dataStream2 = $('#2dCoDataStream2>option:selected').text();
        var unit = $('#timeLagUnit>option:selected').text();
        var lag = parseInt(document.getElementById('timeLagValue').value);
        var pass = false;

        for (i = 0; i < data["queries"].length; i++) {
            if (data["queries"][i].input[0] == dataStream1 &&
                data["queries"][i].input[1] == dataStream2 &&
                data["queries"][i].operator["parameters"]["time_lag"] == lag &&
                data["queries"][i].validvo == "2d-heatmap" &&
                data["queries"][i].operator["parameters"]["time_resolution"] == unit) {
                data = data["queries"][i].output["cooccurrence"];
                pass = true;
                break;
            }
        }

        var cells, colorScale, colors, corXscale, corYscale, corZscale, corr, corrplot, drawScatter, h, i, innerPad, j, nGroup, nind, nvar, pad, scatterplot, svg, totalh, totalw, w;
        h = 550;
        w = h;
        pad = {
            left: 25,
            top: 5,
            right: 25,
            bottom: 60
        };
        innerPad = 5;
        totalh = h + pad.top + pad.bottom;
        totalw = (w + pad.left + pad.right);
        // remove previous content
        d3.select("#svgHeatmap").remove();
        d3.select("#legend").remove();

        if (pass) {

        //add an svg to the div
        svg = d3.select("#heatmap").append("svg")
        	.attr("id","svgHeatmap")
        	.attr("class", "col-md-6")
        	.attr("height", totalh)
        	.attr("width", totalw)
        	.attr("preserveAspectRatio", "xMinYMin meet")
    		.attr("viewBox", "0 0 650 600");
        //add one group for correlation matrix
        corrplot = svg.append("g").attr("id", "corrplot").attr("transform", "translate(" + pad.left + "," + pad.top + ")");
        //add another group for scatter plot
        scatterplot = svg.append("g").attr("id", "scatterplot").attr("transform", "translate(" + (pad.left * 2 + pad.right + w) + "," + pad.top + ")");
        nind = data.length;
        nvar = data[0].length;

        corXscale = d3.scale.ordinal().domain(d3.range(nvar)).rangeBands([0, w]);
        corYscale = d3.scale.ordinal().domain(d3.range(nvar)).rangeBands([h, 0]);
        corZscale = d3.scale.linear().domain([0, 1]).range([0, 1]);

        corr = [];
        var pixelvalues = [];
        var index = 0;

        for (i in data) {
            for (j in data[i]) {
                pixelvalues[index] = data[i][j];
                index++;
                corr.push({
                    row: i,
                    col: j,
                    value: data[i][j]
                });
            }
        }

        ///////////Heatmap Colors /////////////////////////////////////////////////////////
        /*var colours = ["#6363FF", "#6373FF", "#63A3FF", "#63E3FF", "#63FFFB", "#63FFCB",
                       "#63FF9B", "#63FF6B", "#7BFF63", "#BBFF63", "#DBFF63", "#FBFF63", 
                       "#FFD363", "#FFB363", "#FF8363", "#FF7363", "#FF6364"]; */
        var colours = ["#FFFFCC", "#FFFF99", "#FFFF66", "#FFFF33", "#FFFF00", "#FFE066",
            "#FFCC00", "#FFCC66", "#FF9900", "#FF9933", "#FF9966",
            "#FF6600", "#FF3300", "#CC3300"
        ];

        var colorScale = d3.scale.quantile()
              .domain([0, 14, d3.max(data, function (d) { return d.value; })])
              .range(colours);

        var heatmapColour = d3.scale.linear()
            .domain(d3.range(0, 1, 1.0 / (colours.length - 1)))
            .range(colours);
        //var c = d3.scale.linear().domain(d3.extent(pixelvalues)).range([0,1]);
        var c = d3.scale.linear().domain(d3.extent([0, 1])).range([0, 1]);

        var legend = d3.select("#heatmap").append("svg")
        	.attr("id","legend")
        	.attr("class", "col-md-6")
        	.attr("preserveAspectRatio", "xMinYMin meet")
    		.attr("viewBox", "0 0 650 200")
        	.selectAll(".legend")
              .data([0].concat(colorScale.quantiles()), function(d) { return d; })
              .enter().append("g")
              .attr("class", "legend");

          legend.append("rect")
            .attr("x", function(d, i) { return totalw/12 * i; })
            .attr("y", 0)
            .attr("width", totalw/10)
            .attr("height", totalh / 5)
            .style("fill", function(d, i) { return colours[i]; });

          legend.append("text")
            .attr("class", "mono")
            .text(function(d, i) {console.log(); return "≥ " + d3.format(".2f")(d/14); })
            .attr("x", function(d, i) { return totalw/12 * i; })
            .attr("y", totalh/5);
        ///////////////////////////////////////////////////////////////////////////////////

        cells = corrplot.selectAll("empty").data(corr).enter().append("rect").attr("class", "cell").attr("x", function(d) {
            return corXscale(d.col);
        }).attr("y", function(d) {
            return corYscale(d.row);
        }).attr("width", corXscale.rangeBand()).attr("height", corYscale.rangeBand()).attr("fill", function(d) {
            return heatmapColour(c(d.value)); //instead of corZscale(d.value)
        }).attr("stroke", "none").attr("stroke-width", 1).on("mouseover", function(d) {
            d3.select(this).attr("stroke", "black");
            corrplot.append("text").attr("id", "corrtext").text(d3.format(".3f")(d.value)).attr("x", function() {
                var mult;
                mult = -1;
                if (d.col < nvar / 2) {
                    mult = +1;
                }
                return corXscale(d.col) + corXscale.rangeBand();
                //return corXscale(d.col) + mult * corXscale.rangeBand() * 5;
            }).attr("y", function() {
                var mult;
                mult = +1;
                if (d.row < nvar / 2) {
                    mult = -1;
                }
                return corYscale(d.row) + 0.5 * corYscale.rangeBand();
                //return corYscale(d.row) + (mult + 0.5) * corYscale.rangeBand() * 2;
            }).attr("fill", "black").attr("dominant-baseline", "middle").attr("text-anchor", "middle").style("font-weight", "bold");
            corrplot.append("text").attr("class", "corrlabel").attr("x", corXscale(d.col) + 12).attr("y", h + pad.bottom * 0.2).text(d.col).attr("dominant-baseline", "middle").attr("text-anchor", "middle").attr("font-size", "13px");
            return corrplot.append("text").attr("class", "corrlabel").attr("y", corYscale(d.row) + 12).attr("x", -pad.left * 0.7).text(d.row).attr("dominant-baseline", "middle").attr("text-anchor", "middle").attr("font-size", "13px");
        }).on("mouseout", function() {
            d3.selectAll("text.corrlabel").remove();
            d3.selectAll("text#corrtext").remove();
            return d3.select(this).attr("stroke", "none");
        });

        corrplot.append("rect").attr("height", h).attr("width", w).attr("fill", "none").attr("stroke", "black").attr("stroke-width", 1).attr("pointer-events", "none");
        return d3.select("#legend").style("opacity", 1);
    }
    else {
        $('#heatmap').html("<svg id='svgHeatmap' width='100%' height='400px'><text y='100' font-size='30' fill='red'>Sorry, no data for the specified parameters.</text></svg>");
    }
    });
	historyTree("2D Heatmap");
}

function historyTree(stream) {
	if (TreeData.length == 0) {
		TreeData = [{
    		"name": stream,
    		"parent": "null"
   		}];
	}
	else {
		TreeData = [{
			"name": TreeData[0].name,
			"parent": "null",
			"children": [{
				"name": stream,
				"parent": TreeData[0].name
			}]
		}];
	}
	
// ************** Generate the tree diagram  *****************
var margin = {top: 40, right: 10, bottom: 20, left: 10},
    width = 450 - margin.right - margin.left,
    height = 550 - margin.top - margin.bottom;
    
var i = 0,
    duration = 750,
    root;

var tree = d3.layout.tree()
    .size([height, width]);

var diagonal = d3.svg.diagonal()
    .projection(function(d) { return [d.x, d.y]; });

// remove previous content
d3.select("#svgHistory").remove();

var svg = d3.select("#history").append("svg")
	.attr("id","svgHistory")
    .attr("preserveAspectRatio", "xMinYMin meet")
    .attr("viewBox", "0 0 560 800")
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

root = TreeData[0];
root.x0 = height / 2;
root.y0 = 0;
  
update(root);

function update(source) {

  // Compute the new tree layout.
  var nodes = tree.nodes(root).reverse(),
      links = tree.links(nodes);

  // Normalize for fixed-depth.
  nodes.forEach(function(d) { d.y = d.depth * 160; });

  // Update the nodes…
  var node = svg.selectAll("g.node")
      .data(nodes, function(d) { return d.id || (d.id = ++i); });

  // Enter any new nodes at the parent's previous position.
  var nodeEnter = node.enter().append("g")
      .attr("class", "node")
      .attr("transform", function(d) { return "translate(" + source.x0 + "," + source.y0 + ")"; })
      .on("click", click);

  nodeEnter.append("circle")
      .attr("r", 1e-6)
      .style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; });

   nodeEnter.append("text")
   .attr("y", function(d) { 
    return d.children || d._children ? -18 : 18; })
   .attr("dy", ".2em")
   .attr("text-anchor", "middle")
   .text(function(d) { return d.name; })
   .style("fill-opacity", 1)
   .style("font-size", "20px");

  // Transition nodes to their new position.
  var nodeUpdate = node.transition()
      .duration(duration)
      .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

  nodeUpdate.select("circle")
      .attr("r", 10)
      .style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; });

  nodeUpdate.select("text")
      .style("fill-opacity", 1);

  // Transition exiting nodes to the parent's new position.
  var nodeExit = node.exit().transition()
      .duration(duration)
      .attr("transform", function(d) { return "translate(" + source.x + "," + source.y + ")"; })
      .remove();

  nodeExit.select("circle")
      .attr("r", 1e-6);

  nodeExit.select("text")
      .style("fill-opacity", 1e-6);

  // Update the links…
  var link = svg.selectAll("path.link")
      .data(links, function(d) { return d.target.id; });

  // Enter any new links at the parent's previous position.
  link.enter().insert("path", "g")
      .attr("class", "link")
      .attr("d", function(d) {
        var o = {x: source.x0, y: source.y0};
        return diagonal({source: o, target: o});
      });

  // Transition links to their new position.
  link.transition()
      .duration(duration)
      .attr("d", diagonal);

  // Transition exiting nodes to the parent's new position.
  link.exit().transition()
      .duration(duration)
      .attr("d", function(d) {
        var o = {x: source.x, y: source.y};
        return diagonal({source: o, target: o});
      })
      .remove();

  // Stash the old positions for transition.
  nodes.forEach(function(d) {
    d.x0 = d.x;
    d.y0 = d.y;
  });
}

// Toggle children on click.
function click(d) {
  if (d.children) {
    d._children = d.children;
    d.children = null;
  } else {
    d.children = d._children;
    d._children = null;
  }
  update(d);
}
}