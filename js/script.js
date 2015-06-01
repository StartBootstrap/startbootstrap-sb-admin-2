var importedData = new Array();
var dataStream1 = document.getElementById("2DdataStream1");


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

//Makes sure input is not empty
function isValidInput(input){
	return input !== "";
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



function validate2DInput(){
	
	var dataStream2 = document.getElementById("2DdataStream2");
	/*if (!isValidInput(dataStream1.value)){
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
	}*/
	document.getElementById("2dProcessClose").click();
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


