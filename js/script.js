var importedData = new Array();
// var dataStream1 = document.getElementById("2DdataStream1");
var HeatMapData = new Array();

var processedOperators = new Array();
processedOperators.push(false);
processedOperators.push(false);
processedOperators.push(false);
processedOperators.push(false);
processedOperators.push(false);




function loadDataStreams(){
	// alert(dataStream1);
	for (var i = 0; i < importedData.length; i++) {
		var filterOption = document.createElement("option");
	   	var filterText = document.createTextNode(importedData[i]);
	   	filterOption.appendChild(filterText);
		 
	   	// then append it to the select element
		//appendChild is getting overwritten everytime it's called, that's why data only appears in groupDataStream.
		document.getElementById('filterDataStream').appendChild(filterOption);
		
	};
	// then append the select to an element in the dom

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
	this.minNormalization = minMaxNormalization.getParam1;
	this.maxNormalization = minMaxNormalization.getParam2;
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
	this.getMinNormalization = function(){
		return this.minNormalization;
	}
	this.getMaxNormalization = function(){
		return this.maxNormalization;
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

	
	
	//if the norm checkbox is checked, inspect the norm min and max
	var normCheck = document.getElementById("filterNorm");
	var minNorm = document.getElementById("inputFilterNormMin");
	var maxNorm = document.getElementById("inputFilterNormMax");
	if (normCheck.checked){
		if (!isValidInput(minNorm).value){
			minNorm.parentNode.className = "control-label has-error";
			$(minNorm).on("change", function(){
				if (isValidInput(minNorm.value)){
					minNorm.parentNode.className = "control-label";
				}
			})
		}	
		if (!isValidInput(maxNorm).value){
			maxNorm.parentNode.className = "control-label has-error";
			$(maxNorm).on("change", function(){
				if (isValidInput(maxNorm.value)){
					maxNorm.parentNode.className = "control-label";
				}
			})
		}
	} else{
		minNorm.parentNode.className = "control-label";
		maxNorm.parentNode.className = "control-label";
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
		var minNorm = document.getElementById("inputFilterNormMin");
		var maxNorm = document.getElementById("inputFilterNormMax"); //.parentNode.className
		var neLong = document.getElementById("inputFilterNELong");
		var neLat = document.getElementById("inputFilterNELat");
		var swLong = document.getElementById("inputFilterSWLong");
		var swLat = document.getElementById("inputFilterSWLat"); //.parentNode.className
		myArray.push(minValue);
		myArray.push(maxValue);
		myArray.push(minNorm);
		myArray.push(maxNorm);
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
	var dataStream1 = document.getElementById("2dCoDataStream1")
	var dataStream2 = document.getElementById("2dCoDataStream2");
	if (!isValidInput(dataStream1.value)){
		dataStream1.parentNode.parentNode.className = "form-group has-error";
		$(dataStream1).on("change", function(){
			if (isValidInput(dataStream1.value)){
				dataStream1.parentNode.parentNode.className = "form-group";
			}
		})
	}
	
	if (!isValidInput(dataStream2.value)){
		dataStream2.parentNode.parentNode.className = "form-group has-error";
		$(dataStream2).on("change", function(){
			if (isValidInput(dataStream2.value)){
				dataStream2.parentNode.parentNode.className = "form-group";
			}
		})
	}

	var timeLagValue = document.getElementById("timeLagValue");
	if (!isValidInput(timeLagValue.value)){
		timeLagValue.parentNode.className = "control-label has-error";
		$(timeLagValue).on("change", function(){
			if (isValidInput(timeLagValue.value)){
				timeLagValue.parentNode.className = "control-label";
			}
		})
	}

	var timeLagUnit = document.getElementById("timeLagUnit");
	if (!isValidInput(timeLagUnit.value)){
		timeLagUnit.parentNode.className = "control-label has-error";
		$(timeLagUnit).on("change", function(){
			if (isValidInput(timeLagUnit.value)){
				timeLagUnit.parentNode.className = "control-label";
			}
		})
	}
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
}



//  -------------------------    Process Functions   ---------------------




function processFilter(){
	if (!filterHasErrors()){
		var dataStream = document.getElementById("filterDataStream");

		var minValue = document.getElementById("inputFilterValueMin");
		var maxValue = document.getElementById("inputFilterValueMax");
		var minMaxValue = new Tuple(minValue, maxValue);

		var minNorm = document.getElementById("inputFilterNormMin");
		var maxNorm = document.getElementById("inputFilterNormMax");
		var minMaxNorm = new Tuple(minNorm, maxNorm);

		var neLong = document.getElementById("inputFilterNELong");
		var neLat = document.getElementById("inputFilterNELat");
		var northEastCoords = new Tuple(neLong, neLat);

		var swLong = document.getElementById("inputFilterSWLong");
		var swLat = document.getElementById("inputFilterSWLat");
		var southWestCoords = new Tuple(swLong, swLat);

		var filterObject = new Filter(dataStream, minMaxValue, minMaxNorm, northEastCoords, southWestCoords);
		var myDataStream = filterObject.getMinValue();

		document.getElementById("filterClose").click();

		// $('canvas').drawArc({
		//   strokeStyle: 'black',
		//   strokeWidth: 2,
		//   x: 150, y: 50,
		//   radius: 30
		// });
		// alert("after canvas");
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
        	if (data.queries[i].operator.name === "3Dco_occurrence" && inputs[0] == "ds1" && inputs[1] == "ds2" && inputs[2] == "ds3"){
        		output_path += data.queries[i].output['3dmatrix'];
        	}
        } 

        
        d3.json(output_path, function(error, json){
        	if (error) {
        		return;
        	}
        	output_data = json;
        	for (var i = 0; i < output_data.length; i++) {
        		for (var j = 0; j < output_data[i].length; j++) {
        			for (var k = 0; k < output_data[i][j].length; k++) {
        				HeatMapData.push(output_data[i][j][k]);
        			};
        		};
        	};
        })
    })
    

    processedOperators[4] = true;
	document.getElementById("3DClose").click();
}




//  -------------------------    Visualize Functions   ---------------------


function visualize3D () {
	if (processedOperators[4]){
		// var heatpmapContainer = create3DImage();
		// var canvas = heatpmapContainer.childNodes[1];
		// setup3DBackground(canvas.toDataURL());
		
		// $("#heatmapContainerWrapper").remove();

		setup3DBackground();

		render3DBackground();

	} else{
		alert("Fill out the 3D Processor first");
	}
}

function setup3DBackground(){
	var html = "<div id='container'></div><div id='info'><div class='top'>3D co-occurrence Visualization</div><div class='bottom' id='inlineDoc'><div class='controls'><p>Data source:</p><p><select id='datasource'><option value='1x1x1'>1x1x1</option><option value='2x2x2'>2x2x2</option><option value='4x4x4'>4x4x4</option><option value='8x8x8'>8x8x8</option><option value='16x16x16'>16x16x16</option><option value='Sphere'>Sphere</option><option value='I-Shape'>I-Shape</option><option value='Tiny Button'>Tiny Button</option><option value='Noise'>Noise</option><option value='Dense Noise'>Dense Noise</option><option value='16 Color Noise'>16 Color Noise</option><option value='Hole'>Hole</option><option value='Boss'>Boss</option><option value='T-Shape'>T-Shape</option><option value='HollowCube'>HollowCube</option><option value='Clover'>Clover</option><option value='Triangle'>Triangle</option><option value='Saw'>Saw</option><option value='4Dots'>4Dots</option><option value='Checker'>Checker</option><option value='Matt's Example'>Alfonsos Example</option><option value='Benchmark (SLOW!)'>Benchmark (SLOW!)</option><option value='Hill'>Hill</option><option value='Valley'>Valley</option><option value='Hilly Terrain'>Hilly Terrain</option><option value='Empty'>Empty</option></select></p><p>Mesher:</p><p><select id='mesher'><option value='Stupid'>Stupid</option><option value='Culled'>Culled</option><option value='Greedy'>Greedy</option><option value='Monotone'>Monotone</option></select></p><p>Show faces: <input type='checkbox' id='showfacets' value='checked'></p><p>Show edges: <input type='checkbox' id='showedges' value='checked'></p><p>Vertex count: <input type='text' id='vertcount' value='0'> </p><p>Face count: <input type='text' id='facecount' value='0'> </p></div> </div>";
	var visualizationPanel = document.getElementById("visualizationPanel");
	visualizationPanel.innerHTML = html;
}


function render3DBackground () {
	var scene, renderer, composer;
    var camera, cameraControl;
    var geometry, surfacemesh, wiremesh;
    var meshers = {
        'Stupid': StupidMesh
      , 'Culled': CulledMesh
      , 'Greedy': GreedyMesh
      , 'Monotone': MonotoneMesh
    };
    var testdata = {};
    
    
    function updateMesh() {
    
      scene.remove( surfacemesh );
      scene.remove( wiremesh );
      
      geometry  = new THREE.Geometry();   
      var mesher = meshers[ document.getElementById("mesher").value ]
        , data   = testdata[ document.getElementById("datasource").value ]
        , result = mesher( data.voxels, data.dims );

      console.log('result: ' + result.vertices);
      console.log('faces: ' + result.faces);
      document.getElementById("vertcount").value = result.vertices.length;
      document.getElementById("facecount").value = result.faces.length;
      geometry.vertices.length = 0;
      geometry.faces.length = 0;

      for(var i=0; i<result.vertices.length; ++i) {
        var q = result.vertices[i];
        geometry.vertices.push(new THREE.Vector3(q[0], q[1], q[2]));
      }


      for(var i=0; i<result.faces.length; ++i) {
        var q = result.faces[i];

        if(q.length === 5) {
          var f = new THREE.Face4(q[0], q[1], q[2], q[3]);
          
          f.color = new THREE.Color(q[4]);
          console.log('f - r g b: ' + f.color.r + ', ' + f.color.g + ', ' + f.color.b);
          f.vertexColors = [f.color,f.color,f.color,f.color];
          geometry.faces.push(f);
        } else if(q.length == 4) {
          var f = new THREE.Face3(q[0], q[1], q[2]);
          f.color = new THREE.Color(q[3]);
          f.vertexColors = [f.color,f.color,f.color];
          geometry.faces.push(f);
        }
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
      
      renderer.setSize( 1000, 430 );
      document.getElementById('container').appendChild(renderer.domElement);

      // create a scene
      scene = new THREE.Scene();

      // put a camera in the scene
      camera  = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 1, 10000 );
      camera.position.set(0, 0, 40);
      scene.add(camera);

      // create a camera contol
      cameraControls  = new THREE.TrackballControls( camera, document.getElementById('container') )

      // transparently support window resize
      THREEx.WindowResize.bind(renderer, camera);
      // allow 'p' to make screenshot
      THREEx.Screenshot.bindKey(renderer);
      // allow 'f' to go fullscreen where this feature is supported
      if( THREEx.FullScreen.available() ){
        THREEx.FullScreen.bindKey();    
        document.getElementById('inlineDoc').innerHTML  += "- <i>f</i> for fullscreen";
      }

      
      //Initialize dom elements
      testdata = createTestData();
      var ds = document.getElementById("datasource");
      for(var id in testdata) {
        ds.add(new Option(id, id), null);
      }
      ds.onchange = updateMesh;
      var ms = document.getElementById("mesher");
      for(var alg in meshers) {
        ms.add(new Option(alg, alg), null);
      }
      ms.onchange = updateMesh;
      
      document.getElementById("showfacets").checked = true;
      document.getElementById("showedges").checked  = true;
      
      //Update mesh
      updateMesh();
      
      return false;
    }

    // animation loop
    function animate() {

      // loop on request animation loop
      // - it has to be at the begining of the function
      // - see details at http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
      requestAnimationFrame( animate );

      // do the render
      render();
    }

    // render the scene
    function render() {
      // variable which is increase by Math.PI every seconds - usefull for animation
      var PIseconds = Date.now() * Math.PI;

      // update camera controls
      cameraControls.update();

      surfacemesh.visible = document.getElementById("showfacets").checked;
      wiremesh.visible = document.getElementById("showedges").checked;

      // actually render the scene
      renderer.render( scene, camera );
    }
}
