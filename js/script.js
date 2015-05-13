//creating a Filter class
function Filter(dataStream, minMaxValue, minMaxNormalization, northEastCoords, southWestCoords){
	this.dataStream = dataStream;
	this.minValue = minMaxValue[0];
	this.maxValue = minMaxValue[1];
	this.minNormalization = minMaxNormalization[0];
	this.maxNormalization = minMaxNormalization[1];
	this.northEastLong = northEastCoords[0];
	this.northEastLat = northEastCoords[1];
	this.southWestLong = southWestCoords[0];
	this.southWestLat = southWestCoords[1];
	this.getdataStream = function(){
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